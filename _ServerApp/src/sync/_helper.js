/* eslint-disable no-undef */
const AppController = require('../controllers');
const autoBind = require('auto-bind');
const {jsonlLineReader} = require('../helper/jsonlReader');
const {isEmpty} = require('../helper');
const config = require('config');
const apiVersion = config.get('apiVersion');
const {ioRedisPublish} = require('../utils/ioRedis');
const {SYNC_STATUSES} = require('../utils/syncStatuses');

/**
 * SyncDataHelperController
 */
class SyncDataHelper extends AppController {
	/**
	 * @param {*} model
	 */
	constructor(model) {
		super(model);
		autoBind(this);
	}

	/**
	 *
	 * @param {*} shopId
	 * @param {*} type
	 */
	syncingFailedStatus(shopId, type) {
		ioRedisPublish(shopId, {
			[type]: {
				percentage: 0,
				status: SYNC_STATUSES.FAILED,
				syncStatus: 'failed',
			},
		});
	}

	/**
	 * TESTING PURPOSE ONLY
	 * @param {Objects} ctx
	 * @param {Objects} tableData
	 * @return {*}
	 */
	insertDatasTester(ctx, tableData = {}) {
		return new Promise(async (resolve, reject) => {
			const {jsonlLineReaderTester} = require('../helper/jsonlReader');

			const datas = [
				{
					tableAndKeys: [
						{
							key: 'InventoryItem',
							table: 'inventoryItems',
						},
						{
							key: 'InventoryLevel',
							table: 'inventoryLevels',
						},
					],
					type: 'inventoryItems',
					file: '134969360537.jsonl',
				},
				{
					tableAndKeys: [
						{
							key: 'taxLines',
							table: 'taxLines',
						},
					],
					type: 'orders',
					file: '134986268825.jsonl',
				},
			];
			datas.forEach(({tableAndKeys, type, file}) => {
				jsonlLineReaderTester(1, type, file).then(async (items) => {
					if (!items) return false;
					tableAndKeys.forEach((tableAndKey) => {
						const {table, key} = tableAndKey;
						tableData[table] = items[key];
					});
					const Models = this.models;
					const tableKeys = Object.keys(tableData);
					let tableDatasLength = tableKeys.length;
					for await (const table of tableKeys) {
						const Model = Models[table];
						const data = tableData[table];
						console.log(`================table ${table} syncing begun=============`);
						if (!Model) {
							console.log(`================table ${table} no model=============`);
							return true;
						}
						this.createMany(ctx, data, true, Model)
							.then((result) => {
								tableDatasLength -= 1;
								console.log(`================${table} syncing done=======tables lefts: ${tableDatasLength}======`);
							})
							.catch((err) => {
								const {name, original} = err;
								console.error(`================${table} syncing err================`, {
									name,
									sqlMessage: original.sqlMessage,
								});
								return reject(err);
							});
					}
					resolve(true);
				});
			});
		});
	}

	/**
	 * @param {Object} accessToken
	 * @param {Object} shop
	 * @param {Object} mutationQuery
	 * @return {*}
	 */
	bulkOperationRunQuery(accessToken, shop, mutationQuery) {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
					method: 'POST',
					body: mutationQuery,
					headers: {
						'Content-Type': 'application/json',
						'X-Shopify-Access-Token': accessToken,
					},
				});
				const responseJson = await response.json();
				const {bulkOperation, userErrors} = responseJson.data.bulkOperationRunQuery;
				if (userErrors.length) {
					console.error('======userErrors==========', userErrors);
					return reject(userErrors);
				}
				console.log('======bulkOperation==========', bulkOperation);
				return resolve(bulkOperation);
			} catch (err) {
				return reject(err);
			}
		});
	}

	/**
	 * pollingBulkOperationCall
	 * @param {*} accessToken
	 * @param {*} shop
	 * @param {*} mutationQuery
	 * @param {*} shopId
	 * @param {*} type
	 * @return{*}
	 */
	pollingBulkOperationCall(accessToken, shop, mutationQuery, shopId, type) {
		return new Promise(async (resolve, reject) => {
			this.bulkOperationRunQuery(accessToken, shop, mutationQuery)
				.then((data) => {
					try {
						let pollingId;
						/**
						 * listen To BuilkOperation every 5s
						 * @return {*}
						 */
						const listenToBuilkOperation = async () => {
							const listenToBuilkQuery = JSON.stringify({
								query: `query {
											node(id: "${data.id}") {
											  ... on BulkOperation {
												id
												status
												errorCode
												createdAt
												completedAt
												objectCount
												fileSize
												url
												partialDataUrl
											  }
											}
			 							 }`,
							});
							const response = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
								method: 'POST',
								body: listenToBuilkQuery,
								headers: {
									'Content-Type': 'application/json',
									'X-Shopify-Access-Token': accessToken,
								},
							});
							const responseJson = await response.json();
							const responseJsonError = responseJson.error || responseJson.errors;
							if (responseJsonError) {
								const err = responseJsonError;
								console.error('======currentBulkOperation .error==========', err);
								clearInterval(pollingId);
								return reject(err);
							}
							const responseJsonData = responseJson.data.node;
							const {status} = responseJsonData;
							const noResponseStatus = ['CREATED', 'RUNNING', 'CANCELING'];
							console.log('currentBulkOperation status', status);
							if (noResponseStatus.indexOf(status) === -1) {
								console.log('=========== currentBulkOperation data==============', responseJsonData);
								clearInterval(pollingId);
								return resolve(responseJsonData);
							}
							// CANCELED  Operation canceled.
							// CANCELING Operation canceling.
							// COMPLETED Operation completed.
							// CREATED Operation created.
							// EXPIRED Operation URL has expired.
							// FAILED Operation failed.
							// RUNNING Operation running.
						};
						pollingId = setInterval(listenToBuilkOperation, 5000);
					} catch (err) {
						reject(err);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	/**
	 * insertDatas
	 * @param {Objects} ctx
	 * @param {Objects} tableData
	 * @param {String} shopId
	 * @param {String} type
	 * @return {*}
	 */
	insertDatas(ctx, tableData, shopId, type) {
		return new Promise(async (resolve, reject) => {
			if (!isEmpty(tableData)) {
				const Models = ctx.models;
				const tableKeys = Object.keys(tableData);
				let tableDatasLength = tableKeys.length;
				let percentage = 50;
				const tablePercentage = 40 / tableDatasLength;
				for await (const table of tableKeys) {
					const Model = Models[table];
					const data = tableData[table];

					if (isEmpty(data)) {
						console.log(`No data for ${table}`);
						percentage += tablePercentage;
						ioRedisPublish(shopId, {
							[type]: {
								percentage,
								status: SYNC_STATUSES.UPDATED_DATA.replace('[n]', 0),
							},
						});
					} else {
						const {shopifyId, ...otherDatas} = data[0];
						const updateKeys = Object.keys(otherDatas);

						await this.createMany(ctx, data, true, Model, {
							updateOnDuplicate: updateKeys,
						})
							.then((result) => {
								tableDatasLength -= 1;
								percentage += tablePercentage;
								ioRedisPublish(shopId, {
									[type]: {
										percentage,
										status: SYNC_STATUSES.UPDATED_DATA.replace('[n]', data.length),
									},
								});
								console.log(`================${table} syncing done=======tables lefts: ${tableDatasLength}======`);
							})
							.catch((err) => {
								const {name, original = {}} = err;
								console.error(`================${table} syncing err================`, {
									name,
									sqlMessage: original.sqlMessage,
									otherError: !err.sql && err,
								});
								return reject(err);
							});
					}
				}
				resolve(true);
			} else {
				ioRedisPublish(shopId, {
					[type]: {
						percentage: 90,
						status: SYNC_STATUSES.NO_DATA,
					},
				});
				resolve(true);
				console.log(`No tableData in insertDatas functions for ${type}`);
			}
		});
	}

	/**
	 *
	 * @param {*} ctx
	 * @param {*} type
	 * @param {*} mutationQuery
	 * @param {*} tableAndKeys
	 * @return {*}
	 */
	syncTables(ctx, type, mutationQuery, tableAndKeys) {
		return new Promise(async (resolve, reject) => {
			const {shop, accessToken} = ctx.session;
			const shopId = ctx.shop.id;
			ioRedisPublish(shopId, {
				[type]: {
					percentage: 10,
					status: SYNC_STATUSES.READING_FROM_SHOPIFY,
				},
			});

			this.pollingBulkOperationCall(accessToken, shop, mutationQuery, shopId, type)
				.then(async (data) => {
					const {id, status, objectCount, url} = data;
					if (status === 'COMPLETED') {
						if (objectCount === '0') {
							await ioRedisPublish(shopId, {
								[type]: {
									percentage: 100,
									status: SYNC_STATUSES.NO_DATA,
									syncStatus: 'completed',
								},
							});
							return resolve(`No data found on querying (objectCount: 0) table : ${type} `);
						} else resolve(true);

						ioRedisPublish(shopId, {
							[type]: {
								percentage: 30,
								status: SYNC_STATUSES.PROCESSING_DATA,
							},
						});

						jsonlLineReader(id, shopId, url, type)
							.then((items) => {
								const tableObjects = {};
								tableAndKeys.forEach((tableAndKey) => {
									const {table, key} = tableAndKey;
									tableObjects[table] = items[key];
								});
								ioRedisPublish(shopId, {
									[type]: {
										percentage: 50,
										status: SYNC_STATUSES.UPDATING_DATA,
									},
								});
								this.insertDatas(ctx, tableObjects, shopId, type)
									.then((done) => {
										ioRedisPublish(shopId, {
											[type]: {
												percentage: 100,
												status: SYNC_STATUSES.COMPLETED,
												syncStatus: 'completed',
											},
										});
										console.log(`================syncTables completed on ${type} ================`);
										resolve(true);
									})
									.catch((err) => {
										resolve(false);
										this.syncingFailedStatus(shopId, type);
										console.error(`====insertDatas error on ${type} sync===`);
									});
							})
							.catch((err) => {
								resolve(false);
								this.syncingFailedStatus(shopId, type);
								console.error(`====jsonlLineReader error on ${type} sync===`);
							});
					} else {
						resolve(false);
						this.syncingFailedStatus(shopId, type);
						console.error(`====shopify syncing query status ${status} on ${type} sync===`, data);
					}
				})
				.catch((err) => {
					reject(err);
					this.syncingFailedStatus(shopId, type);
					console.error(`====pollingBulkOperationCall error on ${type} sync===`);
				});
		});
	}
}
module.exports = new SyncDataHelper();

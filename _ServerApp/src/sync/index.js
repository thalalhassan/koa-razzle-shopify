const AppController = require('../controllers');
const autoBind = require('auto-bind');
const {syncTables} = require('./_helper');
const {camelize} = require('../helper');
const {productsMutation, ordersMutation, customersMutation, inventoryItemsMutation} = require('../mutations/queries');
const config = require('config');
const moment = require('moment');
const nodeScheduler = require('node-schedule');
const {getDedicatedModels} = require('../helper/getDedicatedModels');
const apiVersion = config.get('apiVersion');
const {ioRedisPublish} = require('../utils/ioRedis');

/**
 * SyncController
 */
class Sync extends AppController {
	/**
	 * @param {*} model
	 */
	constructor(model) {
		super(model);
		autoBind(this);
	}

	/**
	 * Get profile
	 * @param {Object} ctx
	 * @param {Object} getDataAfterDate
	 * @param {Object} syncStatus
	 * @param {Object} otherData
	 * @return {*}
	 */
	syncDatas(ctx, getDataAfterDate, syncStatus = 'begun', otherData = {}) {
		return new Promise((resolve, reject) => {
			try {
				this.syncShop(ctx, syncStatus, otherData).then(async ({shopifyStoreCreatedAt}) => {
					const createdAtForGetData = getDataAfterDate || shopifyStoreCreatedAt;
					console.log({createdAtForGetData, shopifyStoreCreatedAt, getDataAfterDate});

					await this.syncProducts(ctx, createdAtForGetData);
					await this.syncOrders(ctx, createdAtForGetData);
					await this.syncCustomers(ctx, createdAtForGetData);
					await this.syncInventoryItems(ctx, createdAtForGetData);

					return resolve(true);
				});
			} catch (err) {
				console.error('=============SyncDatas error=================', err);
				return resolve(false);
			}
		});
	}

	/**
	 * Run scheduled Sync
	 */
	scheduledSync() {
		const j = nodeScheduler.scheduleJob({hour: 23, minute: 59}, () => {
			console.log('=======running sync scheduler=============');
			this.models.shops
				.findAll({
					where: {
						isDeleted: false,
					},
					attributes: ['id', 'shop', 'accessToken', 'dedicatedSchema', 'syncStatus'],
					raw: true,
				})
				.then(async (datas) => {
					for await (const data of datas) {
						const {shop, accessToken, id, dedicatedSchema, syncStatus} = data;
						getDedicatedModels(dedicatedSchema).then(async ({success, models}) => {
							if (!success) return true;

							console.log('Scheduler Syncing data of shop:', shop);
							const shopData = {session: {shop, accessToken}, shop: {id}, models};
							const createdAtForGetData = moment().subtract(1, 'days').format('YYYY-MM-DD');
							await this.syncDatas(shopData, createdAtForGetData, syncStatus);
						});
					}
				});
		});
	}

	/**
	 *
	 * @param {*} ctx
	 * @param {*} createdAtForGetData
	 * @return {*}
	 */
	syncProducts(ctx, createdAtForGetData) {
		return new Promise(async (resolve, reject) => {
			ioRedisPublish(ctx.shop.id);
			console.log(`=================productsMutation begun============`);
			const productsMutationQuery = productsMutation(`createdAt:>='${createdAtForGetData}'`);
			const type = 'products';
			const tableAndKeys = [
				{
					key: 'Product',
					table: 'products',
				},
				{
					key: 'ProductVariant',
					table: 'variants',
				},
			];
			syncTables(ctx, type, productsMutationQuery, tableAndKeys)
				.then((done) => {
					console.log(`==============sync ${type} done: ${done}================`);
					return resolve(true);
				})
				.catch((err) => {
					console.error(`==============sync ${type} err=================`, err);
					return resolve(false);
				});
		});
	}

	/**
	 *
	 * @param {*} ctx
	 * @param {*} createdAtForGetData
	 * @return {*}
	 */
	syncOrders(ctx, createdAtForGetData) {
		return new Promise(async (resolve, reject) => {
			console.log(`=================ordersMutation begun============`);
			const ordersMutationQuery = ordersMutation(`createdAt:>='${createdAtForGetData}'`);
			const type = 'orders';
			const tableAndKeys = [
				{
					key: 'Order',
					table: 'orders',
				},
				{
					key: 'LineItem',
					table: 'lineItems',
				},
				{
					key: 'transactions',
					table: 'orderTransactions',
				},
				{
					key: 'refunds',
					table: 'refunds',
				},
				{
					key: 'fulfillments',
					table: 'fulfillments',
				},
				{
					key: 'taxLines',
					table: 'taxLines',
				},
			];
			syncTables(ctx, type, ordersMutationQuery, tableAndKeys)
				.then((done) => {
					console.log(`============sync ${type} done =============: ${done}`);
					resolve(true);
				})
				.catch((err) => {
					resolve(false);
					console.error(`============sync ${type} err ============`, err);
				});
		});
	}

	/**
	 *
	 * @param {*} ctx
	 * @param {*} createdAtForGetData
	 * @return {*}
	 */
	syncCustomers(ctx, createdAtForGetData) {
		return new Promise(async (resolve, reject) => {
			console.log(`=================customersMutation begun============`);
			const customersMutationQuery = customersMutation(`createdAt:>='${createdAtForGetData}'`);
			const type = 'customers';
			const tableAndKeys = [
				{
					key: 'Customer',
					table: 'customers',
				},
			];
			syncTables(ctx, type, customersMutationQuery, tableAndKeys)
				.then((done) => {
					console.log(`============sync ${type} done =============: ${done}`);
					resolve(true);
				})
				.catch((err) => {
					resolve(false);
					console.error(`============sync ${type} err ============`, err);
				});
		});
	}

	/**
	 *
	 * @param {*} ctx
	 * @param {*} createdAtForGetData
	 * @return {*}
	 */
	syncInventoryItems(ctx, createdAtForGetData) {
		return new Promise(async (resolve, reject) => {
			console.log(`=================inventoryItemsMutation begun============`);
			const inventoryItemsMutationQuery = inventoryItemsMutation();
			const type = 'inventoryItems';
			const tableAndKeys = [
				{
					key: 'InventoryItem',
					table: 'inventoryItems',
				},
				{
					key: 'InventoryLevel',
					table: 'inventoryLevels',
				},
			];
			syncTables(ctx, type, inventoryItemsMutationQuery, tableAndKeys)
				.then((done) => {
					console.log(`============sync ${type} done =============: ${done}`);
					resolve(done);
				})
				.catch((err) => {
					resolve(false);
					console.error(`============sync ${type} err ============`, err);
				});
		});
	}

	/**
	 *
	 * @param {*} ctx
	 * @param {*} syncStatusUpdate
	 * @param {*} otherData
	 * @return {*}
	 */
	syncShop(ctx, syncStatusUpdate, otherData = {}) {
		return new Promise(async (resolve, reject) => {
			console.log(`=================syncShop begun============`);
			const {shop, accessToken} = ctx.session;
			try {
				// eslint-disable-next-line no-undef
				const response = await fetch(`https://${shop}/admin/api/${apiVersion}/shop.json`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'X-Shopify-Access-Token': accessToken,
					},
				});
				const responseJson = await response.json();
				const {error, errors} = responseJson;
				if (error || errors) {
					const err = error || errors;
					console.log('======shop fetch data error==========', err);
					return reject(err);
				}
				const shopData = responseJson.shop;
				const responseShopData = {};
				Object.keys(shopData).forEach((key) => {
					const camelKey = camelize(key);
					if (key === 'id') {
						responseShopData.shopifyId = `gid://shopify/Shop/${shopData[key]}`;
					} else if (key === 'created_at') {
						responseShopData.shopifyStoreCreatedAt = shopData[key];
					} else {
						responseShopData[camelKey] = shopData[key];
					}
				});
				console.log({responseShopData});
				const query = {accessToken, shop};
				const updateData = {...responseShopData, syncStatus: syncStatusUpdate, ...otherData};
				this.updateByQuery(ctx, query, updateData, true, this.models.shops)
					.then((result) => {
						const shopifyStoreCreatedAt = moment(responseShopData.shopifyStoreCreatedAt).format('YYYY-MM-DD');
						const {planName} = responseShopData;
						console.log(responseShopData.shopifyStoreCreatedAt, shopifyStoreCreatedAt);
						resolve({shopifyStoreCreatedAt, planName});
						console.log('================shop syncing done=============', result);
					})
					.catch((err) => {
						reject(err);
						console.error('================shop syncing err================', err);
					});
			} catch (err) {
				reject(err);
				console.error('================shop syncing err================', err);
			}
		});
	}
}
module.exports = new Sync();

const config = require('config');
const Redis = require('ioredis');
const redisConfig = config.get('redis');
const autoBind = require('auto-bind');
const {isEmpty} = require('../helper');
const { SYNC_STATUSES } = require('./syncStatuses');


const defaultData = {
	products: {percentage: 5, status: SYNC_STATUSES.STARTED},
	orders: {percentage: 0, status: SYNC_STATUSES.YET_TO_START},
	customers: {percentage: 0, status: SYNC_STATUSES.YET_TO_START},
	inventoryItems: {percentage: 0, status: SYNC_STATUSES.YET_TO_START},
};

/**
 * The Io class for all the dependencies of the application
 */
class IoRedis {
	/**
	 * @constructor
	 * @param {Object} config The config object
	 */
	constructor() {
		autoBind(this);
		this.ioredis = new Redis(redisConfig);
		this.ioredisSub = new Redis(redisConfig);
		this.ioredisPub = new Redis(redisConfig);
	}

	/**
	 *
	 * @param {*} shopId
	 * @param {*} data
	 * @return {*}
	 */
	setRedisData(shopId, data) {
		return new Promise((resolve) => {
			if (isEmpty(data)) {
				this.ioredis.set(`${shopId}`, JSON.stringify(defaultData));
			} else {
				this.ioredis
					.get(`${shopId}`)
					.then((oldData = '{}') => {
						const newData = JSON.stringify({...JSON.parse(oldData), ...data});
						this.ioredis.set(`${shopId}`, newData);
						return resolve(newData);
					})
					.catch((err) => {
						console.error('redis get', err);
						return resolve(JSON.stringify(data));
					});
			}
		});
	}

	/**
	 *
	 * @param {*} shopId
	 * @return {*}
	 */
	getRedisData(shopId) {
		return new Promise((resolve) => {
			this.ioredis
				.get(`${shopId}`)
				.then((data) => {
					return resolve(data ?? '{}');
				})
				.catch((err) => {
					console.error('redis get', err);
				});
		});
	}

	/**
	 * ioRedis
	 * @param {*} shopId
	 * @param {*} data
	 */
	async ioRedisPublish(shopId, data = null) {
		const shopChannel = `${shopId}`;
		const returnData = await this.setRedisData(shopId, data);

		this.ioredisSub.subscribe(shopChannel, (err, count) => {
			// `count` represents the number of channels we are currently subscribed to.
			this.ioredisPub.publish(shopChannel, returnData);
		});
	}
}
module.exports = new IoRedis();

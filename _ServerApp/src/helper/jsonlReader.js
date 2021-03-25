const request = require('request');
const fs = require('fs');
const autoBind = require('auto-bind');
const {isEmpty} = require('./index');

/**
 * The JSONLReader class
 */
class JSONLReader {
	/**
	 * constructor
	 */
	constructor() {
		autoBind(this);
		this.HANDLE_JSONL_OBJECTS_FUNCTION = {
			products: this.handleProductJSONL,
			orders: this.handleOrderJSONL,
			customers: this.handleCustomersJSONL,
			inventoryItems: this.handleInventoryItemJSONL,
		};
	}
	/**
	 *
	 * @param {*} string
	 * @param {*} seperator
	 * @return {*}
	 */
	getLastString(string, seperator = '/') {
		return string ? string.substring(string.lastIndexOf(seperator) + 1) : undefined;
	}

	/**
	 *
	 * @param {*} id
	 * @return {*}
	 */
	getShopifyCollectionAndId(id) {
		if (id) {
			const splitted = id.split('/');
			return {
				collection: splitted[3],
				id,
			};
		} else return {};
	}

	/**
	 *
	 * @param {*} items
	 * @param {*} shopId
	 * @param {*} currentObject
	 * @return {*}
	 */
	async handleOrderJSONL(items, shopId, currentObject) {
		const {id, collection} = this.getShopifyCollectionAndId(currentObject.id || currentObject.__parentId);
		if (currentObject.__parentId) {
			let {id, collection} = this.getShopifyCollectionAndId(currentObject.__parentId);
			currentObject.orderShopifyId = id;
			currentObject.parentCollection = collection;
			delete currentObject.__parentId;
		}

		if (!items[collection]) items[collection] = [];

		const {
			variant,
			product,
			customer,
			customerJourneySummary,
			createdAt,
			updatedAt,
			taxLines,
			physicalLocation,
		} = currentObject;

		const address = physicalLocation && physicalLocation.address;
		const {province, provinceCode, city, country} = address || {};

		Object.keys(currentObject)
			.filter((e) => e.includes('Set'))
			.map((set) => {
				if (currentObject[set] !== null && currentObject[set].shopMoney) {
					currentObject[set] = currentObject[set].shopMoney.amount;
				}
			});

		currentObject.variantShopifyId = variant && variant.id;
		currentObject.productShopifyId = product && product.id;
		currentObject.customerShopifyId = customer && customer.id;
		currentObject.province = province;
		currentObject.provinceCode = provinceCode;
		currentObject.city = city;
		currentObject.country = country;

		currentObject.shopifyId = id;
		currentObject.shopId = shopId;
		delete currentObject.id;

		if (customerJourneySummary) {
			const {lastVisit} = customerJourneySummary;
			currentObject.source = (lastVisit && lastVisit.source) || 'unknown';
		}

		if (taxLines) {
			const collectionObject = {
				createdAt,
				updatedAt,
				orderShopifyId: id,
				taxLines,
				shopId,
				province,
				provinceCode,
				city,
				country,
			};
			await taxLines.map(({rate, title, priceSet}, index) => {
				collectionObject[`taxAmount${index + 1}`] = priceSet && priceSet.shopMoney.amount || 0;
				collectionObject[`taxTitle${index + 1}`] = title;
				collectionObject[`taxRate${index + 1}`] = rate;
			});
			if (!items.taxLines) items.taxLines = [];
			items.taxLines.push(collectionObject);
		}
		if (collection === 'LineItem') {
			items[currentObject.parentCollection].map((item) => {
				if (item.shopifyId === currentObject.orderShopifyId) {
					Object.keys(item)
						.filter((e) => e.includes('Set'))
						.map((set) => {
							if (item[set] !== null && item[set].shopMoney) {
								item[set] = item[set].shopMoney.amount;
							}
						});
					const {createdAt, updatedAt} = item;
					items[collection].push({...currentObject, createdAt, updatedAt});
				}
			});
		} else {
			const tables = ['refunds', 'transactions', 'fulfillments'];
			tables.map((collectionName) => {
				if (currentObject[collectionName]) {
					const data = currentObject[collectionName];
					delete currentObject[collectionName];
					data.forEach((dataObject) => {
						const collectionObject = {
							createdAt,
							updatedAt,
							...dataObject,
							orderShopifyId: id,
							shopifyId: dataObject.id,
							shopId,
						};
						Object.keys(collectionObject)
							.filter((e) => e.includes('Set'))
							.map((set) => {
								if (collectionObject[set] !== null && collectionObject[set].shopMoney) {
									collectionObject[set] = collectionObject[set].shopMoney.amount;
								}
							});
						delete collectionObject.id;
						if (!items[collectionName]) items[collectionName] = [];
						items[collectionName].push(collectionObject);
					});
				}
			});
		}
		if (collection === 'Order') {
			items[collection].push(currentObject);
		}
		return items;
	}

	/**
	 *
	 * @param {*} items
	 * @param {*} shopId
	 * @param {*} currentObject
	 * @return {*}
	 */
	handleProductJSONL(items, shopId, currentObject) {
		let {id, collection} = this.getShopifyCollectionAndId(currentObject.id || currentObject.__parentId);
		if (currentObject.__parentId) {
			let {id, collection} = this.getShopifyCollectionAndId(currentObject.__parentId);
			currentObject.productShopifyId = id;
			currentObject.parentCollection = collection;
			delete currentObject.__parentId;
		}

		delete currentObject.id;
		currentObject.shopifyId = id;
		currentObject.shopId = shopId;

		if (collection === 'ProductImage') {
			collection = 'images';
			items[currentObject.parentCollection] = items[currentObject.parentCollection].map((item) => {
				if (item.shopifyId === currentObject.productShopifyId) {
					if (!item[collection]) item[collection] = [];
					item[collection].push(currentObject.originalSrc);
				}
				return item;
			});
		} else {
			if (!items[collection]) items[collection] = [];
			if (currentObject.inventoryItem) {
				const cost = currentObject.inventoryItem.unitCost;
				currentObject.cost = parseFloat(cost) || null;
			}
			if (currentObject.image && currentObject.image.originalSrc) {
				currentObject.image = currentObject.image.originalSrc;
			}
			items[collection].push(currentObject);
		}
		return items;
	}

	/**
	 *
	 * @param {*} items
	 * @param {*} shopId
	 * @param {*} currentObject
	 * @return {*}
	 */
	handleCustomersJSONL(items, shopId, currentObject) {
		let {id, collection} = this.getShopifyCollectionAndId(currentObject.id || currentObject.__parentId);
		currentObject.shopifyId = id;
		currentObject.shopId = shopId;

		const {lastOrder, image, defaultAddress} = currentObject;
		const {address1, address2, city, province, zip, country} = defaultAddress || {};
		currentObject.lastOrder = lastOrder && lastOrder.id;
		currentObject.image = image && image.originalSrc;
		currentObject.address1 = address1;
		currentObject.address2 = address2;
		currentObject.city = city;
		currentObject.province = province;
		currentObject.zip = zip;
		currentObject.country = country;

		delete currentObject.id;

		if (!items[collection]) items[collection] = [];
		items[collection].push(currentObject);
		return items;
	}

	/**
	 *
	 * @param {*} items
	 * @param {*} shopId
	 * @param {*} currentObject
	 * @return {*}
	 */
	handleInventoryItemJSONL(items, shopId, currentObject) {
		let {id, collection} = this.getShopifyCollectionAndId(currentObject.id || currentObject.__parentId);
		currentObject.shopifyId = id;
		currentObject.shopId = shopId;
		const {location, __parentId, unitCost, variant} = currentObject;

		if (__parentId) {
			let {id, collection} = this.getShopifyCollectionAndId(__parentId);
			currentObject.inventoryItemShopifyId = id;
			currentObject.parentCollection = collection;
			delete currentObject.__parentId;
		} else {
			const {price, inventoryQuantity} = variant || {};
			currentObject.unitCost = unitCost ? parseFloat(unitCost.amount) : 0;
			currentObject.price = parseFloat(price);
			currentObject.inventoryQuantity = inventoryQuantity;
			currentObject.inventoryCost = parseInt(inventoryQuantity) * currentObject.unitCost;
			currentObject.inventoryValue = parseInt(inventoryQuantity) * currentObject.price;
		}

		delete currentObject.id;

		if (location && location.address) {
			const {city, country, provinceCode, province} = location.address;
			currentObject.province = province;
			currentObject.provinceCode = provinceCode;
			currentObject.city = city;
			currentObject.country = country;
		}

		if (!items[collection]) items[collection] = [];
		items[collection].push(currentObject);
		return items;
	}

	/**
	 *
	 * @param {*} bulkOperationId
	 * @param {*} shopId
	 * @param {*} url
	 * @param {*} type
	 * @return {*}
	 */
	async jsonlLineReader(bulkOperationId, shopId, url, type = 'products') {
		const withLineObject = this.HANDLE_JSONL_OBJECTS_FUNCTION[type];
		return new Promise(async (resolve, reject) => {
			try {
				const items = {};
				const readline = require('readline');
				const filePath = `${__dirname}/../../public/${this.getLastString(bulkOperationId)}.jsonl`;
				request(url)
					.pipe(fs.createWriteStream(filePath))
					.on('finish', async () => {
						const rl = readline.createInterface({
							input: fs.createReadStream(filePath),
							crlfDelay: Infinity,
						});
						for await (const line of rl) {
							if (typeof line === 'string' && line.length) {
								const currentObject = JSON.parse(line);
								await withLineObject(items, shopId, currentObject);
							}
						}

						// for testing each table samples
						// Object.keys(items).forEach((key) => {
						//	console.log(`=========item: ${key}============\n`, items[key] && items[key][0]);
						// });

						// delete file from public
						fs.unlink(filePath, (error) => {
							if (error) console.log('-------jsonlLineReader file unlink error---\n', error, '\n-----');
						});

						resolve(items);
					})
					.on('error', (err) => {
						console.log('=============streamJSONL error==============', err);
						reject(err);
					});
			} catch (err) {
				console.log('=============jsonlLineReader catch error==============', err);
				reject(err);
			}
		});
	}

	/**
	 *
	 * @param {*} shopId
	 * @param {*} type
	 * @param {*} file
	 * @return {*}
	 */
	jsonlLineReaderTester(shopId = 1, type = 'orders', file = '134969360537.jsonl') {
		console.log('=============Begun jsonlLineReaderTester=============');
		const withLineObject = this.HANDLE_JSONL_OBJECTS_FUNCTION[type];
		return new Promise(async (resolve, reject) => {
			try {
				const readline = require('readline');
				const filePath = `${__dirname}/../../public/${file}`;
				const items = {};
				const rl = readline.createInterface({
					input: fs.createReadStream(filePath),
					crlfDelay: Infinity,
				});
				for await (const line of rl) {
					if (typeof line === 'string' && line.length) {
						const currentObject = JSON.parse(line);
						await withLineObject(items, shopId, currentObject);
					}
				}

				// for testing
				Object.keys(items).forEach((key) => {
					console.log(`=========item: ${key}============\n`, items[key] && items[key][0]);
				});
				resolve(items);
			} catch (err) {
				console.log('=============jsonlLineReader catch error==============', err);
				reject(err);
			}
		});
	}
}
module.exports = new JSONLReader();

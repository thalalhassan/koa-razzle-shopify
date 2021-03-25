const autoBind = require('auto-bind');
const {registerWebhook} = require('@shopify/koa-shopify-webhooks');
const config = require('config');
const apiVersion = config.get('apiVersion');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, '../../.env')});

/**
 * SyncDataController
 */
class setupWebhook {
	/**
	 * @constructor
	 */
	constructor() {
		autoBind(this);

		// WRITE SCOPES:
		// [
		// "write_content",
		// "write_themes",
		// "write_products",
		// "write_product_listings",
		// "write_customers",
		// "write_orders",
		// "write_draft_orders",
		// "write_inventory",
		// "write_script_tags",
		// "write_fulfillments",
		// "write_assigned_fulfillment_orders",
		// "write_merchant_managed_fulfillment_orders",
		// "write_third_party_fulfillment_orders",
		// "write_shipping",
		// "write_checkouts",
		// "write_reports",
		// "write_price_rules",
		// "write_discounts",
		// "write_marketing_events",
		// "write_resource_feedbacks",
		// "write_translations",
		// "write_locales"
		// "read_content",
		// "read_themes",
		// "read_products",
		// "read_product_listings",
		// "read_customers",
		// "read_orders",
		// "read_all_orders",
		// "read_draft_orders",
		// "read_inventory",
		// "read_locations",
		// "read_script_tags",
		// "read_fulfillments",
		// "read_assigned_fulfillment_orders",
		// "read_merchant_managed_fulfillment_orders",
		// "read_third_party_fulfillment_orders",
		// "read_shipping",
		// "read_analytics",
		// "read_checkouts",
		// "read_reports",
		// "read_price_rules",
		// "read_discounts",
		// "read_marketing_events",
		// "read_resource_feedbacks",
		// "read_shopify_payments_payouts",
		// "read_shopify_payments_disputes",
		// "read_translations",
		// "read_locales"
		// ]

		// TOPICS
		// [
		// 	'CARTS_CREATE',
		// 	'CARTS_UPDATE',
		// 	'CHECKOUTS_CREATE',
		// 	'CHECKOUTS_DELETE',
		// 	'CHECKOUTS_UPDATE',
		// 	'COLLECTION_LISTINGS_ADD',
		// 	'COLLECTION_LISTINGS_REMOVE',
		// 	'COLLECTION_LISTINGS_UPDATE',
		// 	'COLLECTIONS_CREATE',
		// 	'COLLECTIONS_DELETE',
		// 	'COLLECTIONS_UPDATE',
		// 	'DISPUTES_CREATE',
		// 	'DISPUTES_UPDATE',
		// 	'DOMAINS_CREATE',
		// 	'DOMAINS_DESTROY',
		// 	'DOMAINS_UPDATE',
		// 	'INVENTORY_ITEMS_CREATE',
		// 	'INVENTORY_ITEMS_DELETE',
		// 	'INVENTORY_ITEMS_UPDATE',
		// 	'INVENTORY_LEVELS_CONNECT',
		// 	'INVENTORY_LEVELS_DISCONNECT',
		// 	'INVENTORY_LEVELS_UPDATE',
		// 	'LOCALES_CREATE',
		// 	'LOCALES_UPDATE',
		// 	'LOCATIONS_CREATE',
		// 	'LOCATIONS_DELETE',
		// 	'LOCATIONS_UPDATE',
		// 	'PRODUCT_LISTINGS_ADD',
		// 	'PRODUCT_LISTINGS_REMOVE',
		// 	'PRODUCT_LISTINGS_UPDATE',
		// 	'PROFILES_CREATE',
		// 	'PROFILES_DELETE',
		// 	'PROFILES_UPDATE',
		// 	'THEMES_CREATE',
		// 	'THEMES_DELETE',
		// 	'THEMES_PUBLISH',
		// 	'THEMES_UPDATE',
		// 	'THEMES_UPDATE',

		// ]
	}

	/**
	 * Get
	 * @param {Object} accessToken
	 * @param {Object} shop
	 * @return {*}
	 */
	async setupWebhook(accessToken, shop) {
		try {
			await this.setShopWebhook(accessToken, shop);
			await this.setProductsWebhook(accessToken, shop);
			await this.setOrdersWebhook(accessToken, shop);
			await this.setCustomersWebhook(accessToken, shop);
			await this.inventoryItemsWebhook(accessToken, shop);
			return true;
		} catch (err) {
			console.log('Failed to register webhook !!!!!!!!!!!!!!!!!!', err);
			return false;
		}
	}

	/**
	 *
	 * @param {*} type
	 * @param {*} neededWebhooks
	 * @param {*} accessToken
	 * @param {*} shop
	 * @return {*}
	 */
	registerWebhooks(type, neededWebhooks, accessToken, shop) {
		return new Promise(async (resolve, reject) => {
			neededWebhooks.forEach(async (webhookKey) => {
				const {topic, path} = webhookKey;

				const address = `${process.env.WEBHOOKS_URL}${type}/${path}`;
				console.log('===============webhook set address===============', address);

				const registerProduct = await registerWebhook({
					address,
					topic,
					accessToken,
					shop,
					apiVersion,
				});
				if (registerProduct.success) {
					resolve(true);
					console.log(`Successfully registered ${topic} webhook!`);
				} else {
					resolve(false);
					console.log(`Failed to register ${topic} webhook \n`, registerProduct.result);
					console.log(JSON.stringify(registerProduct.result));
				}
			});
		});
	}

	/**
	 *
	 * @param {*} accessToken
	 * @param {*} shop
	 * @return {*}
	 */
	setProductsWebhook(accessToken, shop) {
		return new Promise(async (resolve, reject) => {
			const neededWebhooks = [
				{topic: 'PRODUCTS_CREATE', path: 'create'},
				{topic: 'PRODUCTS_UPDATE', path: 'update'},
				{topic: 'PRODUCTS_DELETE', path: 'delete'},
			];
			this.registerWebhooks('products', neededWebhooks, accessToken, shop).then((done) => {
				resolve(done);
			});
		});
	}

	/**
	 *
	 * @param {*} accessToken
	 * @param {*} shop
	 * @return {*}
	 */
	setCustomersWebhook(accessToken, shop) {
		return new Promise(async (resolve, reject) => {
			const neededWebhooks = [
				{topic: 'CUSTOMERS_CREATE', path: 'create'},
				{topic: 'CUSTOMERS_UPDATE', path: 'update'},
				{topic: 'CUSTOMERS_DELETE', path: 'delete'},
				// {topic: 'CUSTOMER_GROUPS_CREATE', path: 'groups/create'},
				// {topic: 'CUSTOMER_GROUPS_DELETE', path: 'groups/delete'},
				// {topic: 'CUSTOMER_GROUPS_UPDATE', path: 'groups/update'},
				{topic: 'CUSTOMERS_DISABLE', path: 'disable'},
				{topic: 'CUSTOMERS_ENABLE', path: 'enable'},
			];
			this.registerWebhooks('customers', neededWebhooks, accessToken, shop).then((done) => {
				resolve(done);
			});
		});
	}

	/**
	 *
	 * @param {*} accessToken
	 * @param {*} shop
	 * @return {*}
	 */
	setShopWebhook(accessToken, shop) {
		return new Promise(async (resolve, reject) => {
			const neededWebhooks = [
				{topic: 'SHOP_UPDATE', path: 'update'},
				{topic: 'APP_UNINSTALLED', path: 'delete'},
			];
			this.registerWebhooks('shops', neededWebhooks, accessToken, shop).then((done) => {
				resolve(done);
			});
		});
	}

	/**
	 *
	 * @param {*} accessToken
	 * @param {*} shop
	 * @return {*}
	 */
	setOrdersWebhook(accessToken, shop) {
		return new Promise(async (resolve, reject) => {
			const neededWebhooks = [
				{topic: 'ORDERS_CANCELLED', path: 'cancelled'},
				{topic: 'ORDERS_CREATE', path: 'create'},
				{topic: 'ORDERS_DELETE', path: 'delete'},
				{topic: 'ORDERS_EDITED', path: 'edited'},
				{topic: 'ORDERS_FULFILLED', path: 'fulfilled'},
				{topic: 'ORDERS_PAID', path: 'paid'},
				// {topic: 'ORDERS_PARTIALLY_FULFILLED', path: 'partiallyFulfilled'},
				// {topic: 'ORDERS_UPDATED', path: 'updated'},
				// {topic: 'REFUNDS_CREATE', path: 'refunds/create'},
				// {topic: 'DRAFT_ORDERS_CREATE', path: 'draft/create'},
				// {topic: 'DRAFT_ORDERS_UPDATE', path: 'draft/update'},
				// {topic: 'DRAFT_ORDERS_DELETE', path: 'draft/delete'},
				// {topic: 'ORDER_TRANSACTIONS_CREATE', path: 'transactions/create'},
				// {topic: 'FULFILLMENT_EVENTS_CREATE', path: 'fulfillments/event/create'},
				// {topic: 'FULFILLMENT_EVENTS_DELETE', path: 'fulfillments/event/delete'},
				// {topic: 'FULFILLMENTS_CREATE', path: 'fulfillments/create'},
				// {topic: 'FULFILLMENTS_UPDATE', path: 'fulfillments/delete'},
				// {topic: 'TENDER_TRANSACTIONS_CREATE', path: 'transactions/tender'},
			];
			this.registerWebhooks('orders', neededWebhooks, accessToken, shop).then((done) => {
				resolve(done);
			});
		});
	}

	/**
	 *
	 * @param {*} accessToken
	 * @param {*} shop
	 * @return {*}
	 */
	inventoryItemsWebhook(accessToken, shop) {
		return new Promise(async (resolve, reject) => {
			const neededWebhooks = [
				{topic: 'INVENTORY_ITEMS_CREATE', path: 'create'},
				{topic: 'INVENTORY_ITEMS_UPDATE', path: 'update'},
				{topic: 'INVENTORY_ITEMS_DELETE', path: 'delete'},

				{topic: 'INVENTORY_LEVELS_CONNECT', path: 'inventoryLevels/connect'},
				{topic: 'INVENTORY_LEVELS_DISCONNECT', path: 'inventoryLevels/disconnect'},
				{topic: 'INVENTORY_LEVELS_UPDATE', path: 'inventoryLevels/update'},
			];
			this.registerWebhooks('inventoryItems', neededWebhooks, accessToken, shop).then((done) => {
				resolve(done);
			});
		});
	}

	/**
	 * FOR REPAIR PURPOSE: in case for recreate all webhooks
	 * Function will clear all webhook and recreate them
	 * @param {*} ctx
	 * @return {*}
	 */
	async repairWebhooks(ctx) {
		const {shop, accessToken} = ctx.query;
		// eslint-disable-next-line no-undef
		const response = await fetch(`https://${shop}/admin/api/${apiVersion}/webhooks.json`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Access-Token': accessToken,
			},
		});
		const responseJson = await response.json();
		const {error, errors, webhooks} = responseJson;
		if (error || errors) {
			const err = error || errors;
			return console.error('clearAllWebhooks err', err);
		}
		console.log('clearAllWebhooks webhooks', {webhooks});
		for await (const hooks of webhooks) {
			// eslint-disable-next-line no-undef
			const response = await fetch(`https://${shop}/admin/api/${apiVersion}/webhooks/${hooks.id}.json`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'X-Shopify-Access-Token': accessToken,
				},
			});
			const responseJson = await response.json();
			console.log('clearAllWebhooks responseJson.data', {id: hooks.id, responseJson});
		}
		this.setupWebhook(accessToken, shop);
	}

	/**
	 * SET UP DONE : In App setup Shopify -> GDPR mandatory webhooks
	 * @param {*} accessToken
	 * @param {*} shop
	 * @return {*}
	 */
	// setRedactWebhook(accessToken, shop) {
	// 	return new Promise(async (resolve, reject) => {
	// 		const neededWebhooks = [
	// 			{topic: 'CUSTOMERS_REDACT', path: 'redactCustomer'},
	// 			{topic: 'SHOP_REDACT', path: 'redactShop'},
	// 			{topic: 'CUSTOMERS_DATA_REQUEST', path: 'customerDataRequest'},
	// 		];
	// 		this.registerWebhooks('redact', neededWebhooks, accessToken, shop).then((done) => {
	// 			resolve(done);
	// 		});
	// 	});
	// }
}
module.exports = new setupWebhook();

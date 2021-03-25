/* eslint-disable no-undef */
/* eslint-disable camelcase */
const autoBind = require('auto-bind');
const moment = require('moment');
const config = require('config');
const apiVersion = config.get('apiVersion');
const AppController = require('../controllers');
const {syncDatas} = require('../sync');
const {setupWebhook} = require('../webhooks/setup');

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, '../../.env')});

/**
 * The Subscriptions class for all the dependencies of the application
 */
class Subscriptions extends AppController {
	/**
	 * constructor
	 */
	constructor() {
		super();
		autoBind(this);
		this.SubscriptionsModel = this.models.subscriptions;
	}

	/**
	 *
	 * @param {*} ctx
	 * @return {*}
	 */
	checkSubscriptionAndRedirect(ctx) {
		return new Promise(async (resolve) => {
			const shopData = ctx.shop;
			if (!shopData) return resolve(false);
			await this.SubscriptionsModel.findAll({
				where: {shopId: shopData.id},
				attributes: ['id', 'currentPeriodEnd', 'planId', 'shopifyId', 'status', 'createdAt'],
				raw: true,
				order: [['createdAt', 'DESC']],
			})
				.then(async (shopSubscriptions) => {
					const lastSubscription = shopSubscriptions && shopSubscriptions[0];
					if (lastSubscription) {
						const {currentPeriodEnd, shopifyId, status, planId} = lastSubscription;
						if (status === 'ACCEPTED' || status === 'ACTIVE') {
							const isExpired = moment(currentPeriodEnd).isBefore(moment());
							if (!isExpired) {
								ctx.redirect(`${process.env.FRONT_END_URL}login?shop=${shopData.shop}&accessKey=${shopData.accessKey}`);
								return resolve(true);
							}
						}
						await this.checkShopifySubcriptions(shopifyId, {planId, ...shopData})
							.then(async ({chargeId, appSubscriptionData}) => {
								console.log({chargeId});
								if (chargeId && appSubscriptionData && appSubscriptionData.status !== 'CANCELLED') {
									await this.updateShopSubcriptions(ctx, shopifyId, appSubscriptionData, chargeId).then((done) => {
										return resolve(true);
									});
								} else {
									await this.redirectToSubscriptions(ctx, shopData).then((done) => {
										return resolve(true);
									});
								}
							})
							.catch((err) => {
								console.log('checkShopifySubcriptions', {err});
							});
					} else {
						await this.redirectToSubscriptions(ctx, shopData).then((done) => {
							return resolve(true);
						});
					}
				})
				.catch((err) => {
					console.log('SubscriptionsModel findAll subs', {err});
				});
		});
	}

	/**
	 *
	 * @param {*} shopifyId
	 * @param {*} shopData
	 * @return {*}
	 */
	checkShopifySubcriptions(shopifyId, shopData) {
		return new Promise(async (resolve, reject) => {
			const {shop, accessToken} = shopData;
			await this.getShopifyAppSubscriptionData(shopifyId, shopData)
				.then(async (appSubscriptionData) => {
					const chargesResponse = await fetch(
						`https://${shop}/admin/api/${apiVersion}/recurring_application_charges.json`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								'X-Shopify-Access-Token': accessToken,
							},
						}
					);
					const responseJson = await chargesResponse.json();
					const {error, errors, recurring_application_charges: chargeDatas} = responseJson;

					if (error || errors) {
						return reject(error || errors);
					} else {
						const {planId} = shopData;
						const {name: subscriptionName, createdAt} = appSubscriptionData;

						await chargeDatas.map(({decorated_return_url, created_at, name, status, id}) => {
							if (
								decorated_return_url.includes(`planId=${planId}`) &&
								name === subscriptionName &&
								moment(created_at).isAfter(createdAt) &&
								status === 'accepted'
							) {
								return resolve({chargeId: id, appSubscriptionData});
							}
						});
						return resolve({});
					}
				})
				.catch((err) => {
					console.log('checkShopifySubcriptions', {err});
					return resolve({});
				});
		});
	}

	/**
	 *
	 * @param {*} shopifyId
	 * @param {*} shopData
	 * @return {*}
	 */
	getShopifyAppSubscriptionData(shopifyId, shopData) {
		return new Promise(async (resolve, reject) => {
			const {shop, accessToken} = shopData;
			const response = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Shopify-Access-Token': accessToken,
				},
				body: JSON.stringify({
					query: `{
					node(id: "${shopifyId}") {
					  ...on AppSubscription {
						createdAt
						currentPeriodEnd
						id
						name
						status
						test
						trialDays
					  }
					}
				  }`,
				}),
			});

			const responseJson = await response.json();
			const {error, errors, data} = responseJson;

			if (error || errors) {
				return reject(error || errors);
			} else {
				return resolve(data.node);
			}
		});
	}

	/**
	 *
	 * @param {*} ctx
	 * @param {*} shopData
	 * @return {*}
	 */
	redirectToSubscriptions(ctx, shopData = {}) {
		return new Promise(async (resolve, reject) => {
			const {id, shop, accessToken, accessKey, planName} = shopData;
			console.log('===redirectToSubscriptions===', {id, shop, accessToken, accessKey});
			const planData = await this.models.plans.findOne({
				where: {
					type: {[this.OP.or]: [{[this.OP.eq]: planName}, {[this.OP.eq]: 'basic'}]},
					isPublished: true,
				},
				attributes: ['id', 'shopifyCreateData', 'title', 'trialDays'],
				raw: true,
			});
			if (!planData) {
				resolve(false);
				return ctx.redirect(`${process.env.FRONT_END_URL}login?shop=${shop}&accessKey=${accessKey}&planData=false`);
			}

			const {shopifyCreateData, title, trialDays} = planData;
			const planId = planData.id;
			const returnUrl = `${process.env.HOST}/confirmSubscription?planId=${planId}`;
			const query = JSON.stringify({
				query: `mutation {
        				appSubscriptionCreate(
        				    name: "${title}"
        				    returnUrl: "${returnUrl}"
        				    lineItems: ${shopifyCreateData}
							trialDays: ${trialDays}
							test: true
        				  ) {
        				      userErrors {
        				        field
        				        message
        				      }
        				      confirmationUrl
        				      appSubscription {
        				        id
        				      }
        				  }
     				}`,
			});

			// eslint-disable-next-line no-undef
			const response = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Shopify-Access-Token': accessToken,
				},
				body: query,
			});

			const responseJson = await response.json();
			const {error, errors, data} = responseJson;

			if (error || errors) {
				console.error(error || errors);
				resolve(false);
				return ctx.redirect(
					`${process.env.FRONT_END_URL}login?shop=${shop}&accessKey=${accessKey}&subscriptionFailed=true`
				);
			} else {
				const {confirmationUrl, appSubscription} = data.appSubscriptionCreate || {};
				const shopifyId = appSubscription.id;
				const saveData = {shopId: id, shopifyId, planId};
				await ctx.redirect(confirmationUrl);
				const query = {
					planId,
					shopId: id,
				};
				await this.upsertQuery(ctx, query, saveData, true, this.SubscriptionsModel)
					.then(async (result = {}) => {
						console.log({result});
						resolve(true);
						return true;
					})
					.catch((err) => {
						console.error('create subscription err', err);
						resolve(false);
						return false;
					});
			}
		});
	}

	/**
	 *
	 * @param {*} ctx
	 * @return {*}
	 */
	subscriptionConfirmation(ctx) {
		return new Promise(async (resolve, reject) => {
			const {id, shop, accessToken} = ctx.shop;
			console.log({query: ctx.query});
			const {planId, charge_id} = ctx.query;
			const chargeId = charge_id;
			console.log('subscriptionConfirmation', {chargeId, planId, id, shop, accessToken});

			await this.SubscriptionsModel.findOne({
				where: {planId, shopId: id},
				attributes: ['shopifyId', 'id'],
				raw: true,
			}).then(async (result) => {
				if (!result) {
					console.log('no Subscriptions found subscriptionConfirmation');
					return resolve(false);
				}
				const {shopifyId} = result;

				await this.getShopifyAppSubscriptionData(shopifyId, ctx.shop)
					.then((appSubscriptionData) => {
						this.updateShopSubcriptions(ctx, shopifyId, appSubscriptionData, chargeId).then((done) => {
							resolve(done);
						});
					})
					.catch((err) => {
						console.log(err);
					});
			});
		});
	}

	/**
	 *
	 * @param {*} ctx
	 * @param {*} shopifyId
	 * @param {*} appSubscriptionData
	 * @param {*} chargeId
	 * @return {*}
	 */
	async updateShopSubcriptions(ctx, shopifyId, appSubscriptionData, chargeId) {
		return new Promise((resolve) => {
			const {shop, accessToken, syncStatus} = ctx.shop;
			const updateData = {...appSubscriptionData, chargeId};
			const isSubscribed = ['ACCEPTED', 'ACTIVE'].indexOf(appSubscriptionData.status) !== -1;
			delete updateData.id;
			this.SubscriptionsModel.update(updateData, {where: {shopifyId}})
				.then(async (updatedData) => {
					console.log('confirmSubscription updated data', {updatedData});
					resolve(true);
					if (isSubscribed && syncStatus === 'notBegun') {
						console.log('Ready to syncData');
						await syncDatas(ctx);
						await setupWebhook(accessToken, shop);
					}
				})
				.catch((err) => {
					console.log('confirmSubscription updated err', {err});
				});
		});
	}
}
module.exports = new Subscriptions();

const config = require('config');
const {syncDatas, syncShop} = require('../sync');
const currentTenent = config.get('currentTenent');
const {redirectToSubscriptions, checkSubscriptionAndRedirect} = require('../utils/subscriptions');
const moment = require('moment');
const {Sequelize} = require('../models');

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, '../../.env')});

module.exports = async (ctx, accessKey) => {
	const {shops, subscriptions} = ctx.models;
	let {shop, accessToken} = await ctx.session || {};
	try {
		if (!shop) return false;
		const shopData = await shops.findOne({
			where: {shop},
			attributes: [
				'id',
				'shop',
				'shopifyStoreCreatedAt',
				'planName',
				'domain',
				'syncStatus',
				'accessToken',
				'accessKey',
				'dedicatedSchema',
				'isDeleted',
			],
			raw: true,
		});
		if (!shopData) {
			const saveData = {shop, accessToken, dedicatedSchema: currentTenent, accessKey};
			await shops
				.create(saveData)
				.then(async (result) => {
					ctx.shop = result;
					const {dedicatedSchema, id} = result;
					await syncShop(ctx, 'notBegun').then(async ({planName, shopifyStoreCreatedAt}) => {
						// Handle subscription and Redirect to shop
						ctx.shop.planName = planName;
						ctx.shop.shopifyStoreCreatedAt = shopifyStoreCreatedAt;
						await redirectToSubscriptions(ctx, {id, shop, accessToken, accessKey, planName}, true);
						await ctx.changeSchema(dedicatedSchema);
					});
					console.log('shops created');
					return ctx;
				})
				.catch(async (err) => {
					console.log('shops.create', err);
					return false;
				});
		} else {
			const updateData = {accessKey};
			if (shopData.isDeleted === true) {
				updateData.isDeleted === false;
			}
			if (accessToken && accessToken !== shopData.accessToken) {
				updateData.accessToken = accessToken;
				shopData.accessToken = accessToken;
			}
			shops.update(updateData, {where: {shop}}).then(async (result) => {
				console.log('accessToken & key updates');
			});
			ctx.shop = {...shopData, accessKey};
			await ctx.changeSchema(shopData.dedicatedSchema);
			console.log('shops exists');
			const shopSubscriptions = await subscriptions.findOne({
				where: {
					shopId: shopData.id,
					status: {[Sequelize.Op.or]: [{[Sequelize.Op.eq]: 'ACCEPTED'}, {[Sequelize.Op.eq]: 'ACTIVE'}]},
				},
				attributes: ['id', 'currentPeriodEnd'],
				raw: true,
			});
			if (shopSubscriptions && !moment(shopSubscriptions.currentPeriodEnd).isBefore(moment())) {
				// Redirect to shop
				ctx.redirect(`${process.env.FRONT_END_URL}login?shop=${shop}&accessKey=${accessKey}`);
			} else {
				await checkSubscriptionAndRedirect(ctx);
			}

			return ctx;
		}
	} catch (err) {
		console.log('setNewShop error catch', err);
		return false;
	}
};

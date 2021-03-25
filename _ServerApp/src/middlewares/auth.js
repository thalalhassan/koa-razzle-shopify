const models = require('../models');
module.exports = async (ctx, next) => {
	const {shops} = models;
	let {shop} = (await ctx.session) || {};

	console.log({ctx: JSON.stringify(ctx), session: ctx.session, cookies: ctx.cookies});

	// form webhook auth
	if (ctx.header && ctx.header['x-shopify-shop-domain']) {
		shop = ctx.header['x-shopify-shop-domain'];
	}
	try {
		if (!shop) return next();
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
		if (shopData) {
			ctx.shop = shopData;
			await ctx.changeSchema(shopData.dedicatedSchema);
		}
		return next();
	} catch (err) {
		next(err);
		console.log('sequelize auth error', err);
	}
};

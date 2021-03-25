const AppController = require('.');
const autoBind = require('auto-bind');
const {repairWebhooks} = require('../webhooks/setup');
const {syncDatas} = require('../sync');
const {getDedicatedModels} = require('../helper/getDedicatedModels');

/**
 * RepairController
 */
class RepairController extends AppController {
	/**
	 * @param {*} model
	 */
	constructor(model) {
		super(model);
		autoBind(this);
	}

	/**
	 *
	 * @param {*} ctx
	 * @param {*} next
	 */
	webhooksRepair(ctx, next) {
		ctx.body = 'on process please check console';
		ctx.status = 200;
		repairWebhooks(ctx);
		console.log('==============in webhooksRepair=================');
	}
	/**
	 *
	 * @param {*} ctx
	 * @param {*} next
	 */
	async reSync(ctx, next) {
		const shopDomain = ctx.query.shop;
		await this.models.shops
			.findOne({
				where: {shop: shopDomain, isDeleted: false},
				attributes: ['id', 'shop', 'accessToken', 'dedicatedSchema', 'syncStatus'],
				raw: true,
			})
			.then(({id, shop, accessToken, dedicatedSchema, syncStatus}) => {
				ctx.body = 'on process please check console';
				ctx.status = 200;
				getDedicatedModels(dedicatedSchema).then(({success, models}) => {
					if (!success) {
						console.log('No dedicated models found');
						return true;
					}
					ctx.models = models;
					ctx.shop.id = id;
					ctx.session.shop = shop;
					ctx.session.accessToken = accessToken;
					syncDatas(ctx, null, syncStatus);
				});
			})
			.catch((err) => {
				ctx.body = err;
				ctx.status = 200;
			});
	}
}
module.exports = RepairController;

const models = require('../models');

/**
 *
 * @param {*} dedicatedSchema
 * @param {*} shopId
 * @return {*}
 */
const getDedicatedModels = (dedicatedSchema, shopId) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!dedicatedSchema) {
				const shop = await models.shops.findOne({where: {id: shopId}, raw: true});
				if (!shop) return resolve({success: false, message: 'No shop found'});
				dedicatedSchema = shop.dedicatedSchema;
			}
			const {sequelize, Sequelize, ...dbModels} = models;
			Object.keys(dbModels).forEach(async (modelName) => {
				const model = dbModels[modelName];
				dbModels[modelName] = await model.changeSchema(dedicatedSchema);
			});
			return resolve({success: true, models: dbModels});
		} catch (err) {
			reject(err);
		}
	});
};

export {getDedicatedModels};

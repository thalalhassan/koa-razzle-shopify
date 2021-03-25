const models = require('../models');
module.exports = async (ctx, next) => {
	const {sequelize, Sequelize, ...dbModels} = models;
	ctx.models = dbModels;
	ctx.changeSchema = async (schema) => {
		Object.keys(ctx.models).forEach(async (modelName) => {
			const model = await ctx.models[modelName];
			ctx.models[modelName] = await model.changeSchema(schema);
		});
	};
	await next();
};

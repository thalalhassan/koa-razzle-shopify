const fs = require('fs');
const path = require('path');
const config = require('config');
const Sequelize = require('veirryau-sequelize');

const models = {};
const dbConfig = config.get('db');
const currentTenent = config.get('currentTenent');

/**
 * Create DB if not exist
 */
const {CreateTabels} = require('./_helper');
const excludeFiles = ['category', 'shops', 'schedulejobs', 'emailTemplates', 'plans', 'subscriptions'];
CreateTabels(Sequelize, models, currentTenent, dbConfig, [], excludeFiles );

/**
 *
 * @param {*} schema
 * @return {*}
 */
const sequelize = (schema = dbConfig.DB) =>
	new Sequelize(schema, dbConfig.USER, dbConfig.PASSWORD, {
		host: dbConfig.HOST,
		logging: false,
		dialect: dbConfig.dialect,
		operatorsAliases: false,
		define: {
			timestamps: false,
		},
		pool: {
			max: dbConfig.pool.max,
			min: dbConfig.pool.min,
			acquire: dbConfig.pool.acquire,
			idle: dbConfig.pool.idle,
		},
	});

fs.readdirSync(path.join(__dirname, '/')).filter((val) => val.endsWith('.js')).forEach(async (file) => {
	if (file === 'index.js' || file === '_helper.js') {
		return true;
	} else if (file.match(/\.js$/) !== null) {
		const filePath = path.join(__dirname, file);
		let model = require(filePath);
		const database = sequelize();
		model = database.import(filePath);
		models[model.name] = model.changeSchema(dbConfig.DB);
	}
});

models.sequelize = sequelize();
models.Sequelize = Sequelize;

Object.keys(models).forEach((modelName) => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

models.sequelize.sync({logging: console.log}).then(
	(done) => {
		console.log('DB connection success =====', done && done.config);
	},
	(err) => {
		console.log('DB connection error', err);
	}
);

module.exports = models;

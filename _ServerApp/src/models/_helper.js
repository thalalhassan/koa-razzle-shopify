const autoBind = require('auto-bind');
const fs = require('fs');
const path = require('path');
const {isJson} = require('../helper');
/**
 * class Helper
 */
class Helper {
	/**
	 *
	 */
	constructor() {
		autoBind(this);
	}

	/**
	 *
	 * @param {*} value
	 * @return {*}
	 */
	getDataAsJSON(value) {
		if (typeof value === 'object') return value;
		const parsedValue = isJson(value) ? JSON.parse(value) : undefined;
		return parsedValue;
	}

	/**
	 *
	 * @param {*} value
	 * @return {*}
	 */
	getDataAsArray(value) {
		if (Array.isArray(value)) return value;
		const parsedValue = value ? value.split(';') : undefined;
		return parsedValue;
	}

	/**
	 *
	 * @param {*} Sequelize
	 * @param {*} models
	 * @param {*} dbName
	 * @param {*} dbConfig
	 * @param {*} includeFiles
	 * @param {*} excludeFiles
	 */
	CreateTabels(Sequelize, models, dbName, dbConfig, includeFiles = [], excludeFiles = []) {
		if (!dbName) dbName = dbConfig.DB;
		const sequelize = new Sequelize(dbName, dbConfig.USER, dbConfig.PASSWORD, {
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

		fs.readdirSync(path.join(__dirname, '/'))
			.filter((val) => val.endsWith('.js'))
			.forEach((file) => {
				const fileName = file.replace('.js', '');
				excludeFiles = [...excludeFiles, 'index', '_helper'];

				if (excludeFiles.indexOf(fileName) !== -1) {
					return true;
				}

				if (includeFiles && includeFiles.length) {
					if (includeFiles.indexOf(fileName) !== -1) {
						const model = require(path.join(__dirname, file))(sequelize, Sequelize);
						model.changeSchema(dbName);
						models[model.name] = model;
					}
				} else if (fileName !== null) {
					const model = require(path.join(__dirname, file))(sequelize, Sequelize);
					model.changeSchema(dbName);
					models[model.name] = model;
				}
			});

		// ========= TODO : CORRECT ALL THE ASSOCIATES IN ALL MODELS AND UNCOMMENT ======
		// Object.keys(models).forEach((modelName) => {
		// 	if (modelName !== 'shops' && models[modelName].associate) {
		// 		models[modelName].associate(models);
		// 	}
		// });

		// sequelize.sync().then(
		// 	() => {
		// 		console.log('============= CREATE TABLES IF NOT EXIST :  SUCCESS ================');
		// 	},
		// 	(err) => {
		// 		console.log('!!!!!!!! CREATE TABLES IF NOT EXIST :  ERROR !!!!! ', err);
		// 	}
		// );
	}
}

module.exports = new Helper();

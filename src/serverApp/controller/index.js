const autoBind = require('auto-bind');
const models = require('../models');
const {sequelize, Sequelize} = require('../models');

/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class AppController {
	/**
	 * @param {Model} model The default model object
	 * for the controller. Will be required to create
	 * an instance of the controller
	 */
	constructor(model) {
		if (new.target === AppController) {
			throw new TypeError('Cannot construct Abstract instances directly');
		}
		this._model = model;
		this.models = models;
		this.OP = Sequelize.Op;
		autoBind(this);
	}

	/**
	 *
	 * @param {*} ctx
	 * @param {*} message
	 * @param {*} code
	 * @param {*} data
	 * @param {*} metaData
	 */
	jsonSuccess(ctx, message, code, data, metaData) {
		ctx.body = {message, data, metaData};
		ctx.status = code || 200;
	}
	/**
	 *
	 * @param {*} ctx
	 * @param {*} message
	 * @param {*} code
	 * @param {*} err
	 */
	jsonError(ctx, message, code, err) {
		ctx.body = {message, err};
		ctx.status = code || 400;
	}
	/**
	 * @param {*} ctx
	 * @param {*} err
	 */
	ServerError(ctx, err) {
		console.log('ServerError', err);
		ctx.body = {err};
		ctx.status = 500;
	}

	/**
	 * @param {Object} ctx The context object
	 * @param {Array} data
	 * @param {Array} include
	 * @param {Boolean} returnData
	 * @param {Model} Model
	 * @return {Object} ctx The response object
	 */
	create(ctx, data, include, returnData = false, Model = this._model) {
		return new Promise((resolve, reject) => {
			Model.create(data, {
				include: include,
			})
				.then((result) => {
					if (returnData) {
						resolve(result);
					} else {
						return this.jsonSuccess(ctx, 'Success', 200, {
							...result,
						});
					}
				})
				.catch((err) => {
					console.log('====create error======', err);
					return this.ServerError(ctx, err);
				});
		});
	}

	/**
	 * update By Query
	 * @param {Object} ctx The context object
	 * @param {Object} query The query object
	 * @param {Object} updateData The update object
	 * @param {Object} returnData
	 * @param {Model} Model
	 * @return {*}
	 */
	updateByQuery(ctx, query = {}, updateData = {}, returnData = false, Model = this._model) {
		return new Promise((resolve, reject) => {
			Model.update(updateData, {
				where: query,
			})
				.then((result) => {
					if (returnData) resolve(result);
					else return this.jsonSuccess(ctx, 'Success', 200, result);
				})
				.catch((err) => {
					console.log('====updateByQuery error======', err);
					return this.ServerError(ctx, err);
				});
		});
	}

	/**
	 * update By Query
	 * @param {Object} ctx The context object
	 * @param {Object} query The query object
	 * @param {Object} updateData The update object
	 * @param {Object} returnData
	 * @param {Model} Model
	 * @param {Object} setKey The update option object
	 * @param {Object} checkKey The update option object
	 * @return {*}
	 */
	bulkUpdate(
		ctx,
		query = {},
		updateData = {},
		returnData = false,
		Model = this._model,
		setKey = 'meta_value',
		checkKey = 'meta_key'
	) {
		return new Promise(async (resolve, reject) => {
			let cases = '';
			let where = [];
			Object.keys(updateData).forEach((key) => {
				cases = `${cases} WHEN ${checkKey} = '${key}' THEN '${updateData[key]}'`;
			});
			Object.keys(query).forEach((key) => {
				// where = `${where} ${key} = ${query[key] }`;
				where.push(`${key} = '${query[key]}'`);
			});

			const rawQuery = `UPDATE ${
				Model.tableName
			} SET ${setKey} = ( CASE ${cases} ELSE ${setKey} END ) WHERE ${where.join(' AND ')}`;

			sequelize
				.query(rawQuery)
				.then((data) => {
					const [results, metadata] = data;
					if (returnData) resolve(results);
					else return this.jsonSuccess(ctx, 'Success', 200, results);
				})
				.catch((err) => {
					return this.ServerError(ctx, err);
				});
		});
	}

	/**
	 * update By Query
	 * @param {Object} ctx The context object
	 * @param {Object} query The query object
	 * @param {Object} options The update object
	 * @param {Object} returnData
	 * @param {Model} Model
	 * @return {*}
	 */
	useRawQuery(ctx, query = {}, options = {}, returnData = false, Model = this._model) {
		return new Promise(async (resolve, reject) => {
			sequelize
				.query(query, options)
				.then((data) => {
					const [results, metadata] = data;
					if (returnData) resolve(results);
					else return this.jsonSuccess(ctx, 'Success', 200, results);
				})
				.catch((err) => {
					return this.ServerError(ctx, err);
				});
		});
	}

	/**
	 * update By Query
	 * @param {Object} ctx The context object
	 * @param {Object} query The query object
	 * @param {Object} updateData The query object
	 * @param {Object} returnData
	 * @param {Model} Model
	 * @return {*}
	 */
	upsertQuery(ctx, query = {}, updateData = {}, returnData = false, Model = this._model) {
		return new Promise(async (resolve, reject) => {
			Model.findOne({where: query})
				.then((obj) => {
					if (obj) {
						obj.update(updateData);
						if (returnData) {
							resolve(true);
						} else this.jsonSuccess(ctx, 'Update Success', 200);
					} else {
						Model.create(updateData);
						if (returnData) {
							resolve(true);
						} else this.jsonSuccess(ctx, 'Insert Success', 200);
					}
				})
				.catch((err) => {
					this.ServerError(ctx, err);
				});
		});
	}

	/**
	 * delete By Query
	 * @param {Object} ctx The context object
	 * @param {Object} query
	 * @param {Object} returnData
	 * @param {Object} Model
	 * @return {*}
	 */
	deleteByQuery(ctx, query = {}, returnData = false, Model = this._model) {
		return new Promise(async (resolve, reject) => {
			/**
			 * if no query then set isDeleted to true by _id
			 */

			Model.destroy({
				where: query,
			})
				.then((result) => {
					if (returnData) {
						return resolve(true);
					}
					return this.jsonSuccess(ctx, 'Document deleted', 200, result);
				})
				.catch((err) => {
					return this.ServerError(ctx, err);
				});
		});
	}

	/**
	 * get All
	 * @param {Object} ctx The context object
	 * @param {*} fields
	 * @param {*} matchQuery
	 * @param {*} returnData
	 * @param {*} include
	 * @param {*} Model
	 * @return {*}
	 */
	getAll(ctx, fields = {}, matchQuery = {}, returnData = false, include = [], Model = this._model) {
		return new Promise((resolve, reject) => {
			fields.attributes = fields;
			Model.findAll({
				...fields,
				where: matchQuery,
				include,
				// offset: parseInt(req.query.page) || 0,
				// limit: 10,
			})
				.then((result) => {
					if (returnData) resolve(result);
					else return this.jsonSuccess(ctx, 'Success', 200, result);
				})
				.catch((err) => {
					console.log(err);
					return this.ServerError(ctx, err);
				});
		});
	}

	/**
	 *
	 * @param {Object} ctx The context object
	 * @param {*} data
	 * @param {*} returnData
	 * @param {*} Model To  aggregate with specific model
	 * @param {*} options
	 * @return {*}
	 */
	createMany(ctx, data = [], returnData = false, Model = this._model, options = {}) {
		return new Promise((resolve, reject) => {
			options.returning = true;
			Model.bulkCreate(data, options)
				.then((result) => {
					if (returnData) return resolve(result);
					return this.jsonSuccess(ctx, 'Data Added', 200, result);
				})
				.catch((err) => {
					if (returnData) return reject(err);
					return this.ServerError(ctx, err);
				});
		});
	}

	/**
	 *
	 * @param {Object} ctx The context object
	 * @param {function} next The callback to the next program handler
	 * @param {*} query
	 * @param {*} fields
	 * @param {*} extended
	 * @param {*} returnData
	 * @param {*} Model To  aggregate with specific model
	 * @return {*}
	 */
	getByQuery(ctx, next, query = {}, fields = {}, extended = [], returnData = false, Model = this._model) {
		return new Promise((resolve, reject) => {
			Model.findByPk(ctx.params.id)
				.then((result) => {
					return this.jsonSuccess(ctx, 'Data retrieved', 200, result);
				})
				.catch((err) => {
					return this.ServerError(ctx, err);
				});
		});
	}
}
module.exports = AppController;

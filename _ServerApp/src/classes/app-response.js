const _ = require('underscore');
/**
 * The App Error class
 */
class AppResponse {
	/**
	 * @param {String} message The error message
	 * @param {Number} code The status code of the error
	 * @param {Object} data The optional error data
	 * @param {Object} metaData The optional error data
	 */
	constructor(message, code, data = undefined, metaData = undefined) {
		this._message = message;
		this._code = code;
		this._data = data;
		this._metaData = metaData;
		this._success = true;
	}

	/**
	 * @return {Number}
	 */
	get code() {
		return this._code;
	}

	/**
	 * @return {Object}
	 */
	get data() {
		return this._data;
	}
	/**
	 * @return {Object}
	 */
	get metaData() {
		return this._metaData;
	}
}

module.exports = AppResponse;

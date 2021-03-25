const _ = require('underscore');

/**
 * The App Error class
 */
class AppError extends Error {
	/**
	 * @param {String} message The error message
	 * @param {Number} code The status code of the error
	 * @param {Object} errors The optional error / errors
	 */
	constructor(message, code, errors = undefined) {
		super();
		this._message = message;
		this._success = false;
		this._code = code;
		if (errors) {
			this._message = errors._message ? errors._message : message;
			this._errors = errors.errors ? this.errorToSimpleObject(errors.errors) : this.errorToSimpleObject(errors);
		}
		// Error.captureStackTrace(this, AppError);
	}

	/**
	 * @return {Number}
	 */
	get code() {
		return this._code;
	}

	/**
	 * @return {Array}
	 */
	get errors() {
		return this._errors;
	}

	/**
	 * To Avoid different fomat in error response
	 * Due to packages Validatorjs [object] and mongoose-unique-validator [array]
	 * @param {Object} error The error object
	 * @return {Object} The errors array
	 */
	errorToSimpleObject(error) {
		let errorObject = {};
		if (!_.isEmpty(error)) {
			for (let prop in error) {
				if (error.hasOwnProperty(prop)) {
					let propNested = prop.split('.');
					if (_.isArray(propNested) && propNested.length > 1) {
						if (_.isArray(error[prop])) {
							error[prop].message = error[prop][0];
						}
						if (errorObject[propNested[0]]) {
							errorObject[propNested[0]][propNested[1]] = error[prop].message || error[prop];
						} else {
							errorObject[propNested[0]] = {
								[propNested[1]]: error[prop].message || error[prop],
							};
						}
					} else {
						if (_.isArray(error[prop])) error[prop].message = error[prop][0];
						errorObject[prop] = error[prop].message || error[prop];
					}
				}
			}
		} else {
			errorObject = {error};
		}
		console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n', errorObject, '\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
		return errorObject;
	}
	/**
	 * @return {Object} The instance of AppError
	 */
	format() {
		let obj = {
			success: this._success,
			code: this._code,
			message: this._message,
		};
		if (this.errors) {
			obj.errors = this.validationErrorsToArray(this._errors);
		}
		return obj;
	}

	/**
	 * @param {Object} error The error object
	 * @return {Object} The errors array
	 */
	validationErrorsToArray(error) {
		let errorsArray = [];
		if (!_.isEmpty(error)) {
			for (let prop in error) {
				if (error.hasOwnProperty(prop)) {
					_.forEach(error[prop], (errorMessage) => {
						errorsArray.push(errorMessage);
					});
				}
			}
		}
		if (errorsArray.length) return errorsArray;
		else return this._errors;
	}
}

module.exports = AppError;

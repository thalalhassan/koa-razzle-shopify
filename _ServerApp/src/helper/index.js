const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');
const autoBind = require('auto-bind');

/**
 * The Helper class
 */
class Helper {
	/**
	 * constructor
	 */
	constructor() {
		autoBind(this);
	}

	/**
	 *
	 * @param {*} array
	 * @param {*} doFunction
	 * @return {*}
	 */
	asyncMap(array = [], doFunction) {
		return new Promise(async (resolve, reject) => {
			try {
				const finalArray = await array.map(async (element) => {
					await doFunction(element);
					console.log('asyncMap in');
				});
				console.log('asyncMap resolve');
				resolve(finalArray);
			} catch (err) {
				return reject(err);
			}
		});
	}

	/**
	 *
	 * @param {*} ms
	 * @return {*}
	 */
	sleep(ms) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}

	/**
	 * Random Token generator
	 * @return {*}
	 */
	createRandomToken() {
		return bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10);
	}

	/**
	 *
	 * @param {*} array
	 * @param {*} test
	 * @return {*}
	 */
	checkRegexMatch(array = [], test) {
		const regexList = array.map((e) => new RegExp(e));
		const isMatch = regexList.some((rx) => rx.test(test));
		return isMatch;
	}

	/**
	 *
	 * @param {*} testPath
	 * @return {*}
	 */
	pathToExcludeMiddleware(testPath) {
		if (testPath === '/') return false;
		return !this.checkRegexMatch(['/auth', '/confirmSubscription', '/admin', 'shopifyLogin'], testPath);
	}

	/**
	 * Delete multer uploaded files in error case
	 * @param {*} req
	 * @return {*}
	 */
	deleteFile(req) {
		if (req.file && fs.existsSync(req.file.path)) {
			fs.unlink(req.file.path, (error) => {
				if (error) console.log('-------file unlink error---\n', error, '\n-----');
			});
		}
		if (req.files) {
			req.files.forEach((file) => {
				if (fs.existsSync(file.path)) {
					fs.unlink(file.path, (error) => {
						if (error) console.log('-------files unlink error---\n', error, '\n-----');
					});
				}
			});
		}
		return true;
	}
	/**
	 *
	 * @param {*} val
	 * @param {*} prop
	 * @return {*}
	 */
	manageObj(val, prop) {
		if (typeof val === 'string') {
			return val;
		}
		if (typeof val === 'undefined') {
			return false;
		}
		let _index = prop.indexOf('.');
		if (_index > -1) {
			return this.manageObj(val[prop.substring(0, _index)], prop.substr(_index + 1));
		}
		return val[prop];
	}

	/**
	 *Check is value empty or not
	 * @param {*} value
	 * @return {*} value
	 */
	isEmpty(value) {
		return (
			value === undefined ||
			value === null ||
			(typeof value === 'object' && Object.keys(value).length === 0) ||
			(typeof value === 'string' && value.trim().length === 0) ||
			(typeof Array.isArray(value) && value.length === 0)
		);
	}
	/**
	 *
	 * @param {*} str
	 * @return {*}
	 */
	isJson(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}
	/**
	 *
	 *@return {*}
	 */
	multerJsonParse() {
		return (req, res, next) => {
			Object.keys(req.body).forEach((key) => {
				req.body[key] = this.isJson(req.body[key]) ? JSON.parse(req.body[key]) : req.body[key];
			});
			next();
		};
	}

	/**
	 * Camelize a string, cutting the string by multiple separators like
	 * hyphens, underscores and spaces.
	 * @param {string} text Text to camelize
	 * @return {string} string Camelized text
	 */
	camelize(text) {
		return text.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) => {
			if (p2) return p2.toUpperCase();
			return p1.toLowerCase();
		});
	}

	/**
	 *
	 * @param {*} object
	 * @return {*}
	 */
	async objectKeysToCamelCase(object) {
		if (this.isEmpty(object)) return object;
		const convertedObject = {};
		await Object.keys(object).forEach((key) => {
			convertedObject[this.camelize(key)] = object[key];
		});
		return convertedObject;
	}
}
module.exports = new Helper();

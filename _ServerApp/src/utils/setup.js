const config = require('config');
const autoBind = require('auto-bind');
const {scheduledSync} = require('../sync');

/**
 * The setup class for all the dependencies of the application
 */
class SetUp {
	/**
	 * constructor
	 */
	constructor() {
		autoBind(this);
	}
	/**
	 * @constructor
	 * @param {Object} config The config object
	 */
	static initialize() {
		this.setupScheduler();
	}

	/**
	 *
	 */
	static setupScheduler() {
		console.log('=========== setup scheduler done =============');
		scheduledSync();
	}
}

module.exports = SetUp;

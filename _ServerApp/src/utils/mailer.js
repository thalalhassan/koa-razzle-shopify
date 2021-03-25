const nodemailer = require('nodemailer');
const config = require('config');
const ejs = require('ejs');
const path = require('path');
const EmailTemplateModel = require('../models/EmailTemplates');
/**
 * class MailerService
 */
class MailerService {
	/**
	 * constructor
	 */
	constructor() {
		if (!this._transporter) {
			this._transporter = nodemailer.createTransport(config.get('smtp'));
			this._transporter.verify(function(error, success) {
				if (error) {
					console.log(error);
				} else {
					console.log('Server is ready to take our messages');
				}
			});
		}
	}

	/**
	 * @param {*} mailOption
	 * @return {*}
	 */
	sendMail(mailOption) {
		return new Promise((resolve, reject) => {
			this._transporter.sendMail(mailOption, (err, info) => {
				if (err) {
					console.log(`error: ${err}`);
					reject(err);
				}
				console.log(`Message Sent ${info.response}`);
				resolve({success: true, msg: `Message Sent ${info.response}`});
			});
		});
	}

	/**
	 * @param {*} key
	 * @return {*}
	 */
	getEmailTemplate(key) {
		return new Promise((resolve, reject) => {
			EmailTemplateModel.findOne(
				{
					key: key,
				},
				(err, template) => {
					if (err) reject(err);
					resolve(template);
				}
			);
		});
	}

	/**
	 *
	 * @param {*} from
	 * @param {*} to
	 * @param {*} templateDetails
	 * @return {*}
	 */
	sendMailer(from, to, templateDetails) {
		return new Promise((resolve, reject) => {
			this.getEmailTemplate(templateDetails.templateKey).then((template) => {
				templateDetails.data['header'] = template.header ? template.header : '';
				templateDetails.data['content'] = template.content ? template.content : '';
				templateDetails.data['footer'] = template.footer ? template.footer : '';
				ejs.renderFile(
					path.resolve(__dirname, `../templates/${templateDetails.ejs}`),
					templateDetails.data,
					'utf-8',
					(err, html) => {
						if (err) {
							reject(err);
						} else {
							let mailOptions = {
								to: to,
								subject: template.subject,
								from: template.from_email,
								from_name: template.from_name,
								html: html,
							};
							if (from) {
								mailOptions['from'] = from;
							}
							this.sendMail(mailOptions)
								.then((data) => {
									resolve({success: true, msg: `Email send to registered mail`});
								})
								.catch((err) => {
									reject(err);
								});
						}
					}
				);
			});
		});
	}
}

module.exports = new MailerService();

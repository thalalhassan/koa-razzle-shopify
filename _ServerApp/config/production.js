const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'http://localhost';
module.exports = {
	app: {
		name: 'shopify-sync-api',
		port: PORT,
		baseUrl: `${HOST}:${PORT}`,
	},
	api: {
		prefix: '/api/',
		versions: ['v1.0'],
	},
	lang: 'en',
	authToken: {
		superSecret: 'ipa-odot',
		expiresIn: 86400,
	},
	jwtTimeOut: '24h',
	jwtSecret: 'secret',
	db: {
		HOST: 'database-1.cdwulgukyqty.eu-west-2.rds.amazonaws.com',
		USER: 'admin',
		PASSWORD: '7EDT03jwKIuNTKQ8PN8I',
		DB: 'shopify_reports',
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	},
	itemsPerPage: {
		default: 10,
	},
	smtp: {
		host: 'smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: 'e78d6ca0a4c9c0',
			pass: '3daa1d6ed21d4b',
		},
	},
	otp: {
		auth: 'AIzaSyBsn1zQzmq-HFnN7gJgpDi_4VybAQk6W9M',
		version: 'v3',
	},
	aws: {
		accessKeyId: 'AKIASQKVG775T4TEY5HK',
		secretAccessKey: '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',
	},
	redis: {
		port: 6379, // Redis port
		host: '139.59.27.29', // Redis host
		// family: 4, // 4 (IPv4) or 6 (IPv6)
		// password: 'auth',
		// db: 0,
	},
	currentTenent: 'shopify_reports_tenent_1',
	fileEncryptionKey: 'SUPER-SECRET-KEY',
	fileEncryptionAlgorithm: 'aes256',
	apiVersion: '2020-10',
	host: HOST,
	SCOPES: [
		'read_products',
		'read_customers',
		'read_all_orders',
		'read_draft_orders',
		'read_inventory',
		'read_locations',
		'read_fulfillments',
		'read_shipping',
	],
};

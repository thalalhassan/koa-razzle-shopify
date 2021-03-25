module.exports = {
	apps: [
		{
			name: 'Pro Report Shopify [SyncApp - API]',
			script: 'node dist/index.js',
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				PORT: 3000,
				NODE_ENV: 'development',
			},
			env_production: {
				PORT: 3001,
				NODE_ENV: 'production',
			},
			env_demo: {
				PORT: 3006,
				NODE_ENV: 'demo',
			},
			env_staging: {
				PORT: 3001,
				NODE_ENV: 'staging',
			},
		},
	],

	deploy: {
		production: {
			'user': 'node',
			'host': '212.83.163.1',
			'ref': 'origin/master',
			'repo': 'git@github.com:repo.git',
			'path': '/var/www/production',
			'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
		},
	},
};

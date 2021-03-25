// Load `*.js` under current directory as properties
const koaRouter = require('koa-router');
const path = require('path');
const fs = require('fs');
const router = new koaRouter();

fs.readdirSync(path.join(__dirname, '/'))
	.filter((val) => val.endsWith('.js'))
	.forEach((file) => {
		if (file !== 'index.js') {
			const name = file.replace('.js', '');
			const filePath = path.join(__dirname, file);
			router.use('/' + name, require(filePath).routes(), require(filePath).allowedMethods());
		}
	});

module.exports = router;

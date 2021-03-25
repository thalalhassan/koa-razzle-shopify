require('isomorphic-fetch');
const Router = require('koa-router');
const koa = require('koa');
const logger = require('koa-logger');
const config = require('config');
const session = require('koa-session');
const json = require('koa-json');
const koaSend = require('koa-send');
const mount = require('koa-mount');
const ignore = require('koa-ignore');

const {default: createShopifyAuth} = require('@shopify/koa-shopify-auth');
const {verifyRequest} = require('@shopify/koa-shopify-auth');
const {default: graphQLProxy} = require('@shopify/koa-shopify-graphql-proxy');

const adminRoutes = require('./routes');
const AppError = require('./classes/app-error');
const sequelizeMiddleware = require('./middlewares/sequelize');
const authMiddleware = require('./middlewares/auth');
const setupShop = require('./middlewares/setupShop');
const {subscriptionConfirmation, checkSubscriptionAndRedirect} = require('./utils/subscriptions');
const {createRandomToken, pathToExcludeMiddleware} = require('./helper');
const SCOPES = config.get('SCOPES');
const SetUp = require('./utils/setup');
const {default: Shopify, ApiVersion} = require('@shopify/shopify-api');

const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== 'production';
const dotenv = require('dotenv');
const serve = require('koa-static');
dotenv.config();

const app = new koa();
const router = new Router();

const {SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, FRONT_END_URL, HOST} = process.env;
// const cookieOptions = {httpOnly: false, secure: true, sameSite: 'none'};

// Initializing setups (eg: for schedule etc..)
SetUp.initialize();

Shopify.Context.initialize({
	API_KEY: SHOPIFY_API_KEY,
	API_SECRET_KEY: SHOPIFY_API_SECRET_KEY,
	SCOPES,
	HOST_NAME: HOST.replace(/https:\/\//, ''),
	API_VERSION: ApiVersion.October20,
	IS_EMBEDDED_APP: true,
	// This should be replaced with your preferred storage strategy
	SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// const appPath = '/home/ubuntu/Staging/pro-report.acodez.ca/ClientApp/Client/build';
const appPath = `${__dirname}/../build`;
const appImagepath = '../build/images';

app.use(serve(__dirname + '/../public'));
app.use(mount('/images', serve(appImagepath)));

// koa json
app.use(json());

app.use(session({sameSite: 'none', secure: true}, app));
app.keys = [SHOPIFY_API_SECRET_KEY];

const ACTIVE_SHOPIFY_SHOPS = {};

app.use(
	ignore(
		logger(),
		sequelizeMiddleware,
		authMiddleware,
		createShopifyAuth({
			// apiKey: SHOPIFY_API_KEY,
			// secret: SHOPIFY_API_SECRET_KEY,
			// scopes: SCOPES,
			accessMode: 'offline',
			async afterAuth(ctx) {
				const {shop, scope, accessToken} = ctx.state.shopify;
				ACTIVE_SHOPIFY_SHOPS[shop] = scope;

				ctx.redirect(`/shopifyLogin?shop=${shop}`);
				console.log(shop, '=============', accessToken, '=============');
			},
		}),
		graphQLProxy({version: config.get('apiVersion')})
	).if((ctx) => pathToExcludeMiddleware(ctx.path))
);

router.get('/shopifyLogin', async (ctx) => {
	const shop = ctx.query.shop;
	// This shop hasn't been seen yet, go through OAuth to create a session
	if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
		ctx.redirect(`/auth?shop=${shop}`);
	} else {
		const accessKey = await createRandomToken();
		await setupShop(ctx, accessKey);
		// ctx.cookies.set('shopOrigin', shop, cookieOptions);
		console.log(shop, '=============', accessKey, '=============');
	}
});

// FOR ANY REPAIR PURPOSE : ADMIN ONLY
router.post('/acodez', adminRoutes.routes(), router.allowedMethods());

// router.get('/auth/callback', async (ctx) => {
// 	ctx.redirect('/callback');
// 	console.log('==============in get /auth/callback=================');
// });

// Confirm subscriptions and Sync data
router.get('/confirmSubscription', async (ctx) => {
	const {shop, accessKey} = ctx.shop;
	await subscriptionConfirmation(ctx);
	// ctx.redirect(`https://${shop}/admin/apps/${SHOPIFY_API_KEY}/login?shop=${shop}&accessKey=${accessKey}`);
	ctx.redirect(`${FRONT_END_URL}login?shop=${shop}&accessKey=${accessKey}`);
	console.log('==============in get /confirmSubscription=================');
});

app.use(ignore(verifyRequest({accessMode: 'offline'})).if((ctx) => pathToExcludeMiddleware(ctx.path)));

app.use(serve(appPath));
router.get('(.*)', async (ctx) => {
	await checkSubscriptionAndRedirect(ctx).then(async (d) => {
		await koaSend(ctx, 'index.html', {
			root: appPath,
			immutable: true,
			maxAge: 1000,
		});
	});
	console.log('==============in get (.*)=================');
});
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx, next) => {
	try {
		await next();
		const status = ctx.status || 404;
		if (status === 404) {
			ctx.throw(404);
		}
	} catch (err) {
		const status = err.status || 500;
		ctx.status = status;
		if (status === 404) {
			// Your 404
			ctx.body = new AppError('Not Found ', err.status, err);
		} else {
			// other_error jade
			ctx.body = new AppError('Server Error ', err.status, err);
		}
		console.log('==============try catch err ==========\n', err);
	}
});

app.listen(port, () => {
	console.log('\x1b[32m%s\x1b[0m', `Application listening on ${port}`);
	console.log('\x1b[32m%s\x1b[0m', `Environment => ${config.util.getEnv('NODE_ENV')}`);
});

module.exports = app;

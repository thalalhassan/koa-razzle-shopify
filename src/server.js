require("isomorphic-fetch");
import "@babel/polyfill";

import App from "./App";
import React from "react";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Provider as ReduxProvider } from "react-redux";
import { Provider } from "@shopify/app-bridge-react";
import ClientRouter from "./clientRouter";
import store from "./store";

const Router = require("koa-router");
const koa = require("koa");
const helmet = require("koa-helmet");
const logger = require("koa-logger");

const {
  default: createShopifyAuth,
  verifyRequest,
} = require("@shopify/koa-shopify-auth");
const SCOPES = [
  "read_products",
  "read_customers",
  "read_orders",
  "read_draft_orders",
  "read_inventory",
  "read_locations",
  "read_fulfillments",
  "read_shipping",
];
const { default: Shopify, ApiVersion } = require("@shopify/shopify-api");

const dotenv = require("dotenv");
const serve = require("koa-static");

dotenv.config();
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const app = new koa();
const router = new Router();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, HOST } = process.env;
// const cookieOptions = {httpOnly: false, secure: true, sameSite: 'none'};

Shopify.Context.initialize({
  API_KEY: SHOPIFY_API_KEY,
  API_SECRET_KEY: SHOPIFY_API_SECRET_KEY,
  SCOPES,
  HOST_NAME: HOST.replace(/https:\/\//, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// const appImagepath = "../build/images";

// app.use(serve(__dirname + "/../public"));
// app.use(mount("/images", serve(appImagepath)));

app.keys = [Shopify.Context.API_SECRET_KEY];
app.proxy = true;

const ACTIVE_SHOPIFY_SHOPS = {};

app.use(logger());

app.use(
  createShopifyAuth({
    accessMode: "offline",
    async afterAuth(ctx) {
      const { shop, accessToken, scope } = ctx.state.shopify;
      ACTIVE_SHOPIFY_SHOPS[shop] = scope;
      console.log({ shop, scope, accessToken });
      ctx.redirect(`/shopifyLogin?shop=${shop}`);
    },
  })
);

router.get("/shopifyLogin", async (ctx) => {
  const shop = ctx.query.shop;
  console.log({ shop });
  // This shop hasn't been seen yet, go through OAuth to create a session
  if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
    console.log({ in: ACTIVE_SHOPIFY_SHOPS[shop] });
    ctx.redirect(`/auth?shop=${shop}`);
  } else {
    console.log("in_login", { shop, ctx: JSON.stringify(ctx) });
    ctx.redirect(`/login?shop=${shop}`);
  }
});

// router.get("/auth/callback", async (ctx) => {
//   ctx.redirect("/auth/callback");
//   console.log("==============in get /auth/callback=================");
// });

// Confirm subscriptions and Sync data
router.get("/confirmSubscription", async (ctx) => {
  const { shop, accessKey } = ctx;
  ctx.redirect(`/login?shop=${shop}&accessKey=${accessKey}`);
  console.log("==============in get /confirmSubscription ctx=================");
});

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
          .map((asset) => `<link rel="stylesheet" href="${asset}">`)
          .join("")
      : ""
    : "";
};

const jsScriptTagsFromAssets = (assets, entrypoint, extra = "") => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
          .map((asset) => `<script src="${asset}"${extra}></script>`)
          .join("")
      : ""
    : "";
};

export const renderApp = (ctx) => {
  const preloadedState = {
    shopOrigin:
      (ctx.session && ctx.session.shop) ||
      ctx.url.split(/[=/&]/).filter((s) => /myshopify.com/.test(s))[0],
  };
  const context = {};

  const shopOrigin = preloadedState.shopOrigin;

  const config = {
    apiKey: process.env.SHOPIFY_API_KEY,
    shopOrigin,
    forceRedirect: true,
  };

  console.log({
    context,
    shopOrigin,
    Session: JSON.stringify(ctx.session),
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  });

  const markup = renderToString(
    <StaticRouter context={context} location={ctx.url}>
      <Provider config={config}>
        <ReduxProvider store={store}>
          <ClientRouter />
          <App {...preloadedState} />
        </ReduxProvider>
      </Provider>
    </StaticRouter>
  );

  if (context.url) {
    return { redirect: context.url };
  } else {
    //    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    const html =
      // prettier-ignore
      `<!doctype html>
      <html lang="">
        <head>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            <meta charSet='utf-8' />
            <title>Welcome to Razzle</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
             ${cssLinksFromAssets(assets, 'client')}
        </head>
        <body>
            <div id="root">${markup}</div>
            <script>
              // WARNING: See the following for security issues around embedding JSON in HTML:
              // https://redux.js.org/recipes/server-rendering/#security-considerations
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
                /</g,
                '\\u003c'
              )}
            </script>
            ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
            </body>
      </html>`;
    return { html };
  }
};

// Initialize `koa-router` and setup a route listening on `GET /*`
// Logic has been splitted into two chained middleware functions
// @see https://github.com/alexmingoia/koa-router#multiple-middleware
router.get(
  "(.*)",
  (ctx, next) => {
    const { html = "", redirect = false } = renderApp(ctx);
    ctx.state.markup = html;
    return redirect ? ctx.redirect(redirect) : next();
  },
  (ctx) => {
    ctx.status = 200;
    ctx.body = ctx.state.markup;
  }
);

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
    console.error({ err });
    if (status === 404) {
      // Your 404
      ctx.body = "Not Found ";
    } else {
      // other_error jade
      ctx.body = "Server Error ";
    }
    console.log("==============try catch err ==========\n", err);
  }
});

// Intialize and configure Koa application
app
  // `koa-helmet` provides security headers to help prevent common, well known attacks
  // @see https://helmetjs.github.io/
  .use(
    helmet({
      frameguard: false,
    })
  )
  // Serve static files located under `process.env.RAZZLE_PUBLIC_DIR`
  .use(serve(process.env.RAZZLE_PUBLIC_DIR))
  .use(router.routes())
  .use(router.allowedMethods());

export default app;

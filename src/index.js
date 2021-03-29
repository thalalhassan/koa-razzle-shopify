import https from "https";
import fs from "fs";
import path from "path";

// const app = require("./server").default;
const app = require("./serverApp").default;

// Use `app#callback()` method here instead of directly
// passing `app` as an argument to `createServer` (or use `app#listen()` instead)
// @see https://github.com/koajs/koa/blob/master/docs/api/index.md#appcallback
let currentHandler = app.callback();
// const server = http.createServer(currentHandler);
const PORT = process.env.PORT || 3000;

const httpsOptions = {
  key: fs.readFileSync(path.resolve("security/cert.key")),
  cert: fs.readFileSync(path.resolve("security/cert.pem")),
};

const server = https.createServer(httpsOptions, currentHandler);

server.listen(PORT, (error) => {
  if (error) console.log(error);

  console.log("🚀 started @ port:", PORT);
});

if (module.hot) {
  console.log("✅  Server-side HMR Enabled!");

  module.hot.accept("./server", () => {
    console.log("🔁  HMR Reloading `./server`...");

    try {
      const newHandler = require("./server").default.callback();
      server.removeListener("request", currentHandler);
      server.on("request", newHandler);
      currentHandler = newHandler;
    } catch (error) {
      console.error(error);
    }
  });
}

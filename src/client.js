import App from "./App";
import React from "react";
import { hydrate } from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { Provider } from "@shopify/app-bridge-react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import ClientRouter from "./ClientRouter";
import store from "./store";

// import { createStore } from "redux";
// import counterApp from "./reducers";
axios.defaults.baseURL = process.env.RAZZLE_BASE_URL;

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
// const store = createStore(counterApp, preloadedState);

const shopOrigin = preloadedState.shopOrigin;

console.log({
  shopOrigin,
  preloadedState,
  RAZZLE_SHOPIFY_API_KEYL: process.env.RAZZLE_SHOPIFY_API_KEYL,
  RAZZLE_BASE_URL: process.env.RAZZLE_BASE_URL,
});

const config = {
  apiKey: process.env.RAZZLE_SHOPIFY_API_KEYL,
  shopOrigin,
  forceRedirect: true,
};

hydrate(
  <BrowserRouter>
    <Provider config={config}>
      <ReduxProvider store={store}>
        <ClientRouter />
        <App {...preloadedState} />
      </ReduxProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}

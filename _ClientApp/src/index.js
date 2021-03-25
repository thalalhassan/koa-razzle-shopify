/* eslint-disable react/jsx-filename-extension */
/** TEST:wqa
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Provider as ReduxProvider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from '@shopify/app-bridge-react';
import axios from 'axios';
import setAuthToken from 'setAuthToken';
import jwtDecode from 'jwt-decode';
import { getLocalStorageData, getShopOriginFromUrl } from 'helper';
import { setCurrentUser, logoutUser } from 'actions/auth';
// import createApp from '@shopify/app-bridge';
// import { getSessionToken, authenticatedFetch } from '@shopify/app-bridge-utils';
import store from './store';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ClientRouter from './clientRouter';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 1000,
});

const currenthref = window.location.href;
const shopOrigin = getShopOriginFromUrl();
const { jwtToken } = getLocalStorageData();

if (jwtToken) {
  setAuthToken(jwtToken);
  const decoded = jwtDecode(jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const { exp, subscribed } = decoded;
  const currentTime = Date.now() / 1000;
  if (exp < currentTime) {
    store.dispatch(logoutUser());
  } else if (subscribed === false && !currenthref.includes('/subscriptions')) {
    // redirect to subscriptions if user not subscribed
    window.location.href = '/subscriptions/selectaplan';
  }
} else if (!currenthref.includes('/login')) {
  window.location.href = '/login';
}

const config = {
  apiKey: process.env.REACT_APP_SHOPIFY_API_KEY,
  shopOrigin,
  forceRedirect: true,
};

// const shopifyApp = createApp(config);

// const client = new ApolloClient({
//   link: new HttpLink({
//     credentials: "same-origin",
//     fetch: authenticatedFetch(app, yourCustomFetchWrapper), // ensures your custom fetch wrapper is authenticated
//   }),
//   cache: new InMemoryCache(),
// });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider config={config}>
        <ReduxProvider store={store}>
          <ClientRouter />
          <App />
        </ReduxProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// FCM initialization
// serviceWorker.registerServiceWorker();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

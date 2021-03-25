import { createStore, applyMiddleware, compose } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import { getLocalStorageData } from 'helper';
import thunk from 'redux-thunk';
import { getSessionToken, useAppBridge } from '@shopify/app-bridge-utils';
import rootReducer from './reducers';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: 'json',
});

const app = useAppBridge();

const middlewareConfig = {
  interceptors: {
    request: [
      {
        async success(func, req) {
          const { jwtToken } = getLocalStorageData();
          const token = await getSessionToken(app);
          console.log({ token, jwtToken });
          req.headers.Authorization = jwtToken;
          // console.log('interceptors request', req); // contains information about request object
          return req;
        },
        error(error) {
          return error;
        },
      },
    ],
    response: [
      {
        success(func, res) {
          // console.log('AXIOS RESPONSE = ', res); // contains information about request object
          return Promise.resolve(res);
        },
        error(func, error) {
          // console.log('API ERROR', error);
          const errorStatus = error.response.status;
          if (errorStatus === 401) {
            window.location.href = '/login';
          }
          return Promise.reject(error);
        },
      },
    ],
  },
};

const inititalState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  inititalState,
  composeEnhancers(
    applyMiddleware(thunk, axiosMiddleware(client, middlewareConfig)),
  ),
);

export default store;

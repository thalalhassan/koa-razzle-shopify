import { createStore, applyMiddleware, compose } from "redux";
import axiosMiddleware from "redux-axios-middleware";
import axios from "axios";
import { getLocalStorageData } from "./helper";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: "json",
});

const testToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGVkaWNhdGVkU2NoZW1hIjoic2hvcGlmeV9yZXBvcnRzX3RlbmVudF8xIiwic2hvcCI6InRoci10ZXN0LXN0b3JlLm15c2hvcGlmeS5jb20iLCJuYW1lIjoidGhyIHRlc3Qgc3RvcmUiLCJlbWFpbCI6InRoYWxhbDQyNEBnbWFpbC5jb20iLCJzdWJzY3JpYmVkIjp0cnVlLCJzeW5jU3RhdHVzIjoiY29tcGxldGVkIiwicmVhY3RvdXJTdGF0dXMiOiJ7XCJob21lXCI6dHJ1ZX0iLCJpYXQiOjE2MTYxNTc4ODZ9.xJoJmb7c6AV9-EaMVor7oxiymbKl_vwseiXUkwRDScs"

const middlewareConfig = {
  interceptors: {
    request: [
      {
        async success(func, req) {
          // const { jwtToken} = getLocalStorageData();
          req.headers.Authorization = testToken;
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
            window.location.href = "/login";
          }
          return Promise.reject(error);
        },
      },
    ],
  },
};

const inititalState = {};

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;
const store = createStore(
  rootReducer,
  inititalState,
  composeEnhancers(
    applyMiddleware(thunk, axiosMiddleware(client, middlewareConfig))
  )
);

export default store;

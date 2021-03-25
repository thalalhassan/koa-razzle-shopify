import axios from "axios";
import jwtDecode from "jwt-decode";
import { setLocalStorageData, parseJson } from "../helper";
import Cookies from "js-cookie";
import setAuthToken from "../setAuthToken";
import { Actions } from "./types";

export const setCurrentUser = (decoded) => ({
  type: Actions.SET_CURRENT_USER,
  payload: decoded,
});

export const loginUser = (user) => (dispatch) => {

  console.log({user});

  dispatch(setCurrentUser(user));

  // axios
  //   .post("/auth/login", user)
  //   .then((res) => {
  //     const { token, syncStatus, reactourStatus } = res.data._data;
  //     setLocalStorageData({
  //       jwtToken: token,
  //       syncStatus,
  //       reactourStatus: parseJson(reactourStatus),
  //     });
  //     setAuthToken(token);
  //     const decoded = jwtDecode(token);
  //     dispatch(setCurrentUser(decoded));
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: Actions.GET_AUTH_ERRORS,
  //       payload: err.response?.data,
  //     });
  //   });
};

export const logoutUser = () => (dispatch) => {
  const shopOrigin = Cookies.get("shopOrigin");
  try {
    localStorage.removeItem(shopOrigin);
    // Cookies.set(shopOrigin, setData);
  } catch (error) {
    console.log("cant access localstorage");
  }
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location = "/login";
};

export const resetPassword = ({ token, id, password }) => (dispatch) => {
  axios
    .post("/auth/resetPassword", { token, id, password })
    .then(() => {
      window.location = "/login";
    })
    .catch((err) => {
      dispatch({
        type: Actions.GET_AUTH_ERRORS,
        payload: err.response?.data?._data,
      });
    });
};

export const forgetPassword = (email) => (dispatch) => {
  axios
    .get(`/auth/forgetPassword?email=${email}`)
    .then(() => {
      window.location = "/login";
    })
    .catch((err) => {
      dispatch({
        type: Actions.GET_AUTH_ERRORS,
        payload: err.response?.data?._data,
      });
    });
};

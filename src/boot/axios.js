import axios from "axios";
import { notification } from "../global/functions";
import store from "../redux";

const token = localStorage.getItem("token");

axios.defaults.baseURL = "https://hamda.ir/api/";
axios.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axios.interceptors.request.use(
  function (request) {
    if (token !== null) {
      request.headers.Authorization = token;
    }
    store.dispatch({ type: "SET_LOADING", data: true });
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (response) {
    store.dispatch({ type: "SET_LOADING", data: false });
    return response;
  },
  function (error) {
    store.dispatch({ type: "SET_LOADING", data: false });
    if (error.response && error.response.status) {
      notification({ text: `خطای ${error.response.status}` });
    } else {
      notification({ text: "خطای نامشحص" });
    }
    return Promise.reject(error);
  }
);
export default axios;

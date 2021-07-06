import axios from "axios";
import store from ".";
import { cloneDeep } from "lodash";
import { notification } from "../global/functions";

const showCustomer = null;
const reducer = (state = showCustomer, action) => {
  switch (action.type) {
    case "SET_SHOW_CUSTOMER":
      return action.data;
    default:
      return state;
  }
};

export default reducer;

export const getShowCustomer = async (id = 0) => {
  const showCustomer = store.getState().showCustomer;
  const conditions =
    showCustomer === null || String(id) !== String(showCustomer.id);
  if (conditions) {
    const { data } = await axios.get(`customers/${id}`);
    await store.dispatch({ type: "SET_SHOW_CUSTOMER", data: data.data });
    return data.data;
  }
};
// اطلاعات صندوق را ارسال میکند
export const setFundSetting = async (userId = 0, body = { id: 0 }) => {
  const { showCustomer } = cloneDeep(store.getState());
  const setShowCustomer = (data) =>
    store.dispatch({ type: "SET_SHOW_CUSTOMER", data });
  const url = `customers/${userId}/fundsetting/${body.id}`;
  await axios.put(url, body).then(({ data }) => {
    notification({ text: data.msg, type: "success" });
    showCustomer.detail.fund_setting = data.data;
    setShowCustomer(showCustomer);
  });
};

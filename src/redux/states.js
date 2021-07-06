import store from ".";
import axios from "../boot/axios";
const states = [];
const reducer = (state = states, action = {}) => {
  switch (action.type) {
    case "SET_STATES":
      return action.data;
    default:
      return state;
  }
};
export default reducer;

export const getStates = async (callback = () => {}) => {
  const conditions = store.getState().states.length !== 0;
  if (!conditions) {
    await axios.post("location/states").then(({ data }) => {
      store.dispatch({
        type: "SET_STATES",
        data: data.data,
      });
      callback(data.data);
    });
  }else{
    callback(store.getState().states);
  }
};

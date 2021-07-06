const loading = false;
const reducer = (state = loading, action = {}) => {
  switch (action.type) {
    case "SET_LOADING":
      return action.data;
    default:
      return state;
  }
};
export default reducer;

const isLogin = localStorage.getItem("token") !== null;
const reducer = (state = isLogin, action = {}) => {
  switch (action.type) {
    case "SET_IS_LOGIN":
      return action.data;
    default:
      return state;
  }
};
export default reducer;

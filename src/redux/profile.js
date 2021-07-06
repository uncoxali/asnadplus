const profile = JSON.parse(localStorage.getItem("profile")) || null;
const reducer = (state = profile, action = {}) => {
  switch (action.type) {
    case "SET_PROFILE":
      return action.data;
    default:
      return state;
  }
};
export default reducer;

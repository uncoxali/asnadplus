const role = localStorage.getItem('role');
const reducer = (state = role, action = {}) => {
  switch (action.type) {
    case "SET_ROLE":
      return action.data;
    default:
      return state;
  }
};
export default reducer;

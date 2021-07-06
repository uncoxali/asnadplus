const city_class_member = JSON.parse(
  localStorage.getItem("city_class_member")
) || {
  city: null,
  class: null,
  member: null,
};
const reducer = (state = city_class_member, action) => {
  switch (action.type) {
    case "SET_CITY_CLASS_MEMBER":
      localStorage.setItem("city_class_member", JSON.stringify(action.data));
      return action.data;
    default:
      return state;
  }
};

export default reducer;

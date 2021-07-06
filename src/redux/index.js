import { createStore, combineReducers } from "redux";
import loading from "./loading";
import profile from "./profile";
import isLogin from "./isLogin";
import role from "./role";
import states from "./states";
import showCustomer from "./showCustomer";
import city_class_member from "./city_class_member";
const rootReducer = combineReducers({
  loading,
  profile,
  isLogin,
  role,
  states,
  showCustomer,
  city_class_member,
});
const store = createStore(rootReducer);
export default store;

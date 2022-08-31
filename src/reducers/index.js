import { combineReducers } from "redux";
import userLogin from "./login";
import modal from "./modal";
import projectCategory from "./projectCategory";
import projectDetailSlice from "./projectDetail";
const rootReducer = combineReducers({
  log: userLogin,
  category: projectCategory,
  mod: modal,
  proDetail: projectDetailSlice,
});
export default rootReducer;

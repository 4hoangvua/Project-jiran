import { combineReducers } from "redux";
import userLogin from "./signin";
import movie from "./movie";
import adminUser from "./user";
const rootReducer = combineReducers({
  user: userLogin,
  movie: movie,
  adminUser,
});
export default rootReducer;

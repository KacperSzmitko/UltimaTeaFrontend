import { combineReducers } from "redux";
import authReducer from "./authReducer"
import mainReducer from "./mainReducer"

export default combineReducers({
  auth: authReducer,
  main: mainReducer,
});
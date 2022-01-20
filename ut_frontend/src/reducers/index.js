import { combineReducers } from "redux";
import authReducer from "./authReducer"
import mainReducer from "./mainReducer"
import notificationReducer from "./notificationReducer"

export default combineReducers({
  auth: authReducer,
  main: mainReducer,
  notifications: notificationReducer,
});
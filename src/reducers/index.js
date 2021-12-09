import { combineReducers } from "redux";
import testReducer from "./authReducer"

export default combineReducers({
    mainPage : testReducer,
})
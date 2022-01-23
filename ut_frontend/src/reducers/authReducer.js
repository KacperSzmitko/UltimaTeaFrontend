import {
  LOGIN,
  LOGOUT,
  REGISTER,
  REFRESH_TOKEN,
  EXPIRED_TOKEN,
  REGISTER_FAIL,
  LOGIN_FAIL,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  refresh: localStorage.getItem("refresh"),
  isLoged: false,
  tokenExpired: false,
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        refresh: action.payload.refresh,
        isLoged: true,
        tokenExpired: false
      };
    case REGISTER:
      console.log("Token refreshed");
      return { ...state,};
    case LOGOUT:
      return { ...state, token: "", refresh: "", isLoged: false, notification:"Wylogowano" };
    case REFRESH_TOKEN:
      console.log("Token refreshed");
      return {
        ...state,
        token: action.payload.token,
        refresh: action.payload.refresh,
        tokenExpired: false,
      };
    case EXPIRED_TOKEN:
      console.log("Token expired");
      return {
        ...state,
        tokenExpired: true,
      };
    case REGISTER_FAIL:
      return { ...state };
    case LOGIN_FAIL:
      return { ...state, notification: "Niepoprawny login lub hasło" };
    default:
      return state;
  }
};

export default reducer;

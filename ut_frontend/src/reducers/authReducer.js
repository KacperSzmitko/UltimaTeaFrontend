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
        tokenExpired: false,
      };
    case REGISTER:
      console.log("Token refreshed");
      return { ...state };
    case LOGOUT:
      return { ...state, token: "", refresh: "", isLoged: false };
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
      console.log("Registration failed");
      for (var err_name in action.data){
        for(var message of action.data[err_name])
        {
          alert(err_name + ": " + message);
        }
      }
      return { ...state };
    case LOGIN_FAIL:
      alert("Niepoprawny login lub hasło");
      return { ...state };
    default:
      return state;
  }
};

export default reducer;

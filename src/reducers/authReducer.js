import { LOGIN, LOGOUT, REGISTER } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  refresh: localStorage.getItem("refresh")
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        refresh: action.payload.refresh,
        isLoged: true,
      };
    case REGISTER:
      return { ...state };
    case LOGOUT:
      return { ...state, token: "", refresh: ""}
    default:
      return state;
  }
};

export default reducer;

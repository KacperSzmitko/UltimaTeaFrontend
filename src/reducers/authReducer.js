import { LOGIN, REGISTER } from "../actions/types";

const initialState = {
    data: "Dzień",
}

const reducer = function(state = initialState, action){
    switch (action.type) {
      case LOGIN:
        return { ...state, token: action.payload };
      case REGISTER:
        return { ...state };
      default:
        return state;
    } 
}

export default reducer;
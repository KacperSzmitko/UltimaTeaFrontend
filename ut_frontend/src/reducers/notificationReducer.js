import {
    NOTIFY, NOTIFY_CLEAR,
  } from "../actions/types";
  
  const initialState = {
    notifications: [],
  };
  
  const reducer = function (state = initialState, action) {
    switch (action.type) {
      case NOTIFY:
        return {
          ...state,
          notifications: state.notifications.concat(action.data),
        };
      default:
        return state;
      case NOTIFY_CLEAR:
        return {
          ...state,
          notifications: [],
        };
    }
  };
  
  export default reducer;
  
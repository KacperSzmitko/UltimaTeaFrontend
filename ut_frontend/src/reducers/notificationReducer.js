import {
    NOTIFY,
  } from "../actions/types";
  
  const initialState = {
    notifications: [],
  };
  
  const reducer = function (state = initialState, action) {
    switch (action.type) {
      case NOTIFY:
        return {
          ...state,
          notifications: state.notifications.concat(action.data.notification),
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  
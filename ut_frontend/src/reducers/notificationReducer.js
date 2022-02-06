import {
    NOTIFY, NOTIFY_CLEAR,
  } from "../actions/types";
  
  const initialState = {
    notifications: [],
    variant: "success",
  };
  
  const reducer = function (state = initialState, action) {
    switch (action.type) {
      case NOTIFY:
        var newNotifications = state.notifications.concat(action.data);
        var newVariant = state.notifications.variant;

        if (newNotifications.length > 2)
        {
          newNotifications.splice(0, newNotifications.length - 2);
        }

        if(action.variant) {
          newVariant = action.variant;
        }
      
        return {
          ...state,
          notifications: newNotifications,
          variant: newVariant,
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
  
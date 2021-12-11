import { UPDATE_CONTAINERS, FETCH_RECIPES } from "../actions/types";

const initialState = {
  water_container: {},
  tea_container1: {},
  tea_container2: {},
  ingredient_container1: {},
  ingredient_container2: {},
  fetched_recipes: false,
  recipes: []
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CONTAINERS:
      return {
        ...state,
        water_container: action.payload.water_container,
        tea_container1: action.payload.tea_container1,
        tea_container2: action.payload.tea_container2,
        ingredient_container1: action.payload.ingredient_container1,
        ingredient_container2: action.payload.ingredient_container2,
      };
    case FETCH_RECIPES:
      return {
        ...state,
        fetched_recipes: true,
        recipes: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

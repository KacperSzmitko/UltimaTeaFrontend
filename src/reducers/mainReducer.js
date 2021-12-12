import {
  UPDATE_CONTAINERS,
  FETCH_RECIPES,
  FETCH_TEAS,
  FETCH_INGREDIENTS,
  UPDATE_FILTERS,
} from "../actions/types";

const initialState = {
  water_container: {},
  tea_container1: {},
  tea_container2: {},
  ingredient_container1: {},
  ingredient_container2: {},
  fetched_recipes: false,
  fetched_teas: false,
  fetched_ingredients: false,
  recipes: [],
  own_recipes_filters: {},
  public_recipes_filters: {},
  ingredients: [],
  teas: [],
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
    case FETCH_INGREDIENTS:
      return {
        ...state,
        fetched_recipes : true,
        ingredients: action.payload
      }
    case FETCH_TEAS:
      return {
        ...state,
        fetched_teas : true,
        teas: action.payload
      }
    case UPDATE_FILTERS:
      return {
        ...state,
        own_recipes_filters: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

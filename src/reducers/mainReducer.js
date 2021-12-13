import {
  UPDATE_CONTAINERS,
  FETCH_RECIPES,
  FETCH_TEAS,
  FETCH_INGREDIENTS,
  UPDATE_FILTERS,
  UPDATE_TEA_CONTAINERS,
  UPDATE_ING_CONTAINERS,
} from "../actions/types";

const initialState = {
  water_container: {},
  tea_container1: {
    tea: {
      tea_name: null,
      id: null,
    },
  },
  tea_container2: {
    tea: {
      tea_name: null,
      id: null,
    },
  },
  ingredient_container1: {
    ingredient: {
      ingredient_name: null,
      id: null,
    },
  },
  ingredient_container2: {
    ingredient: {
      ingredient_name: null,
      id: null,
    },
  },
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
    case UPDATE_TEA_CONTAINERS:
      if (state.tea_container1.id === action.payload.id)
        return {
          ...state,
          tea_container1: { ...state.tea_container1, tea: action.payload.tea },
        };
      else
        return {
          ...state,
          tea_container2: { ...state.tea_container2, tea: action.payload.tea },
        };
    case UPDATE_ING_CONTAINERS:
      if (state.ingredient_container1.id === action.payload.id)
        return {
          ...state,
          ingredient_container1: {
            ...state.ingredient_container1,
            tea: action.payload.ing,
          },
        };
      else
        return {
          ...state,
          ingredient_container2: {
            ...state.ingredient_container2,
            tea: action.payload.ing,
          },
        };
    default:
      return state;
  }
};

export default reducer;

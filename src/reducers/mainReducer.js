import {
  UPDATE_CONTAINERS,
  FETCH_RECIPES,
  FETCH_TEAS,
  FETCH_INGREDIENTS,
  UPDATE_FILTERS,
  UPDATE_TEA_CONTAINERS,
  UPDATE_ING_CONTAINERS,
  MAKE_TEA,
  EDIT_SELECTED_RECIPE,
  FAVOURITES_EDIT,
  DELETE_RECIPE,
  CREATE_RECIPE,
  EDIT_RECIPE,
  CHANGE_EDIT_TAB_STATUS,
  CHANGE_CREATE_TAB_STATUS,
  CHANGE_PUBLIC_STATUS,
  FETCH_PUBLIC_RECIPES,
  EDIT_RECIPE_SCORE,
  FETCH_MACHINE,
  TEA_DONE,
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
  fetched_machine: false,
  recipes: [],
  own_recipes_filters: {},
  ingredients: [],
  teas: [],
  machine: {},
  tea_making_status: 0,
  selected_recipe: null,
  create_tab_active: false,
  edit_tab_active: false,
  editing_recipe: null,
  fetched_recipe_page: {
    results: [],
    next: null,
    previous: null,
  },
  making_recipe: null
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case TEA_DONE:
      return {
        ...state,
        making_recipe : null,
      };
    case EDIT_RECIPE_SCORE:
      return {
        ...state,
        fetched_recipe_page: {
          ...state.fetched_recipe_page,
          results: state.fetched_recipe_page.results.map((recipe) =>
            recipe.id === action.payload.id
              ? { ...recipe, score: action.payload.score, voted: true }
              : recipe
          ),
        },
      };
    case FETCH_PUBLIC_RECIPES:
      return { ...state, fetched_recipe_page: action.payload };
    case CHANGE_PUBLIC_STATUS:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id
            ? { ...recipe, is_public: action.payload.is_public }
            : recipe
        ),
      };
    case CREATE_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case EDIT_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? action.payload.data : recipe
        ),
      };
    case CHANGE_EDIT_TAB_STATUS:
      return {
        ...state,
        edit_tab_active: action.payload.status,
        editing_recipe: action.payload.id,
      };
    case CHANGE_CREATE_TAB_STATUS:
      return {
        ...state,
        create_tab_active: action.payload.status,
        editing_recipe: null,
      };
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
        fetched_recipes: true,
        ingredients: action.payload,
      };
    case FETCH_TEAS:
      return {
        ...state,
        fetched_teas: true,
        teas: action.payload,
      };
    case FETCH_MACHINE:
      return {
        ...state,
        fetched_machine: true,
        machine: action.payload,
      };
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
            ingredient: action.payload.ing,
          },
        };
      else
        return {
          ...state,
          ingredient_container2: {
            ...state.ingredient_container2,
            ingredient: action.payload.ing,
          },
        };
    case MAKE_TEA:
      return {
        ...state,
        tea_making_status: 1,
        making_recipe: state.recipes.find(
          (recipe) => recipe.id === action.payload.recipe_id
        ),
      };
    case EDIT_SELECTED_RECIPE:
      return {
        ...state,
        selected_recipe: action.payload,
      };
    case FAVOURITES_EDIT:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id
            ? { ...recipe, is_favourite: action.payload.is_favourite }
            : recipe
        ),
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;

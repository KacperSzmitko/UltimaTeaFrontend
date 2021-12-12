import axios from "axios";
import {
  UPDATE_CONTAINERS,
  FETCH_RECIPES,
  FETCH_TEAS,
  FETCH_INGREDIENTS,
  UPDATE_FILTERS
} from "../actions/types";
import { createConfig } from "./authActions";

const updateContainers = () => async (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  let water_container = await axios
    .get("/machine/", config)
    .then((response) => response.data[0].water_container_weight)
    .catch((e) => console.log(e.response.data));

  axios
    .get("/machine/containers/", config)
    .then((response) => {
      let data = {
        water_container: { ammount: water_container },
        tea_container1: response.data.tea_containers[0],
        tea_container2: response.data.tea_containers[1],
        ingredient_container1: response.data.ingredient_containers[0],
        ingredient_container2: response.data.ingredient_containers[1],
      };
      dispach({ type: UPDATE_CONTAINERS, payload: data });
    })
    .catch((e) => console.log(e.response.data));
};

const getUserRecipes = () => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  axios
    .get("/recipes/", config)
    .then((response) => {
      dispach({ type: FETCH_RECIPES, payload: response.data });
    })
    .catch((e) => console.log(e.response.data));
};

const getIngredients = () => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  axios
    .get("/ingredients/", config)
    .then((response) => {
      dispach({ type: FETCH_INGREDIENTS, payload: response.data });
    })
    .catch((e) => console.log(e.response.data));
};

const getTeas = () => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  axios
    .get("/teas/", config)
    .then((response) => {
      dispach({ type: FETCH_TEAS, payload: response.data });
    })
    .catch((e) => console.log(e.response.data));
};

const updateFilters = (data) => (dispach) => {
  dispach({ type: UPDATE_FILTERS, payload: data });
};

const getPublicRecipes =
  (filters, url, recipes_per_page) => (dispach, getState) => {
    let config = createConfig(getState().auth.token);
    let response = "";
    let params = {}
    for (const [filterName, filterValue] of Object.entries(filters)){
      if (filterValue !== -1 & filterValue!== "") params[filterName] = filterValue;
    }
    params.size = recipes_per_page;
    config.params = params;
      if (url !== "") {
        response = axios
          .get(url, config)
          .then((response) => response.data)
          .catch((e) => []);
      } else {
        response = axios
          .get("/public_recipes/", config)
          .then((response) => response.data)
          .catch((e) => []);
      }
    return response;
  };

export {
  updateContainers,
  getUserRecipes,
  getIngredients,
  getTeas,
  updateFilters,
  getPublicRecipes,
};

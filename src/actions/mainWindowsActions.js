import axios from "axios";
import {
  UPDATE_CONTAINERS,
  FETCH_RECIPES,
  FETCH_TEAS,
  FETCH_INGREDIENTS,
  UPDATE_FILTERS,
  UPDATE_TEA_CONTAINERS,
  UPDATE_ING_CONTAINERS,
  EXPIRED_TOKEN,
  MAKE_TEA,
  EDIT_SELECTED_RECIPE,
  FAVOURITES_EDIT,
  DELETE_RECIPE,
  CREATE_RECIPE,
  EDIT_RECIPE,
} from "../actions/types";
import { createConfig, refresh_token } from "./authActions";

const updateContainers = () => async (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  let water_container = await axios
    .get("/machine/", config)
    .then((response) => response.data[0].water_container_weight)
    .catch((e) => {
      dispach({ type: EXPIRED_TOKEN });
      dispach(refresh_token({ refresh: getState().auth.refresh }));
    });
  if (water_container === undefined) return;
  axios
    .get("/machine/containers/", config)
    .then((response) => {
      let data = {
        water_container: { ammount: water_container },
        tea_container1:
          response.data.tea_containers[0].container_number <
          response.data.tea_containers[1].container_number
            ? response.data.tea_containers[0]
            : response.data.tea_containers[1],
        tea_container2:
          response.data.tea_containers[0].container_number >
          response.data.tea_containers[1].container_number
            ? response.data.tea_containers[0]
            : response.data.tea_containers[1],
        ingredient_container1:
          response.data.ingredient_containers[0].container_number <
          response.data.ingredient_containers[1].container_number
            ? response.data.ingredient_containers[0]
            : response.data.ingredient_containers[1],
        ingredient_container2:
          response.data.ingredient_containers[0].container_number >
          response.data.ingredient_containers[1].container_number
            ? response.data.ingredient_containers[0]
            : response.data.ingredient_containers[1],
      };
      dispach({ type: UPDATE_CONTAINERS, payload: data });
    })
    .catch((e) => {
      if (e.response.status === 401 && !getState().auth.tokenExpired) {
        dispach({ type: EXPIRED_TOKEN });
        dispach(refresh_token({ refresh: getState().auth.refresh }));
      }
      console.log(e.response.data);
    });
};

const getUserRecipes = () => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  axios
    .get("/recipes/", config)
    .then((response) => {
      dispach({ type: FETCH_RECIPES, payload: response.data });
    })
    .catch((e) => {
      if (e.response.status === 401 && !getState().auth.tokenExpired) {
        dispach({ type: EXPIRED_TOKEN });
        dispach(refresh_token({ refresh: getState().auth.refresh }));
      }
      console.log(e.response.data);
    });
};

const getIngredients = () => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  axios
    .get("/ingredients/", config)
    .then((response) => {
      dispach({ type: FETCH_INGREDIENTS, payload: response.data });
    })
    .catch((e) => {
      if (e.response.status === 401 && !getState().auth.tokenExpired) {
        dispach({ type: EXPIRED_TOKEN });
        dispach(refresh_token({ refresh: getState().auth.refresh }));
      }
      console.log(e.response.data);
    });
};

const getTeas = () => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  axios
    .get("/teas/", config)
    .then((response) => {
      dispach({ type: FETCH_TEAS, payload: response.data });
    })
    .catch((e) => {
      if (e.response.status === 401 && !getState().auth.tokenExpired) {
        dispach({ type: EXPIRED_TOKEN });
        dispach(refresh_token({ refresh: getState().auth.refresh }));
      }
      console.log(e.response.data);
    });
};

const updateFilters = (data) => (dispach) => {
  dispach({ type: UPDATE_FILTERS, payload: data });
};

const getPublicRecipes =
  (filters, url, recipes_per_page) => (dispach, getState) => {
    let config = createConfig(getState().auth.token);
    let response = "";
    let params = {};
    for (const [filterName, filterValue] of Object.entries(filters)) {
      if ((filterValue !== -1) & (filterValue !== ""))
        params[filterName] = filterValue;
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

const changeContainers =
  (tea_containers, ing_containers) => (dispach, getState) => {
    let config = createConfig(getState().auth.token);
    let requests = [];
    for (const tea_container of tea_containers) {
      requests.push(
        axios
          .put(
            `/machine/containers/tea/${tea_container.id}/`,
            { id: tea_container.tea },
            config
          )
          .then((r) =>
            dispach({
              type: UPDATE_TEA_CONTAINERS,
              payload: { id: tea_container.id, tea: r.data },
            })
          )
          .catch((e) => {
            if (e.response.status === 401 && !getState().auth.tokenExpired) {
              dispach({ type: EXPIRED_TOKEN });
              dispach(refresh_token({ refresh: getState().auth.refresh }));
            }
            console.log(e.response.data);
          })
      );
    }

    for (const ing_container of ing_containers) {
      requests.push(
        axios
          .put(
            `/machine/containers/ingredient/${ing_container.id}/`,
            { id: ing_container.ing },
            config
          )
          .then((r) =>
            dispach({
              type: UPDATE_ING_CONTAINERS,
              payload: { id: ing_container.id, ing: r.data },
            })
          )
          .catch((e) => {
            if (e.response.status === 401 && !getState().auth.tokenExpired) {
              dispach({ type: EXPIRED_TOKEN });
              dispach(refresh_token({ refresh: getState().auth.refresh }));
            }
            console.log(e.response.data);
          })
      );
    }
    axios.all(requests);
  };

const makeTea = (recipe_id) => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  axios
    .post("/send_recipe/", { id: recipe_id }, config)
    .then(() => dispach({ type: MAKE_TEA }))
    .catch((e) => console.log(e.response.data));
};

const editSelectedRecipe = (recipe_id) => (dispach) => {
  dispach({ type: EDIT_SELECTED_RECIPE, payload: recipe_id });
};

const favouritesEdit = (recipe_id, is_favourite) => (dispach, getState) => {
  // Change given recipe is_favourite status to given one
  let config = createConfig(getState().auth.token);
  axios
    .put(
      `/favourites_edit/${recipe_id}/`,
      { is_favourite: is_favourite },
      config
    )
    .then((r) =>
      dispach({
        type: FAVOURITES_EDIT,
        payload: { is_favourite: r.data.is_favourite, id: recipe_id },
      })
    )
    .catch((e) => console.log(e.response.data));
};

const deleteOwnRecipe = (recipe_id) => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  axios
    .delete(`/recipes/${recipe_id}`, config)
    .then((r) => dispach({ type: DELETE_RECIPE, payload: recipe_id }))
    .catch((e) => console.log(e.response.data));
};

export {
  updateContainers,
  getUserRecipes,
  getIngredients,
  getTeas,
  updateFilters,
  getPublicRecipes,
  changeContainers,
  makeTea,
  editSelectedRecipe,
  favouritesEdit,
  deleteOwnRecipe,
};

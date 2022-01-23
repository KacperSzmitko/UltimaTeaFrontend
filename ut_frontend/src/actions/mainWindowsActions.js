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
  CHANGE_PUBLIC_STATUS,
  FETCH_PUBLIC_RECIPES,
  EDIT_RECIPE_SCORE,
  FETCH_MACHINE,
  NOTIFY,
} from "../actions/types";
import { createConfig, refresh_token } from "./authActions";

/**
 * Get actual containers statused from server, and update redux state
 */
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

/**
 * Get all user recipes and store them in state
 */
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

/**
 * Get list of all avaliable ingredients, and store them in redux state
 */
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

/**
 * Get list of all avaliable teas, and store them in redux state
 */
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

//dev nie ma maszyny
const getMachine = () => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
    axios
      .get("/machine/", config)
      .then((response) => {
        dispach({ type: FETCH_MACHINE, payload: response.data[0] });
      })
      .catch((e) => {
        if (e.response.status === 401 && !getState().auth.tokenExpired) {
          dispach({ type: EXPIRED_TOKEN });
          dispach(refresh_token({ refresh: getState().auth.refresh }));
        }
        console.log(e.response.data);
        dispach({ type: NOTIFY, data: "Maszyna nie istnieje" });
      });
}


/**
 *
 * @param {*} data Current full state of filters
 */
const updateFilters = (data) => (dispach) => {
  dispach({ type: UPDATE_FILTERS, payload: data });
};

/**
 * Fetch recipes. Also filters from redux state are applied
 * @param {*} url If you want to fetch for example next recipes from link pass it here, otherwise pass ""
 * @param {*} recipes_per_page Number of recipes to fetch
 * @returns
 */
const getPublicRecipes = (url, recipes_per_page) => (dispach, getState) => {
  const filters = getState().main.own_recipes_filters;
  let config = createConfig(getState().auth.token);
  let response = "";
  let params = {};
  // Create dict of params to construct url with filters
  for (const [filterName, filterValue] of Object.entries(filters)) {
    if (filterValue !== -1 && filterValue !== "")
      params[filterName] = filterValue;
  }
  // Specify how many recipes should be fetched
  params.size = recipes_per_page;
  config.params = params;
  if (url !== "") {
    response = axios
      .get(url, config)
      .then((response) => {
        dispach({ type: FETCH_PUBLIC_RECIPES, payload: response.data });
        return response.data;
      })
      .catch((e) => []);
  } else {
    response = axios
      .get("/public_recipes/", config)
      .then((response) => {
        dispach({ type: FETCH_PUBLIC_RECIPES, payload: response.data });
        return response.data;
      })
      .catch((e) => []);
  }
  return response;
};

//dev składnik zmieniony, lub nie
/**
 * Modify tea or ingredient in container
 * @param {[{}]} tea_containers List of tea containers to modify. Single elemtnt is {id: data}
 * @param {[{}]} ing_containers List of ingredients containers to modify. Single elemtnt is {id: data}
 */
const changeContainers =
  (tea_containers, ing_containers) => (dispach, getState) => {
    let config = createConfig(getState().auth.token);
    let requests = [];
    var error = false;
    // Update all tea containers
    for (const tea_container of tea_containers) {
      requests.push(
        axios
          .put(
            `/machine/containers/tea/${tea_container.id}/`,
            { id: tea_container.tea },
            config
          )
          .then((r) =>
            {
              dispach({
                type: UPDATE_TEA_CONTAINERS,
                payload: { id: tea_container.id, tea: r.data },
              });
            }
          )
          .catch((e) => {
            if (e.response.status === 401 && !getState().auth.tokenExpired) {
              dispach({ type: EXPIRED_TOKEN });
              dispach(refresh_token({ refresh: getState().auth.refresh }));
            }
            console.log(e.response.data);
            dispach({ type: NOTIFY, data: "Nie udało się zaktualizować zawartości pojemników" });
            error = true;
          })
      );
    }

    // Update all ingredients containers
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
    
    if (!error)
      dispach({ type: NOTIFY, data: "Zawartość pojemników została zaktualizowana" });

    axios.all(requests);
  };

//dev zlecono albo nie robienie herbaty
/**
 *
 * @param {*} recipe_id Id of recipe that user want to make
 */
const makeTea = (recipe_id) => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  if (getState().main.making_recipe !== null){
    console.log("Tea is alredy in progress");
    return;
  }
    axios
      .post("/send_recipe/", { id: recipe_id }, config)
      .then(() => {
        dispach({ type: MAKE_TEA, payload: recipe_id });
        dispach({ type: NOTIFY, data: "Robienie herbaty zostało zlecone" });
      })
      .catch((e) => {
        console.log(e.response.data);
        dispach({ type: NOTIFY, data: "Nie udało się zlecić robienia herbaty" });
      });
};

/**
 * Edit currently selected recipe to given one
 * @param {*} recipe_id Id of recipe that should be selected
 */
const editSelectedRecipe = (recipe_id) => (dispach) => {
  dispach({ type: EDIT_SELECTED_RECIPE, payload: recipe_id });
};

//dev ulubione
/**
 * Change is_favourite filed of recipe
 * @param {int} recipe_id Id of recipe do edit
 * @param {boolean} is_favourite New status
 * @returns
 */
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
      {
        dispach({
          type: FAVOURITES_EDIT,
          payload: { is_favourite: r.data.is_favourite, id: recipe_id },
        });
        if(is_favourite)
          dispach({ type: NOTIFY, data: "Dodano przepis do ulubionych" });
        else
          dispach({ type: NOTIFY, data: "Usunięto przepis z ulubionych" });
      }
    )
    .catch((e) => {
      console.log(e.response.data);
      if(is_favourite)
          dispach({ type: NOTIFY, data: "Wystąpił błąd podczas dodawania przepisu do ulubionych" });
        else
          dispach({ type: NOTIFY, data: "Wystąpił błąd podczas usuwania przepisu z ulubionych" });
    });
};

//dev usuwanie
/**
 * Delete own recipe
 * @param {*} recipe_id
 * @returns
 */
const deleteOwnRecipe = (recipe_id) => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  axios
    .delete(`/recipes/${recipe_id}`, config)
    .then((r) => {
      dispach({ type: DELETE_RECIPE, payload: recipe_id });
      dispach({ type: NOTIFY, data: "Przepis został usunięty" });
    })
    .catch((e) => {
      console.log(e.response.data);
      dispach({ type: NOTIFY, data: "Nie udało się usunąć przepisu" });
    });
};

function formatResponse(data, getState) {
  return {
    ...data,
    ingredients: data.ingredients.map((ing) => ({
      ammount: ing.ammount,
      id: ing.id,
      ingredient: getState().main.ingredients.find(
        (ingredient) => ingredient.id === ing.ingredient_id
      ),
    })),
    tea_type: getState().main.teas.find((tea) => tea.id === data.tea_type),
  };
}

//dev create recipe
const createRecipe = (data) => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  axios
    .post("/recipes/", data, config)
    .then((r) => {
      console.log(formatResponse(r.data, getState));
      dispach({
        type: CREATE_RECIPE,
        payload: formatResponse(r.data, getState),
      });
      dispach({ type: NOTIFY, data: "Przepis został stworzony" });
    })
    .catch((e) => {
      console.log(e.response.data);
      dispach({ type: NOTIFY, data: "Nie udało się stworzyć przepisu" });
    });
};

//dev recipe edit
/**
 *
 * @param {*} data
 * @param {*} recipe_id
 * @param {*} patch PUT or PATCH
 * @returns
 */
const editRecipe = (data, recipe_id, method) => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  axios({
    method: method,
    url: `/recipes/${recipe_id}/`,
    data: data,
    headers: config.headers,
  })
    .then((r) => {
      dispach({
        type: EDIT_RECIPE,
        payload: { id: recipe_id, data: formatResponse(r.data, getState) },
      });
      dispach({ type: NOTIFY, data: "Nowa wersja przepisu została zapisana" });
    })
    .catch((e) => {
      console.log(e.response.data);
      dispach({ type: NOTIFY, data: "Nie udało się zedytować przepisu" });
    });
};

//dev jak się nie uda
/**
 *
 * @param {*} recipe_id
 * @param {*} status is_public new status
 */
const changePublicStatus = (recipe_id, status) => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  axios
    .patch(`/recipes/${recipe_id}/`, { is_public: status }, config)
    .then((r) => 
      {
        dispach({
        type: CHANGE_PUBLIC_STATUS,
        payload: { is_public: r.data.is_public, id: recipe_id },
      });
    })
    .catch((e) => {
      console.log(e.response.data);
      dispach({ type: NOTIFY, data: "Nie udało się zmienić statusu przepisu" });
    });
};

//dev głosowanie
/**
 *
 * @param {*} recipe_id
 * @param {*} score
 * @param {*} edit If true then PUT is sended, otherwise POST
 * @returns Updated score
 */
const recipeVote = (recipe_id, score, edit) => (dispach, getState) => {
  let config = createConfig(getState().auth.token);
  if (edit) {
    const data = axios
      .put(`/recipes/${recipe_id}/vote/`, { score: score }, config)
      .then( (r) => 
      {
          dispach({ 
            type: EDIT_RECIPE_SCORE,
            payload: { id: recipe_id, score: r.data.score },
          });
          dispach({ type: NOTIFY, data: "Oceniono przepis" });
      }
      )
      .catch((e) => {
        console.log(e.response.data);
        dispach({ type: NOTIFY, data: "Nie udało się ocenić przepisu" });
      });
      return data;
  } else {
    const data = axios
      .post(`/recipes/${recipe_id}/vote/`, { score: score }, config)
      .then((r) =>
        {
          dispach({
            type: EDIT_RECIPE_SCORE,
            payload: { id: recipe_id, score: r.data.score },
          });
          dispach({ type: NOTIFY, data: "Oceniono przepis" });
        }
      )
      .catch((e) => {
        console.log(e.response.data)
        dispach({ type: NOTIFY, data: "Nie udało się ocenić przepisu" });
      });
      return data;
  }

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
  createRecipe,
  editRecipe,
  changePublicStatus,
  recipeVote,
  getMachine,
};

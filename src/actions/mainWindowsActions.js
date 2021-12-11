import axios from "axios";
import { UPDATE_CONTAINERS, FETCH_RECIPES } from "../actions/types";
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
  console.log("Done");
  let config = createConfig(getState().auth.token);
  axios
    .get("/recipes/", config)
    .then((response) => {
      dispach({ type: FETCH_RECIPES, payload: response.data });
    })
    .catch((e) => console.log(e.response.data));
};

export { updateContainers, getUserRecipes };

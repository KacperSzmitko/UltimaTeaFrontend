import React from "react";
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";
import Logout from "./Logout";
import { Outlet } from "react-router-dom";
import Containers from "./Containers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserRecipes, getIngredients, getTeas } from "../actions/mainWindowsActions";

export default function MainAppStatic() {
  const dispach = useDispatch();
  const fetched_recipes = useSelector((state) => state.main.fetched_recipes);
  const fetched_ingredients = useSelector(
    (state) => state.main.fetched_ingredients
  );
  const fetched_teas = useSelector((state) => state.main.fetched_teas);

  useEffect(() => {
    if (!fetched_recipes) dispach(getUserRecipes());
    if (!fetched_ingredients) dispach(getIngredients());
    if (!fetched_teas) dispach(getTeas());
  }, [fetched_recipes,fetched_ingredients,fetched_teas, dispach]);

  return (
    <div>
      <PrivateRoute>
        <Containers />
        <Outlet />
        <NavBar />
        <Logout />
      </PrivateRoute>
    </div>
  );
}

import React from "react";
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";
import Logout from "./Logout";
import { Outlet } from "react-router-dom";
import Containers from "./Containers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserRecipes } from "../actions/mainWindowsActions";

export default function MainAppStatic() {
  const dispach = useDispatch();
  const fetched = useSelector((state) => state.main.fetched_recipes);

  useEffect(() => {
    if (!fetched) dispach(getUserRecipes());
  }, [fetched, dispach]);

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

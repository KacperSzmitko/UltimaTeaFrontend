import React from "react";
import OwnRecipesList from "./OwnRecipesList";
import Filters from "./Filters";

//var classNames = require("classnames");

function EditRecipes() {
  return (
    <div>
      <Filters />
      <OwnRecipesList recipes_per_page={6} />
    </div>
  );
}

export default EditRecipes;

import React from "react";
import RecipesList from "./RecipesList";
import Filters from "./Filters";

//var classNames = require("classnames");

function EditRecipes() {
  return (
    <div className="view_with_filters">
      <Filters />
      <RecipesList recipes_per_page={6} first_blank={true} edit={true} />
    </div>
  );
}

export default EditRecipes;

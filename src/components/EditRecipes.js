import React from "react";
import RecipesList from "./RecipesList";
import Filters from "./Filters";
import { useSelector } from "react-redux";
import CreateOrEditRecipe from "./CreateOrEditRecipe";
var classNames = require("classnames");

function EditRecipes() {
  const createRecipeTabActive = useSelector(
    (state) => state.main.create_tab_active
  );
  const editRecipeTabActive = useSelector(
    (state) => state.main.edit_tab_active
  );

  const viewClasses = classNames(
    { blured: createRecipeTabActive || editRecipeTabActive },
    "view_with_filters"
  );
  return (
    <div style={{marginLeft:"15px", position:"relative"}}>
      <div className={viewClasses}>
        <Filters />
        <RecipesList recipes_per_page={6} first_blank={true} edit={true} />
      </div>
        {createRecipeTabActive || editRecipeTabActive ? <CreateOrEditRecipe />: null}
    </div>
  );
}

export default EditRecipes;

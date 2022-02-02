import React from "react";
import EditRecipesList from "./EditRecipesList";
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
  const makeTeaTabActive = useSelector(
    (state) => state.main.make_tea_tab_active
  );

  const viewClasses = classNames(
    {
      blured: createRecipeTabActive || editRecipeTabActive || makeTeaTabActive,
    },
    "no_margin",
    "view_with_filters"
  );
  return (
    <div style={{ position: "relative", width: "100%", marginLeft: "15px" }}>
      <div className={viewClasses}>
        <Filters />
        <EditRecipesList recipes_per_page={6} first_blank={true} edit={true} />
      </div>
      {createRecipeTabActive || editRecipeTabActive ? (
        <CreateOrEditRecipe />
      ) : makeTeaTabActive ? (
        <CreateOrEditRecipe make_tea={true} />
      ) : null}
    </div>
  );
}

export default EditRecipes;

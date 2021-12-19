import React from 'react'
import Filters from "./Filters";
import PublicRecipesList from "./PublicRecipesList";

//var classNames = require("classnames");


function BrowseRecipes() {
    return (
      <div className="view_with_filters">
        <Filters />
        <PublicRecipesList recipes_per_page={6} />
      </div>
    );
}

export default BrowseRecipes

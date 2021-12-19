import React from 'react'
import Filters from "./Filters";
import BrowseRecipesList from "./BrowseRecipesList";

//var classNames = require("classnames");


function BrowseRecipes() {
    return (
      <div className="view_with_filters">
        <Filters />
        <BrowseRecipesList recipes_per_page={6} />
      </div>
    );
}

export default BrowseRecipes

import React from 'react'
import Filters from "./Filters";
import PublicRecipesList from "./PublicRecipesList";
function BrowseRecipes() {
    return (
      <div>
        <Filters />
        <PublicRecipesList recipes_per_page={6} />
      </div>
    );
}

export default BrowseRecipes

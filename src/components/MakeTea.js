import React from 'react'
import Recipe from './Recipe'
import { useSelector } from "react-redux";

function MakeTea() {
    const recipes = useSelector((state) =>
      state.main.recipes.filter(recipe => recipe.is_favourite)
    );
    return (
      <div>
        {recipes.map((recipe, index) => (
          <Recipe id={recipe.id} recipe={recipe} key={recipe.id} />
        ))}
      </div>
    );
}

export default MakeTea

import React from 'react'
import Recipe from './Recipe'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MakeTea() {
    const recipes = useSelector((state) =>
      state.main.recipes.filter(recipe => recipe.is_favourite)
    );
    console.log(recipes);
    return (
      <div>
        {recipes.map((recipe, index) => (
          <Recipe id={index} recipe={recipe} key={index} />
        ))}
      </div>
    );
}

export default MakeTea

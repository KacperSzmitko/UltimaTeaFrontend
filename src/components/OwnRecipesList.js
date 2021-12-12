import React from "react";
import Recipe from "./Recipe";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useState } from "react";

function applyFilters(recipes, filters) {
  for (const [filterName, filterValue] of Object.entries(filters)) {
    if (filterValue !== "" && filterValue !== -1) {
      if (filterName === "recipeName") {
        recipes = recipes.filter(
          (recipe) => recipe.recipe_name === parseInt(filterValue)
        );
      } else if (filterName === "teaType") {
        const value = parseInt(filterValue);
        recipes = recipes.filter((recipe) => recipe.tea_type.id === value);
      } else if (filterName.includes("ingredient")) {
        const value = parseInt(filterValue);
        recipes = recipes.filter(
          (recipe) =>
            recipe.ingredients.filter((ing) => ing.ingredient.id === value)
              .length > 0
        );
      } else if (filterName === "brewingTemperatureDown") {
        const value = parseInt(filterValue);
        recipes = recipes.filter(
          (recipe) => recipe.brewing_temperature >= value
        );
      } else if (filterName === "brewingTemperatureUp") {
        const value = parseInt(filterValue);
        recipes = recipes.filter(
          (recipe) => recipe.brewing_temperature <= value
        );
      } else if (filterName === "brewingTimeDown") {
        const value = parseInt(filterValue);
        recipes = recipes.filter((recipe) => recipe.brewing_time >= value);
      } else if (filterName === "brewingTimeUp") {
        const value = parseInt(filterValue);
        recipes = recipes.filter((recipe) => recipe.brewing_time <= value);
      } else if (filterName === "mixingTimeDown") {
        const value = parseInt(filterValue);
        recipes = recipes.filter((recipe) => recipe.mixing_time >= value);
      } else if (filterName === "mixingTimeUp") {
        const value = parseInt(filterValue);
        recipes = recipes.filter((recipe) => recipe.mixing_time <= value);
      }
    }
  }
  return recipes;
}

function OwnRecipesList({ recipes_per_page }) {
  const [currentPage, setCurrentPage] = useState(0);
  const filters = useSelector(
    (state) => state.main.own_recipes_filters
  );

  const recipes = useSelector(
    (state) =>
      applyFilters(state.main.recipes, filters).slice(
        currentPage * recipes_per_page,
        (currentPage + 1) * recipes_per_page
      ),
    shallowEqual
  );

  return (
    <div>
      {recipes.map((recipe) => (
        <Recipe id={recipe.id} key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default OwnRecipesList;

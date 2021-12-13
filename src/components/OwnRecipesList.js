import React from "react";
import Recipe from "./Recipe";
import { useSelector, shallowEqual } from "react-redux";
import { useState } from "react";
import { Button } from "react-bootstrap";

var classNames = require("classnames");

export function applyFilters(recipes, filters) {
  for (const [filterName, filterValue] of Object.entries(filters)) {
    if (filterValue !== "" && filterValue !== -1) {
      if (filterName === "name") {
        recipes = recipes.filter(
          (recipe) =>
            recipe.recipe_name.match(`.*(?=${filterValue}).*`) !== null
        );
      } else if (filterName === "tea_type") {
        const value = parseInt(filterValue);
        recipes = recipes.filter((recipe) => recipe.tea_type.id === value);
      } else if (filterName.includes("ingredient")) {
        const value = parseInt(filterValue);
        recipes = recipes.filter(
          (recipe) =>
            recipe.ingredients.filter((ing) => ing.ingredient.id === value)
              .length > 0
        );
      } else if (filterName === "brewing_temperature_down") {
        const value = parseInt(filterValue);
        recipes = recipes.filter(
          (recipe) => recipe.brewing_temperature >= value
        );
      } else if (filterName === "brewing_temperature_up") {
        const value = parseInt(filterValue);
        recipes = recipes.filter(
          (recipe) => recipe.brewing_temperature <= value
        );
      } else if (filterName === "brewing_time_down") {
        const value = parseInt(filterValue);
        recipes = recipes.filter((recipe) => recipe.brewing_time >= value);
      } else if (filterName === "brewing_time_up") {
        const value = parseInt(filterValue);
        recipes = recipes.filter((recipe) => recipe.brewing_time <= value);
      } else if (filterName === "mixing_time_down") {
        const value = parseInt(filterValue);
        recipes = recipes.filter((recipe) => recipe.mixing_time >= value);
      } else if (filterName === "mixing_time_up") {
        const value = parseInt(filterValue);
        recipes = recipes.filter((recipe) => recipe.mixing_time <= value);
      }
    }
  }
  return recipes;
}

function OwnRecipesList({ recipes_per_page, is_favourite = false, first_blank = true }) {
  const [currentPage, setCurrentPage] = useState(0);
  const filters = useSelector((state) => state.main.own_recipes_filters);
  const recipes = useSelector(
    (state) =>
      is_favourite
        ? state.main.recipes
            .slice(
              currentPage * recipes_per_page,
              (currentPage + 1) * recipes_per_page
            )
        : applyFilters(state.main.recipes, filters).slice(
            currentPage === 0 ? 0 : currentPage * recipes_per_page,
            currentPage === 0 ? 5 : (currentPage + 1) * recipes_per_page
          ),
    shallowEqual
  );
  const recipes_count = useSelector((state) => state.main.recipes.length
  );

  function nextRecipes() {
    if (recipes_count > (currentPage + 1) * recipes_per_page + 1 - 1)
      setCurrentPage(currentPage + 1);
  }

  function prevRecipes() {
    if (currentPage - 1 >= 0) setCurrentPage(currentPage - 1);
  }

  function makeTea(){
    return 0;
  }

  const arrowClasses = classNames({"make_tea_arrow": !first_blank})
  const recipesClasses = classNames({ "make_tea_recipes": !first_blank});
  const leftBtnClasses = classNames({ "make_tea_left_arrow_btn" : !first_blank });
  const rightBtnClasses = classNames({ "make_tea_right_arrow_btn" : !first_blank });
  const recipeClasses = classNames("recipe")


  return (
    <div id="recipes_list_container">
      <div id="left_arrow" className={arrowClasses}>
        <Button className={leftBtnClasses} onClick={() => prevRecipes()}>
          {" "}
          Prev
        </Button>
      </div>
      <div id="recipes" className={recipesClasses}>
        {currentPage === 0 && first_blank ? (
          <div id="BlankRecipe"> Blank</div>
        ) : null}
        {recipes.map((recipe) => (
          <Recipe
            classes={recipeClasses}
            id={recipe.id}
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>
      <div id="right_arrow" className={arrowClasses}>
        <Button className={rightBtnClasses} onClick={() => nextRecipes()}>
          {" "}
          Next{" "}
        </Button>
      </div>
    </div>
  );
}

export default OwnRecipesList;

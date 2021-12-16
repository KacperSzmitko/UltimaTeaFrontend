import React from "react";
import Recipe from "./Recipe";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import { editSelectedRecipe } from "../actions/mainWindowsActions";
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

function OwnRecipesList({
  recipes_per_page,
  is_favourite = false,
  first_blank = true,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const filters = useSelector((state) => state.main.own_recipes_filters);
  const recipes = useSelector(
    (state) =>
      is_favourite
        ? state.main.recipes.slice(
            currentPage * recipes_per_page,
            (currentPage + 1) * recipes_per_page
          )
        : applyFilters(state.main.recipes, filters).slice(
            currentPage === 0 ? 0 : currentPage * recipes_per_page,
            currentPage === 0 ? 5 : (currentPage + 1) * recipes_per_page
          ),
    shallowEqual
  );
  const recipes_count = useSelector((state) => state.main.recipes.length);
  const dispach = useDispatch();

  function nextRecipes() {
    dispach(editSelectedRecipe(null));
    if (recipes_count > (currentPage + 1) * recipes_per_page + 1 - 1)
      setCurrentPage(currentPage + 1);
  }

  function prevRecipes() {
    dispach(editSelectedRecipe(null));
    if (currentPage - 1 >= 0) setCurrentPage(currentPage - 1);
  }

  const arrowClasses = classNames({ make_tea_arrow_conatiner: !first_blank });
  const recipesClasses = classNames({ make_tea_recipes: !first_blank });
  const leftBtnClasses = classNames({
    make_tea_left_arrow_btn: !first_blank,
    make_tea_arrow: !first_blank,
  });
  const rightBtnClasses = classNames({
    make_tea_right_arrow_btn: !first_blank,
    make_tea_arrow: !first_blank,
  });

  return (
    <div id="recipes_list_container">
      <div id="left_arrow" className={arrowClasses}>
        <IconContext.Provider
          value={{
            className: leftBtnClasses,
          }}
        >
          <div>
            <IoIosArrowBack size="60" onClick={() => prevRecipes()} />
          </div>
        </IconContext.Provider>
      </div>
      <div id="recipes" className={recipesClasses}>
        {currentPage === 0 && first_blank ? (
          <div id="BlankRecipe"> Blank</div>
        ) : null}
        {recipes.map((recipe, index) => (
          <Recipe
            id={recipe.id}
            key={recipe.id}
            recipe={recipe}
            index={index}
          />
        ))}
      </div>
      <div id="right_arrow" className={arrowClasses}>
        <IconContext.Provider
          value={{
            className: rightBtnClasses,
          }}
        >
          <div>
            <IoIosArrowForward size="60" onClick={() => nextRecipes()} />
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default OwnRecipesList;

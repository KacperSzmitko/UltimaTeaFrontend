import React from "react";
import Recipe from "./Recipe";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getPublicRecipes } from "../actions/mainWindowsActions";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";

var classNames = require("classnames");

/**
 * 
 * @param {int} recipes_per_page Definie how many recipes should be listed on single page
 */
function BrowseRecipesList({ recipes_per_page }) {
  const [currentPage, setCurrentPage] = useState(0);
  // List of current recipes
  const recipes = useSelector((state) => state.main.fetched_recipe_page.results);
  const next = useSelector((state) => state.main.fetched_recipe_page.next);
  const prev = useSelector((state) => state.main.fetched_recipe_page.previous);
  const filters = useSelector((state) => state.main.own_recipes_filters);
  const dispach = useDispatch();

  useEffect(() => {
    dispach(getPublicRecipes("", recipes_per_page));
  }, [recipes_per_page, dispach, filters]);


  async function nextRecipes() {
    if (next !== null) {
      await dispach(getPublicRecipes(next, recipes_per_page));
      setCurrentPage(currentPage + 1);
    }
  }

  async function prevRecipes() {
    if (prev !== null) {
      await dispach(getPublicRecipes(prev, recipes_per_page));
      setCurrentPage(currentPage - 1);
    }
  }

  const arrowClasses = classNames("edit_arrow_conatiner");
  const recipesClasses = classNames("edit_recipes_list");
  const leftBtnClasses = classNames("edit_left_arrow_btn", "edit_arrow");
  const rightBtnClasses = classNames("edit_right_arrow_btn", "edit_arrow");

  return (
    <div className="recipes_list_container">
      <div id="left_arrow" className={arrowClasses}>
        <IconContext.Provider
          value={{
            className: leftBtnClasses,
          }}
        >
          <div className="edit_arrow_container">
            <IoIosArrowBack size="50" onClick={() => prevRecipes()} />
          </div>
        </IconContext.Provider>
      </div>
      <div id="recipes" className={recipesClasses}>
        {recipes.map((recipe, index) => (
          <Recipe
            id={recipe.id}
            key={recipe.id}
            index={index}
            edit={true}
            icon_set={2}
            browse={true}
          />
        ))}
      </div>
      <div id="right_arrow" className={arrowClasses}>
        <IconContext.Provider
          value={{
            className: rightBtnClasses,
          }}
        >
          <div className="edit_arrow_container">
            <IoIosArrowForward size="50" onClick={() => nextRecipes()} />
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default BrowseRecipesList;

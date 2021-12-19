import React from "react";
import Recipe from "./Recipe";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import { editSelectedRecipe } from "../actions/mainWindowsActions";
import { applyFilters } from "./MakeTeaRecipeList";
import addRecipeImg from "../static/add_recipe.png";
import EditIconSet from "./EditIconSet";
import {
  CHANGE_CREATE_TAB_STATUS
} from "../actions/types";
var classNames = require("classnames");

function EditRecipesList({ recipes_per_page, first_blank = true, edit = false }) {
  const [currentPage, setCurrentPage] = useState(0);
  const filters = useSelector((state) => state.main.own_recipes_filters);
  const recipes = useSelector(
    (state) =>
      applyFilters(state.main.recipes, filters)
        .sort((a, b) => a.id - b.id)
        .sort((a, b) => (a.is_favourite ? -1 : b.is_favourite ? 1 : 0))
        .slice(
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

  function createRecipe() {
    dispach({
      type: CHANGE_CREATE_TAB_STATUS,
      payload: { status: true },
    });
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
        {currentPage === 0 && first_blank ? (
          <div className="recipe_container">
            <div
              id="blank_recipe"
              className="edit_recipe"
              onClick={() => createRecipe()}
            >
              <img
                src={addRecipeImg}
                alt="Add recipe"
                id="create_recipe_img"
              ></img>
            </div>
            <EditIconSet hidden={true} />
          </div>
        ) : null}
        {recipes.map((recipe, index) => (
          <Recipe
            id={recipe.id}
            key={recipe.id}
            recipe={recipe}
            index={index}
            first_blank={true}
            edit={edit}
            icon_set={1}
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

export default EditRecipesList;

import React from "react";
import Recipe from "./Recipe";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getPublicRecipes } from "../actions/mainWindowsActions";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";

var classNames = require("classnames");

function PublicRecipesList({ recipes_per_page }) {
  const [currentPage, setCurrentPage] = useState(0);
  const filters = useSelector((state) => state.main.own_recipes_filters);
  let [recipes, setRecipes] = useState([]);
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState(null);
  const dispach = useDispatch();

  useEffect(() => {
    async function getRecipes() {
      // Fetch first page
      let recipes = await dispach(
        getPublicRecipes(filters, "", recipes_per_page)
      );
      setNext(recipes.next);
      setPrev(recipes.previous);
      setRecipes(recipes.results);
    }
    getRecipes();
  }, [filters, recipes_per_page, dispach]);

  async function nextRecipes() {
    if (next !== null) {
      recipes = await dispach(
        getPublicRecipes(filters, next, recipes_per_page)
      );
      setNext(recipes.next);
      setPrev(recipes.previous);
      setRecipes(recipes.results);
      setCurrentPage(currentPage + 1);
    }
  }

  async function prevRecipes() {
    if (prev !== null) {
      recipes = await dispach(
        getPublicRecipes(filters, prev, recipes_per_page)
      );
      setNext(recipes.next);
      setPrev(recipes.previous);
      setRecipes(recipes.results);
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
          <Recipe id={recipe.id} key={recipe.id} recipe={recipe} index={index} edit={true} />
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

export default PublicRecipesList;

import React from "react";
import Recipe from "./Recipe";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getPublicRecipes } from "../actions/mainWindowsActions";
import { Button } from "react-bootstrap";

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

  return (
    <div>
      {recipes.map((recipe) => (
        <Recipe id={recipe.id} key={recipe.id} recipe={recipe} />
      ))}
      <Button id="leftArrow" onClick={() => prevRecipes()}>
        Prev
      </Button>
      <Button id="rightArrow" onClick={() => nextRecipes()}>
        Next
      </Button>
    </div>
  );
}

export default PublicRecipesList;

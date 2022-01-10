import React from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import { FcRating } from "react-icons/fc";
import { IconContext } from "react-icons";
import { useDispatch } from "react-redux";
import { createRecipe } from "../actions/mainWindowsActions";
import { useState } from "react";
import { recipeVote } from "../actions/mainWindowsActions";

var classNames = require("classnames");

function BrowseRecipesIconSet({ recipe }) {
  const dispach = useDispatch();
  const [voteStarsVisibility, setvoteStarsVisibility] = useState(false);
  const [hoveredScore, setHoveredScore] = useState(0);
  const [stars, setStars] = useState([false, false, false, false, false]);

  function onCopyClick() {
    const data = {
      ...recipe,
      tea_type: recipe.tea_type.id,
      ingredients: recipe.ingredients.map((ing) => ({
        ammount: ing.ammount,
        id: ing.id,
        ingredient_id: ing.ingredient.id,
      })),
      is_favourite: false,
      is_public: false,
      score: 0,
      votes: 0,
    };
    dispach(createRecipe(data));
  }

  function sendRate(score) {
    console.log(score);
    dispach(recipeVote(recipe.id, score, recipe.voted));
  }

  function voteMouseEnter(value) {
    if (hoveredScore < value) {
      setStars(stars.map((star, index) => index <= value - 1 ? true : false))
    }
    return 0;
  }

  function voteMouseLeave(value) {
    return 0;
  }

  const voteClasses = classNames(
    { hide: !voteStarsVisibility, show: voteStarsVisibility },
    "rating_container"
  );

  return (
    <div className="edit_icon_set_container">
      <div className="edit_icon_set">
        <IconContext.Provider
          value={{
            className: "icon",
            size: 29,
          }}
        >
          <div
            className="browse_icon_container icon_container"
            onClick={() => onCopyClick()}
          >
            <AiOutlineCopy />
          </div>
          <div
            className="browse_icon_container margin icon_container"
            onClick={() => {setvoteStarsVisibility(!voteStarsVisibility); setStars(stars.map(() => false))}}
          >
            <FcRating />
          </div>
        </IconContext.Provider>
      </div>
      <IconContext.Provider
        value={{
          className: "icon",
          size: 24,
          color: "gold"
        }}
      >
        <div className={voteClasses}>
          {[1, 2, 3, 4, 5].map((el, index) => (
            <div
              className="vote_star"
              key={el}
              onClick={() => sendRate(el)}
              onMouseEnter={() => voteMouseEnter(el)}
              onMouseLeave={() => voteMouseLeave(el)}
            >
              {stars[index] ? (
                <ImStarFull value={el} />
              ) : (
                <ImStarEmpty value={el} />
              )}
            </div>
          ))}
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default BrowseRecipesIconSet;

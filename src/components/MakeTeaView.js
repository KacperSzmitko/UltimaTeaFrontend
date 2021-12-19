import React from "react";
import OwnRecipesList from "./MakeTeaRecipeList";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { makeTea } from "../actions/mainWindowsActions";
import { useSelector } from "react-redux";


var classNames = require("classnames");

function MakeTea() {
  const btnClasses = classNames("submit_btn");
  const submitBtnContainerClasses = classNames("");
  const dispach = useDispatch();
  const selectedRecipe = useSelector((state) => state.main.selected_recipe);



  function prepareTea() {
    if (selectedRecipe === null) {
      console.log("Wybierz recepturę którą chcesz przyrządzić");
    } else {
      dispach(makeTea(selectedRecipe));
    }
  }

  return (
    <div id="recipes_with_btn">
      <OwnRecipesList
        recipes_per_page={3}
        is_favourite={true}
        first_blank={false}
        is_main_page={true}
      />
      <div id="submit_tea" className={submitBtnContainerClasses}>
        <Button
          id="submit_tea_btn"
          className={btnClasses}
          onClick={() => prepareTea()}
        >
          {" "}
          Zrób herbatę{" "}
        </Button>
      </div>
    </div>
  );
}

export default MakeTea;

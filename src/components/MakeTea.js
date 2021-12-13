import React from "react";
import OwnRecipesList from "./OwnRecipesList";
import { Button } from "react-bootstrap";
var classNames = require("classnames");

function MakeTea() {
  const btnClasses = classNames("submit_btn");
  const submitBtnContainerClasses = classNames("");

  function makeTea() {
    return 0;
  }
  return (
    <div id="recipes_with_btn">
      <OwnRecipesList
        recipes_per_page={3}
        is_favourite={true}
        first_blank={false}
      />
      <div id="submit_tea" className={submitBtnContainerClasses}>
        <Button
          id="submit_tea_btn"
          className={btnClasses}
          onClick={() => makeTea()}
        >
          {" "}
          Zrób herbatę{" "}
        </Button>
      </div>
    </div>
  );
}

export default MakeTea;

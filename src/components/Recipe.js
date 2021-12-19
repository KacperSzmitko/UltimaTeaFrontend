import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editSelectedRecipe } from "../actions/mainWindowsActions";
import { useEffect } from "react";
import EditIconSet from "./EditIconSet";

var classNames = require("classnames");

function Recipe({ id, recipe, index, first_blank = false, edit = false, icon_set=0 }) {
  const selectedRecipe = useSelector((state) => state.main.selected_recipe);
  const dispach = useDispatch();

  useEffect(() => {
    if (selectedRecipe === id) {
      return dispach(editSelectedRecipe(null));
    }
  }, [dispach, id]);

  function selectRecipe(id) {
    if (selectedRecipe === id) {
      dispach(editSelectedRecipe(null));
    } else {
      dispach(editSelectedRecipe(id));
    }
  }

  const titleClasses = classNames("h4");
  const sectionTitleClasses = classNames("h5");
  const sectionItemsClasses = classNames("h6");
  const sectionClasses = classNames("recipe_section");
  const titleWithLineClasses = classNames("title_container");
  const recipeMainSectionClasses = classNames("recipe_main_section");
  const recipeClasses = classNames({
    edit_recipe: edit,
    selected_recipe: selectedRecipe === id,
    recipe: !edit,
  });
  const recipeContainerClasses = classNames(
    {
      main_recipe_container: !edit,
      mid_recipe: first_blank
        ? index === 0 || index === 3
        : index === 1 || index === 4,
    },
    "recipe_container"
  );

  return (
    <div className={recipeContainerClasses}>
      <div
        id={"recipe_" + id}
        onClick={() => selectRecipe(id)}
        className={recipeClasses}
      >
        <div className={titleWithLineClasses}>
          <div className={titleClasses}>{recipe.recipe_name}</div>
          <div className="line"></div>
        </div>

        <div className={recipeMainSectionClasses}>
          <div className={sectionClasses}>
            <div className={sectionTitleClasses}>Składniki</div>

            <div className={sectionItemsClasses}>
              <div className="recipes_names recipe_column">
                <div>Woda</div>
                <div>{recipe.tea_type.tea_name}</div>
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index}>
                    <div>{ingredient.ingredient.ingredient_name} </div>
                  </div>
                ))}
              </div>

              <div className={"recipes_values recipe_column"}>
                <div className="value_unit_container">
                  <div>{recipe.tea_portion}</div> <div className="unit">ml</div>
                </div>
                <div className="value_unit_container">
                  <div>{recipe.tea_herbs_ammount}</div>
                  <div className="unit">g</div>
                </div>
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="value_unit_container">
                    <div>{ingredient.ammount}</div>{" "}
                    <div className="unit">g</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={sectionClasses}>
            <div className={sectionTitleClasses}>Temperatury</div>
            <div className={sectionItemsClasses}>
              <div className="recipes_names recipe_column">Parzenie</div>
              <div className={"recipes_values recipe_column"}>
                <div className="value_unit_container">
                  <div>{recipe.brewing_temperature} </div>{" "}
                  <div className="unit">℃</div>
                </div>
              </div>
            </div>
          </div>

          <div className={sectionClasses}>
            <div className={sectionTitleClasses}>Czasy</div>
            <div className={sectionItemsClasses}>
              <div className="recipes_names recipe_column">
                <div>Parzenie</div>
                <div>Mieszanie</div>
              </div>
              <div className={"recipes_values recipe_column"}>
                <div className="value_unit_container">
                  <div>{recipe.brewing_time}</div> <div className="unit">s</div>
                </div>
                <div className="value_unit_container">
                  <div>{recipe.mixing_time}</div> <div className="unit">s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {edit && icon_set===1 ? (
        <EditIconSet favourite={recipe.is_favourite} recipeId={id} />
      ) : null}
      {edit && icon_set===2 ? (
        <EditIconSet favourite={recipe.is_favourite} recipeId={id} />
      ) : null}
    </div>
  );
}

export default Recipe;

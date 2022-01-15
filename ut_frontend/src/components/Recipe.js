import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editSelectedRecipe } from "../actions/mainWindowsActions";
import { useEffect } from "react";
import EditIconSet from "./EditIconSet";
import BrowseRecipesIconSet from "./BrowseRecipesIconSet";
import { IconContext } from "react-icons";
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";

var classNames = require("classnames");
/**
 *
 * @param {*} first_blank To determine which recipe is mid one specify if there is first blank on list or not
 * @param {*} id Id of recipe
 * @param {*} index Index of recipe, to specify mid recipe
 * @param {*} recipe Single recipe to represent by component
 * @param {*} edit MakeTeaView - false, Edit/BrowseView - true
 * @param {*} icon_set 0 - EditIconSet 1 - BrowseIconSet
 */
function Recipe({
  id,
  index,
  first_blank = false,
  edit = false,
  icon_set = 0,
  browse = false,
}) {
  const selectedRecipe = useSelector((state) => state.main.selected_recipe);
  const recipe = useSelector((state) =>
    browse
      ? state.main.fetched_recipe_page.results.find(
          (recipe) => recipe.id === id
        )
      : state.main.recipes.find((recipe) => recipe.id === id)
  );
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
  const titleWithLineClasses = classNames("title_container");
  const recipeMainSectionClasses = classNames("recipe_main_section");
  const recipeClasses = classNames("global_recipe",{
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
        onClick={() => (edit ? null : selectRecipe(id))}
        className={recipeClasses}
      >
        <div className={titleWithLineClasses}>
          <div className={titleClasses}>{recipe.recipe_name}</div>
          <div className="line"></div>
        </div>

        <div className={recipeMainSectionClasses}>
          <div className="ing_section recipe_section">
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

          <div className="temp_section recipe_section">
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

          <div className="time_section recipe_section">
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

        <div className="score">
          <IconContext.Provider
            value={{
              className: "icon",
              size: 25,
              color: "gold",
            }}
          >
            {[1, 2, 3, 4, 5].map((e) =>
              recipe.score < e ? (
                recipe.score < e - 0.5 ? (
                  <ImStarEmpty key={e} />
                ) : (
                  <ImStarHalf key={e} />
                )
              ) : (
                <ImStarFull key={e} />
              )
            )}
          </IconContext.Provider>
        </div>
      </div>
      {edit && icon_set === 1 ? (
        <EditIconSet
          favourite={recipe.is_favourite}
          recipeId={id}
          is_public={recipe.is_public}
        />
      ) : null}
      {edit && icon_set === 2 ? <BrowseRecipesIconSet recipe={recipe} /> : null}
    </div>
  );
}

export default Recipe;

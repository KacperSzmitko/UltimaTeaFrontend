import React from "react";

function Recipe(props) {
  const recipe = props.recipe;

  return (
    <div id={"recipe_" + props.id}>
      <br />
      <br />
      <div>{recipe.recipe_name}</div>
      <div>Składniki</div>
      <div>Woda : {recipe.tea_portion}</div>
      <div>
        {recipe.tea_type.tea_name} : {recipe.tea_herbs_ammount}
      </div>
      {recipe.ingredients.map((ingredient, index) => (
        <div key={index}>
          {ingredient.ingredient.ingredient_name} : {ingredient.ammount}
        </div>
      ))}
      <div>Temperatury</div>
      <div>Parzenie : {recipe.brewing_temperature}</div>
      <div>Czasy</div>
      <div>Parzenie : {recipe.brewing_time}</div>
      <div>Mieszanie : {recipe.mixing_time}</div>
    </div>
  );
}

export default Recipe;

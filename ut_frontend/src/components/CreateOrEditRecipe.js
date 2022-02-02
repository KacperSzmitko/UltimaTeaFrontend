import React from "react";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_EDIT_TAB_STATUS,
  CHANGE_CREATE_TAB_STATUS,
  CHANGE_MAKE_TEA_TAB_STATUS,
} from "../actions/types";
import CreateOrEditIcons from "./CreateOrEditIcons";
import { createRecipe, editRecipe } from "../actions/mainWindowsActions";
import { useEffect } from "react";
import { makeTea } from "../actions/mainWindowsActions";

function CreateOrEditRecipe({ make_tea = false }) {
  const [recipeName, setRecipeName] = useState(null);
  const [water, setWater] = useState(null);
  const [tea, setTea] = useState(-1);
  const [teaAmmonut, setTeaAmmonut] = useState(null);
  const [ing1, setIng1] = useState(-1);
  const [ing1Ammonut, seting1Ammonut] = useState(null);
  const [ing2, setIng2] = useState(-1);
  const [ing2Ammonut, seting2Ammonut] = useState(null);
  const [brewingTemp, setBrewingTemp] = useState(null);
  const [brewingTime, setBrewingTime] = useState(null);
  const [mixingTime, setMixingTime] = useState(null);
  const dispach = useDispatch();
  const ingredients = useSelector((state) => state.main.ingredients);
  const teas = useSelector((state) => state.main.teas);
  const editingRecipeId = useSelector((state) => state.main.editing_recipe);
  const makingRecipe = useSelector((state) => state.main.make_selected_recipe);
  const recipe = useSelector((state) =>
    editingRecipeId !== null
      ? state.main.recipes.filter((recipe) => recipe.id === editingRecipeId)[0]
      : makingRecipe.id !== null
      ? makingRecipe
      : null
  );

  useEffect(() => {
    if (editingRecipeId !== null || makingRecipe !== null) {
      setRecipeName(recipe.recipe_name);
      setWater(recipe.tea_portion);
      setTea(recipe.tea_type.id);
      setTeaAmmonut(recipe.tea_herbs_ammount);
      if (recipe.ingredients.length === 1) {
        setIng1(recipe.ingredients[0].ingredient.id);
        seting1Ammonut(recipe.ingredients[0].ammount);
      } else if (recipe.ingredients.length === 2) {
        setIng1(recipe.ingredients[0].ingredient.id);
        seting1Ammonut(recipe.ingredients[0].ammount);
        setIng2(recipe.ingredients[1].ingredient.id);
        seting2Ammonut(recipe.ingredients[1].ammount);
      }
      setBrewingTemp(recipe.brewing_temperature);
      setBrewingTime(recipe.brewing_time);
      setMixingTime(recipe.mixing_time);
    }
  }, [editingRecipeId, recipe, makingRecipe]);

  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    let data = {};
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    if (make_tea) {
      let tempRecipe = { ...makingRecipe };
      if (ing1 !== -1 && ing1Ammonut !== null) {
        let i = ingredients.find((ing) => ing.id === ing1);
        let recipeIng = [...tempRecipe.ingredients];
        recipeIng[0] = { ingredient: i, ammount: ing1Ammonut };
        tempRecipe.ingredients = recipeIng;
      }
      if (ing2 !== -1 && ing2Ammonut !== null) {
        let i = ingredients.find((ing) => ing.id === ing2);
        let recipeIng = [...tempRecipe.ingredients];
        recipeIng[1] = { ingredient: i, ammount: ing2Ammonut };
        tempRecipe.ingredients = recipeIng;
      }
      if (makingRecipe.tea_portion !== water) tempRecipe.tea_portion = water;
      if (makingRecipe.tea_type.id !== tea) 
      {
        tempRecipe.tea_type = teas.find((t) => t.id === tea);
      }
      if (makingRecipe.tea_herbs_ammount !== teaAmmonut)
        tempRecipe.tea_herbs_ammount = teaAmmonut;
      if (makingRecipe.brewing_temperature !== brewingTemp)
        tempRecipe.brewing_temperature = brewingTemp;
      if (makingRecipe.brewing_time !== brewingTime)
        tempRecipe.brewing_time = brewingTime;
      if (makingRecipe.mixing_time !== mixingTime)
        tempRecipe.mixing_time = mixingTime;
      dispach(makeTea(tempRecipe));
    } else {
      if (editingRecipeId !== null) {
        let ingredients = [];
        let method = "patch";
        if (
          (ing1 !== -1 && ing1Ammonut === null) ||
          (ing1 === null && ing1Ammonut !== -1)
        ) {
          // Raise error only one specified
        }
        if (
          (ing2 !== -1 && ing2Ammonut === null) ||
          (ing2 === null && ing2Ammonut !== -1)
        ) {
          // Raise error only one specified
        }

        if (ing1 !== -1 && ing1Ammonut !== null) {
          if (recipe.ingredients.length >= 1) {
            ingredients.push({
              ammount: ing1Ammonut,
              ingredient_id: ing1,
              id: recipe.ingredients[0].id,
            });
          } else {
            method = "put";
            ingredients.push({
              ammount: ing1Ammonut,
              ingredient_id: ing1,
            });
          }
        } else if (recipe.ingredients.length >= 1) {
          method = "put";
        }
        if (ing2 !== -1 && ing2Ammonut !== null) {
          if (recipe.ingredients.length >= 2) {
            ingredients.push({
              ammount: ing2Ammonut,
              ingredient_id: ing2,
              id: recipe.ingredients[1].id,
            });
          } else {
            method = "put";
            ingredients.push({
              ammount: ing2Ammonut,
              ingredient_id: ing2,
            });
          }
        } else if (recipe.ingredients.length >= 2) {
          method = "put";
        }

        if (recipeName !== null) {
          if (method === "patch") {
            if (recipe.recipe_name !== recipeName)
              data.recipe_name = recipeName;
          } else {
            data.recipe_name = recipeName;
          }
        }

        if (water !== null) {
          if (method === "patch") {
            if (recipe.tea_portion !== water) data.tea_portion = water;
          } else {
            data.tea_portion = water;
          }
        }

        if (tea !== null) {
          if (method === "patch") {
            if (recipe.tea_type.id !== tea) data.tea_type = tea;
          } else {
            data.tea_type = tea;
          }
        }

        if (teaAmmonut !== null) {
          if (method === "patch") {
            if (recipe.tea_herbs_ammount !== teaAmmonut)
              data.tea_herbs_ammount = teaAmmonut;
          } else {
            data.tea_herbs_ammount = teaAmmonut;
          }
        }

        if (brewingTemp !== null) {
          if (method === "patch") {
            if (recipe.brewing_temperature !== brewingTemp)
              data.brewing_temperature = brewingTemp;
          } else {
            data.brewing_temperature = brewingTemp;
          }
        }

        if (brewingTime !== null) {
          if (method === "patch") {
            if (recipe.brewing_time !== brewingTime)
              data.brewing_time = brewingTime;
          } else {
            data.brewing_time = brewingTime;
          }
        }

        if (mixingTime !== null) {
          if (method === "patch") {
            if (recipe.mixing_time !== mixingTime)
              data.mixing_time = mixingTime;
          } else {
            data.mixing_time = mixingTime;
          }
        }
        data.ingredients = ingredients;
        dispach(editRecipe(data, editingRecipeId, method));
      } else {
        // Create reicpe
        let ingredients = [];
        if (ing1 !== null && ing1Ammonut !== null) {
          ingredients.push({
            ammount: ing1Ammonut,
            ingredient_id: ing1,
          });
        }
        if (ing2 !== null && ing2Ammonut !== null) {
          ingredients.push({
            ammount: ing2Ammonut,
            ingredient_id: ing2,
          });
        }
        data = {
          tea_portion: water,
          tea_herbs_ammount: teaAmmonut,
          mixing_time: mixingTime,
          brewing_time: brewingTime,
          brewing_temperature: brewingTemp,
          recipe_name: recipeName,
          tea_type: tea,
          ingredients: ingredients,
        };
        dispach(createRecipe(data));
      }
    }
  }

  function clearForm() {
    return 0;
  }

  function closeEdit(e) {
    if (e.target.id === "ce_recipe_form_container") {
      dispach({
        type: CHANGE_EDIT_TAB_STATUS,
        payload: { status: false, id: null },
      });
      dispach({
        type: CHANGE_CREATE_TAB_STATUS,
        payload: { status: false },
      });
      dispach({
        type: CHANGE_MAKE_TEA_TAB_STATUS,
        payload: { status: false, id: null },
      });
    }
  }

  return (
    <div id="ce_recipe_form_container" onClick={(e) => closeEdit(e)}>
      <div id="ce_pos_container">
        <Form
          onSubmit={(e) => onSubmit(e)}
          onReset={(e) => clearForm(e)}
          id="ce_form"
        >
          <div id="ce_inputs">
            <div id="ce_recipe_name_section">
              <div id="ce_name_input">
                <Form.Control
                  required
                  type="text"
                  onChange={(e) => setRecipeName(e.target.value)}
                  defaultValue={
                    editingRecipeId !== null || makingRecipe !== null
                      ? recipe.recipe_name
                      : null
                  }
                  className="ce_name_input"
                />
              </div>
              <div id="ce_name_separator"></div>
            </div>
            <div className="ce_section">
              <div className="ce_section_title">Składniki</div>

              <div className="ce_section_content">
                <div className="ce_input_row">
                  <div className="ce_text_name ce_input_name">Woda</div>
                  <div className="ce_input_value">
                    {" "}
                    <Form.Control
                      required
                      type="number"
                      onChange={(e) => setWater(parseInt(e.target.value))}
                      defaultValue={
                        editingRecipeId !== null || makingRecipe !== null
                          ? recipe.tea_portion
                          : null
                      }
                    />
                  </div>
                </div>

                <div className="ce_input_row">
                  <div className="ce_select ce_input_name">
                    {" "}
                    <Form.Select
                      required
                      onChange={(e) => setTea(parseInt(e.target.value))}
                      defaultValue={
                        editingRecipeId !== null || makingRecipe !== null
                          ? recipe.tea_type.id
                          : null
                      }
                    >
                      <option value={-1}></option>
                      {teas.map((tea) => (
                        <option value={tea.id} key={tea.id}>
                          {tea.tea_name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="ce_input_value">
                    {" "}
                    <Form.Control
                      required
                      type="number"
                      onChange={(e) => setTeaAmmonut(parseInt(e.target.value))}
                      defaultValue={
                        editingRecipeId !== null || makingRecipe !== null
                          ? recipe.tea_herbs_ammount
                          : null
                      }
                    />
                  </div>
                </div>

                <div className="ce_input_row">
                  <div className="ce_select ce_input_name">
                    {" "}
                    <Form.Select
                      onChange={(e) => setIng1(parseInt(e.target.value))}
                      defaultValue={
                        editingRecipeId !== null || makingRecipe !== null
                          ? recipe.ingredients.length >= 1
                            ? recipe.ingredients[0].ingredient.id
                            : null
                          : null
                      }
                    >
                      <option value={-1}></option>
                      {ingredients.map((ingredient) => (
                        <option value={ingredient.id} key={ingredient.id}>
                          {ingredient.ingredient_name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="ce_input_value">
                    {" "}
                    <Form.Control
                      defaultValue={
                        editingRecipeId !== null || makingRecipe !== null
                          ? recipe.ingredients.length >= 1
                            ? recipe.ingredients[0].ammount
                            : null
                          : null
                      }
                      type="number"
                      onChange={(e) => seting1Ammonut(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="ce_input_row">
                  <div className="ce_select ce_input_name">
                    {" "}
                    <Form.Select
                      onChange={(e) => setIng2(parseInt(e.target.value))}
                      defaultValue={
                        editingRecipeId !== null || makingRecipe !== null
                          ? recipe.ingredients.length >= 2
                            ? recipe.ingredients[1].ingredient.id
                            : null
                          : null
                      }
                    >
                      <option value={-1}></option>
                      {ingredients.map((ingredient) => (
                        <option value={ingredient.id} key={ingredient.id}>
                          {ingredient.ingredient_name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="ce_input_value">
                    {" "}
                    <Form.Control
                      type="number"
                      onChange={(e) => seting2Ammonut(parseInt(e.target.value))}
                      defaultValue={
                        editingRecipeId !== null || makingRecipe !== null
                          ? recipe.ingredients.length >= 2
                            ? recipe.ingredients[1].ammount
                            : null
                          : null
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="no_margin_bot ce_section">
              <div className="ce_section_title">Parametry</div>

              <div className="ce_section_content">
                <div className="ce_input_row">
                  <div className="ce_text_name ce_input_name">
                    Temp. parzenia
                  </div>
                  <div className="ce_input_value">
                    {" "}
                    <Form.Control
                      required
                      type="number"
                      onChange={(e) => setBrewingTemp(parseInt(e.target.value))}
                      defaultValue={
                        editingRecipeId !== null || makingRecipe !== null
                          ? recipe.brewing_temperature
                          : null
                      }
                    />
                  </div>
                </div>

                <div className="ce_input_row">
                  <div className="ce_text_name ce_input_name">
                    Czas parzenia
                  </div>
                  <div className="ce_input_value">
                    {" "}
                    <Form.Control
                      required
                      type="number"
                      onChange={(e) => setBrewingTime(parseInt(e.target.value))}
                      defaultValue={
                        editingRecipeId !== null || makingRecipe !== null
                          ? recipe.brewing_time
                          : null
                      }
                    />
                  </div>
                </div>

                <div className="ce_input_row">
                  <div className="ce_text_name ce_input_name">
                    Czas mieszania
                  </div>
                  <div className="ce_input_value">
                    {" "}
                    <Form.Control
                      required
                      type="number"
                      onChange={(e) => setMixingTime(parseInt(e.target.value))}
                      defaultValue={
                        editingRecipeId !== null || makingRecipe !== null
                          ? recipe.mixing_time
                          : null
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="ce_btns">
            {" "}
            <Button type="submit" id="ce_submit_recipe_btn">
              {makingRecipe ? "Przygotuj" : "Zapisz"}
            </Button>
          </div>
        </Form>
        <CreateOrEditIcons />
      </div>
    </div>
  );
}

export default CreateOrEditRecipe;

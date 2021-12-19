import React from "react";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CHANGE_EDIT_TAB_STATUS } from "../actions/types";

function CreateOrEditRecipe() {
  const [recipeName, setRecipeName] = useState(null);
  const [water, setWater] = useState(null);
  const [tea, setTea] = useState(null);
  const [teaAmmonut, setTeaAmmonut] = useState(null);
  const [ing1, setIng1] = useState(null);
  const [ing1Ammonut, seting1Ammonut] = useState(null);
  const [ing2, setIng2] = useState(null);
  const [ing2Ammonut, seting2Ammonut] = useState(null);
  const [brewingTemp, setBrewingTemp] = useState(null);
  const [brewingTime, setBrewingTime] = useState(null);
  const [mixingTime, setMixingTime] = useState(null);
  const dispach = useDispatch();
  const ingredients = useSelector((state) => state.main.ingredients);
  const teas = useSelector((state) => state.main.teas);
  const editingRecipeId = useSelector((state) => state.main.editing_recipe);
  const recipe = useSelector((state) =>
    editingRecipeId !== null ? state.main.recipes[editingRecipeId] : null
  );

  function onSubmit(e) {
    e.preventDefault();
    return 0;
  }

  function clearForm() {
    return 0;
  }
  //dispach({ type: CHANGE_EDIT_TAB_STATUS, payload: false });

  return (
    <div id="ce_recipe_form_container">
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
                  type="text"
                  onChange={(e) => setRecipeName(e.target.value)}
                  defaultValue={
                    editingRecipeId !== null ? recipe.recipe_name : null
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
                      type="number"
                      onChange={(e) => setWater(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ce_input_row">
                  <div className="ce_select ce_input_name">
                    {" "}
                    <Form.Select
                      onChange={(e) => setTea(e.target.value)}
                      defaultValue={
                        editingRecipeId !== null ? recipe.tea_type.id : null
                      }
                    >
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
                      type="number"
                      onChange={(e) => setTea(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ce_input_row">
                  <div className="ce_select ce_input_name">
                    {" "}
                    <Form.Select
                      onChange={(e) => setIng1(e.target.value)}
                      defaultValue={
                        editingRecipeId !== null
                          ? recipe.ingredients.length >= 1
                            ? recipe.ingredients[0].ingredient.id
                            : null
                          : null
                      }
                    >
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
                      onChange={(e) => setIng1(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ce_input_row">
                  <div className="ce_select ce_input_name">
                    {" "}
                    <Form.Select
                      onChange={(e) => setIng1(e.target.value)}
                      defaultValue={
                        editingRecipeId !== null
                          ? recipe.ingredients.length >= 1
                            ? recipe.ingredients[0].ingredient.id
                            : null
                          : null
                      }
                    >
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
                      onChange={(e) => setTea(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="ce_section">
              <div className="ce_section_title">Temperatury</div>

              <div className="ce_section_content">
                <div className="ce_input_row">
                  <div className="ce_text_name ce_input_name">Parzenie</div>
                  <div className="ce_input_value">
                    {" "}
                    <Form.Control
                      type="number"
                      onChange={(e) => setBrewingTemp(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="ce_section">
              <div className="ce_section_title">Czasy</div>

              <div className="ce_section_content">
                <div className="ce_input_row">
                  <div className="ce_text_name ce_input_name">Mieszanie</div>
                  <div className="ce_input_value">
                    {" "}
                    <Form.Control
                      type="number"
                      onChange={(e) => setMixingTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ce_input_row">
                  <div className="ce_text_name ce_input_name">Parzenie</div>
                  <div className="ce_input_value">
                    {" "}
                    <Form.Control
                      type="number"
                      onChange={(e) => setBrewingTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="ce_btns">
            {" "}
            <Button type="submit" id="ce_submit_recipe_btn">
              Zapisz
            </Button>
          </div>
        </Form>
        <div id="ce_icons"></div>
      </div>
    </div>
  );
}

export default CreateOrEditRecipe;

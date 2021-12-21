import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateFilters } from "../actions/mainWindowsActions";
import { useEffect } from "react";

//var classNames = require("classnames");

function Filters({ customSubmit }) {
  const [name, setRecipeName] = useState("");
  const [teaType, setTeaType] = useState(-1);
  const [ingredient1, setIngredient1] = useState(-1);
  const [ingredient2, setIngredient2] = useState(-1);
  const [brewingTemperatureDown, setbrewingTemperatureDown] = useState(-1);
  const [brewingTemperatureUp, setbrewingTemperatureUp] = useState(-1);
  const [brewingTimeDown, setbrewingTimeDown] = useState(-1);
  const [brewingTimeUp, setbrewingTimeUp] = useState(-1);
  const [mixingTimeDown, setmixingTimeDown] = useState(-1);
  const [mixingTimeUp, setmixingTimeUp] = useState(-1);
  const [minScore, setMinScore] = useState(-1);
  const ingredients = useSelector((state) => state.main.ingredients);
  const teas = useSelector((state) => state.main.teas);
  const dispach = useDispatch();

  function onSubmit(e = "") {
    if (e !== "") e.preventDefault();
    const data = {
      name: name,
      tea_type: teaType,
      ingredient1: ingredient1,
      ingredient2: ingredient2,
      brewing_temperature_down: brewingTemperatureDown,
      brewing_temperature_up: brewingTemperatureUp,
      brewing_time_down: brewingTimeDown,
      brewing_time_up: brewingTimeUp,
      mixing_time_down: mixingTimeDown,
      mixing_time_up: mixingTimeUp,
      min_score: minScore,
    };
    dispach(updateFilters(data));
  }

  function clearForm(e) {
    setRecipeName("");
    setTeaType(-1);
    setIngredient1(-1);
    setIngredient2(-1);
    setbrewingTemperatureDown(-1);
    setbrewingTemperatureUp(-1);
    setbrewingTimeDown(-1);
    setbrewingTimeUp(-1);
    setmixingTimeDown(-1);
    setmixingTimeUp(-1);
    setMinScore(-1);
  }

  useEffect(() => {
    return () => {
      clearForm();
      onSubmit();
    };
  }, []);

  return (
    <div id="filters_container">
      <div id="filters_title">Filtry</div>
      <Form
        onSubmit={(e) => onSubmit(e)}
        onReset={(e) => clearForm(e)}
        id="filters_forms"
      >
        <div id="filters_inputs">
          <Form.Group
            className="filters_input"
            controlId="Login.RecipeNameInput"
          >
            <Form.Label className="filter_label">Nazwa przepisu</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="filters_input" controlId="OwnRecipes.TeaInput">
            <Form.Label className="filter_label">Herbata</Form.Label>
            <Form.Select onChange={(e) => setTeaType(e.target.value)}>
              <option value={null}> </option>
              {teas.map((tea) => (
                <option value={tea.id} key={tea.id}>
                  {" "}
                  {tea.tea_name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="filters_input"
            controlId="OwnRecipes.Ingredient1Input"
          >
            <Form.Label className="filter_label">Składnik #1</Form.Label>
            <Form.Select onChange={(e) => setIngredient1(e.target.value)}>
              <option value={null}> </option>
              {ingredients.map((ingredient) => (
                <option value={ingredient.id} key={ingredient.id}>
                  {ingredient.ingredient_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="filters_input"
            controlId="OwnRecipes.Ingredient2Input"
          >
            <Form.Label className="filter_label">Składnik #2</Form.Label>
            <Form.Select onChange={(e) => setIngredient2(e.target.value)}>
              <option value={null}> </option>
              {ingredients.map((ingredient) => (
                <option value={ingredient.id} key={ingredient.id}>
                  {ingredient.ingredient_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="filters_input"
            controlId="OwnRecipes.RateInput"
          >
            <Form.Label className="filter_label">Minimalna ocena</Form.Label>
            <Form.Select onChange={(e) => setMinScore(e.target.value)}>
              <option value={null}> </option>
              {[1,2,3,4,5].map((val, index) => (
                <option value={index + 1} key={index}>
                  {" "}
                  {index + 1}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="filters_input"
            controlId="OwnRecipes.BrewingTemperature"
          >
            <Form.Label className="filter_label">
              Temperatura parzenia
            </Form.Label>
            <div className="range_input">
              <Form.Control
                type="number"
                onChange={(e) => setbrewingTemperatureDown(e.target.value)}
              />
              <div id="range-separator">- </div>
              <Form.Control
                type="number"
                onChange={(e) => setbrewingTemperatureUp(e.target.value)}
              />
              <div className="filter_unit">℃</div>
            </div>
          </Form.Group>

          <Form.Group
            className="filters_input"
            controlId="OwnRecipes.BrewingTime"
          >
            <Form.Label className="filter_label">Czas parzenia</Form.Label>
            <div className="range_input">
              <Form.Control
                type="number"
                onChange={(e) => setbrewingTimeDown(e.target.value)}
              />
              <div id="range-separator">- </div>
              <Form.Control
                type="number"
                onChange={(e) => setbrewingTimeUp(e.target.value)}
              />
              <div className="filter_unit second">s</div>
            </div>
          </Form.Group>

          <Form.Group
            className="filters_input"
            controlId="OwnRecipes.MixingTime"
          >
            <Form.Label className="filter_label">Czas mieszania</Form.Label>
            <div className="range_input">
              <Form.Control
                type="number"
                onChange={(e) => setmixingTimeDown(e.target.value)}
              />
              <div id="range-separator">- </div>
              <Form.Control
                type="number"
                onChange={(e) => setmixingTimeUp(e.target.value)}
              />
              <div className="filter_unit second">s</div>
            </div>
          </Form.Group>
        </div>
        <div id="filters_btns">
          <Button type="submit" id="submit_filters_btn">
            Filtruj
          </Button>
          <Button
            type="button"
            onClick={() => document.getElementById("filters_forms").reset()}
          >
            Resetuj
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Filters;

import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateFilters } from "../actions/mainWindowsActions";

function Filters() {
  const [recipeName, setRecipeName] = useState("");
  const [teaType, setTeaType] = useState("");
  const [ingredient1, setIngredient1] = useState("");
  const [ingredient2, setIngredient2] = useState("");
  const [brewingTemperatureDown, setbrewingTemperatureDown] = useState(-1);
  const [brewingTemperatureUp, setbrewingTemperatureUp] = useState(-1);
  const [brewingTimeDown, setbrewingTimeDown] = useState(-1);
  const [brewingTimeUp, setbrewingTimeUp] = useState(-1);
  const [mixingTimeDown, setmixingTimeDown] = useState(-1);
  const [mixingTimeUp, setmixingTimeUp] = useState(-1);
  const ingredients = useSelector((state) => state.main.ingredients);
  const teas = useSelector((state) => state.main.teas);
  const dispach = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    const data = 
      {
        recipeName: recipeName,
        teaType: teaType,
        ingredient1: ingredient1,
        ingredient2: ingredient2,
        brewingTemperatureDown: brewingTemperatureDown,
        brewingTemperatureUp: brewingTemperatureUp,
        brewingTimeDown: brewingTimeDown,
        brewingTimeUp: brewingTimeUp,
        mixingTimeDown: mixingTimeDown,
        mixingTimeUp: mixingTimeUp,
      };
    dispach(updateFilters(data));
  }

  return (
    <div>
      Filtry
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="Login.PasswordInput">
          <Form.Label>Nazwa przepisu</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="OwnRecipes.TeaInput">
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

        <Form.Group className="mb-3" controlId="OwnRecipes.Ingredient1Input">
          <Form.Select onChange={(e) => setIngredient1(e.target.value)}>
            <option value={null}> </option>
            {ingredients.map((ingredient) => (
              <option value={ingredient.id} key={ingredient.id}>
                {ingredient.ingredient_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="OwnRecipes.Ingredient2Input">
          <Form.Select onChange={(e) => setIngredient2(e.target.value)}>
            <option value={null}> </option>
            {ingredients.map((ingredient) => (
              <option value={ingredient.id} key={ingredient.id}>
                {ingredient.ingredient_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="OwnRecipes.BrewingTemperature">
          <Form.Label>Temperatura parzenia</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setbrewingTemperatureDown(e.target.value)}
          />
          <Form.Control
            type="number"
            onChange={(e) => setbrewingTemperatureUp(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="OwnRecipes.BrewingTime">
          <Form.Label>Czas parzenia</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setbrewingTimeDown(e.target.value)}
          />
          <Form.Control
            type="number"
            onChange={(e) => setbrewingTimeUp(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="OwnRecipes.MixingTime">
          <Form.Label>Czas mieszania</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setmixingTimeDown(e.target.value)}
          />
          <Form.Control
            type="number"
            onChange={(e) => setmixingTimeUp(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Filtruj</Button>
      </Form>
    </div>
  );
}

export default Filters;

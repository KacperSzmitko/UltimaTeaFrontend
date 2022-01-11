import React from "react";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeContainers } from "../actions/mainWindowsActions";
import ContainerItem from "./ContainerItem";

var classNames = require("classnames");

function EditContainers() {
  const ingredients = useSelector((state) => state.main.ingredients);
  const teas = useSelector((state) => state.main.teas);
  const teaContainer1 = useSelector((state) => state.main.tea_container1);
  const teaContainer2 = useSelector((state) => state.main.tea_container2);
  const ingContainer1 = useSelector(
    (state) => state.main.ingredient_container1
  );
  const ingContainer2 = useSelector(
    (state) => state.main.ingredient_container2
  );
  const [tea1, setTea1] = useState(() =>
    teaContainer1.tea !== null ? teaContainer1.tea.id : null
  );
  const [tea2, setTea2] = useState(() =>
    teaContainer2.tea !== null ? teaContainer2.tea.id : null
  );
  const [ingredient1, setIngredient1] = useState(() =>
    ingContainer1.ingredient !== null ? ingContainer1.ingredient.id : null
  );
  const [ingredient2, setIngredient2] = useState(
    ingContainer2.ingredient !== null ? ingContainer2.ingredient.id : null
  );

  const dispach = useDispatch();

  useEffect(() => {
    setTea1(teaContainer1.tea !== null ? teaContainer1.tea.id : null);
    setTea2(teaContainer2.tea !== null ? teaContainer2.tea.id : null);
    setIngredient1(
      ingContainer1.ingredient !== null ? ingContainer1.ingredient.id : null
    );
    setIngredient2(
      ingContainer2.ingredient !== null ? ingContainer2.ingredient.id : null
    );
  }, [
    ingContainer1.ingredient,
    ingContainer2.ingredient,
    teaContainer1.tea,
    teaContainer2.tea,
  ]);

  function onSubmit(e) {
    e.preventDefault();
    let tea_containers = [];
    let ing_containers = [];

    if (teaContainer1.tea !== null){
      if (teaContainer1.tea.id !== tea1) {
        tea_containers.push({ id: teaContainer1.id, tea: tea1 });
      }
    }
    else{
      if (tea1 !== null){
        tea_containers.push({ id: teaContainer1.id, tea: tea1 });
      }
    }

    if (teaContainer2.tea !== null){
      if (teaContainer2.tea.id !== tea2) {
        tea_containers.push({ id: teaContainer2.id, tea: tea2 });
      }
    }
    else{
      if (tea2 !== null){
        tea_containers.push({ id: teaContainer2.id, tea: tea2 });
      }
    }

    if (ingContainer1.ingredient !== null) {
      if (ingContainer1.ingredient.id !== ingredient1) {
        ing_containers.push({ id: ingContainer1.id, ing: ingredient1 });
      }
    } else {
      if (ingredient1 !== null) {
        ing_containers.push({ id: ingContainer1.id, ing: ingredient1 });
      }
    }

    if (ingContainer2.ingredient !== null) {
      if (ingContainer2.ingredient.id !== ingredient2) {
        ing_containers.push({ id: ingContainer2.id, ing: ingredient2 });
      }
    } else {
      if (ingredient2 !== null) {
        ing_containers.push({ id: ingContainer2.id, ing: ingredient2 });
      }
    }
    dispach(changeContainers(tea_containers, ing_containers));
  }

  const textContainerClasses = classNames("edit_container_title");

  return (
    <div id="edit_containers_container">
      <Form onSubmit={(e) => onSubmit(e)} id="edit_containers_form">
        <Form.Group className="mb-3" controlId="OwnRecipes.TeaInput">
          <div className={textContainerClasses}>Herbata #1</div>
          <div className="edit_containers_bar_select">
            <Form.Select
              onChange={(e) => setTea1(parseInt(e.target.value))}
              className="edit_containers_select"
            >
              <option
                value={teaContainer1.tea !== null ? teaContainer1.tea.id : null}
              >
                {teaContainer1.tea !== null ? teaContainer1.tea.tea_name : null}
              </option>
              {teas
                .filter((tea) =>
                  teaContainer1.tea !== null
                    ? tea.id !== teaContainer1.tea.id
                    : true
                )
                .map((tea) => (
                  <option value={tea.id} key={tea.id}>
                    {" "}
                    {tea.tea_name}{" "}
                  </option>
                ))}
            </Form.Select>
            <ContainerItem
              edit={true}
              id="edit_tea_container1"
              containerName="tea_container1"
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="OwnRecipes.TeaInput">
          <div className={textContainerClasses}>Herbata #2</div>
          <div className="edit_containers_bar_select">
            <Form.Select
              onChange={(e) => setTea2(parseInt(e.target.value))}
              className="edit_containers_select"
            >
              <option
                value={teaContainer2.tea !== null ? teaContainer2.tea.id : null}
              >
                {teaContainer2.tea !== null ? teaContainer2.tea.tea_name : null}
              </option>
              {teas
                .filter((tea) =>
                  teaContainer2.tea !== null
                    ? tea.id !== teaContainer2.tea.id
                    : true
                )
                .map((tea) => (
                  <option value={tea.id} key={tea.id}>
                    {" "}
                    {tea.tea_name}{" "}
                  </option>
                ))}
            </Form.Select>
            <ContainerItem
              edit={true}
              id="edit_tea_container2"
              containerName="tea_container2"
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="OwnRecipes.TeaInput">
          <div className={textContainerClasses}>Składnik #1</div>
          <div className="edit_containers_bar_select">
            <Form.Select
              onChange={(e) => setIngredient1(parseInt(e.target.value))}
              className="edit_containers_select"
            >
              <option
                value={
                  ingContainer1.ingredient !== null
                    ? ingContainer1.ingredient.id
                    : null
                }
              >
                {ingContainer1.ingredient !== null
                  ? ingContainer1.ingredient.ingredient_name
                  : null}
              </option>
              {ingredients
                .filter((ingredient) =>
                  ingContainer1.ingredient !== null
                    ? ingredient.id !== ingContainer1.ingredient.id
                    : true
                )
                .map((ingredient) => (
                  <option value={ingredient.id} key={ingredient.id}>
                    {" "}
                    {ingredient.ingredient_name}{" "}
                  </option>
                ))}
            </Form.Select>
            <ContainerItem
              edit={true}
              id="edit_ingredient_container1"
              containerName="ingredient_container1"
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="OwnRecipes.TeaInput">
          <div className={textContainerClasses}>Składnik #2</div>
          <div className="edit_containers_bar_select">
            <Form.Select
              onChange={(e) => setIngredient2(parseInt(e.target.value))}
              className="edit_containers_select"
            >
              <option
                value={
                  ingContainer2.ingredient !== null
                    ? ingContainer2.ingredient.id
                    : null
                }
              >
                {ingContainer2.ingredient !== null
                  ? ingContainer2.ingredient.ingredient_name
                  : null}
              </option>
              {ingredients
                .filter((ingredient) =>
                  ingContainer2.ingredient !== null
                    ? ingredient.id !== ingContainer2.ingredient.id
                    : true
                )
                .map((ingredient) => (
                  <option value={ingredient.id} key={ingredient.id}>
                    {" "}
                    {ingredient.ingredient_name}{" "}
                  </option>
                ))}
            </Form.Select>
            <ContainerItem
              edit={true}
              id="edit_ingredient_container2"
              containerName="ingredient_container2"
            />
          </div>
        </Form.Group>
        <Button type="submit" id="edit_containers_btn">
          {" "}
          Zapisz{" "}
        </Button>
      </Form>
    </div>
  );
}

export default EditContainers;

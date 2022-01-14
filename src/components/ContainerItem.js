import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useEffect } from "react";
import { MAX_TEA, MAX_ING, MAX_WATER } from "../constans/Constans";
var classNames = require("classnames");

function ContainerItem({ id, containerName, edit = false }) {
  const container = useSelector((state) => state.main[containerName]);
  const [name, setName] = useState("");
  const [fill, setFill] = useState(0);

  useEffect(() => {
    if ("ingredient" in container) {
      if (container.ingredient === null) {
        setName("Pusty");
        setFill(0);
      } else {
        setName(container.ingredient.ingredient_name);
        setFill(
          parseInt((container.ammount / container.ingredient.density / MAX_ING) * 100)
        );
      }
    } else if ("tea" in container) {
      if (container.tea === null) {
        setName("Pusty");
        setFill(0);
      } else {
        setName(container.tea.tea_name);
        setFill(parseInt((container.ammount / container.tea.density / MAX_TEA) * 100));
      }
    } else {
      setName("Woda");
      setFill(parseInt((container.ammount / 0.997 / MAX_WATER) * 100));
    }
  }, [container]);

  let barClasses = classNames(
    {
      edit_bar: edit,
      water_bar: id.includes("water"),
      tea_bar: id.includes("tea"),
      ing_bar: id.includes("ingredient"),
    },
    "bar"
  );

  let fixedBarClasses = classNames({
    fixed_bar: !edit,
    edit_container_fixed_bar: edit,
  });

  let containerClasses = classNames({
    container_status: !edit,
    edit_container_status: edit,
  });

  let textClasses = classNames("bar_name");

  return (
    <div id={id} className={containerClasses}>
      <div className={fixedBarClasses}>
        <div
          id={id + "_bar"}
          className={barClasses}
          style={{ width: `${fill}%` }}
        ></div>
      </div>
      {!edit ? <div className={textClasses}>{name}</div> : null}
    </div>
  );
}

export default ContainerItem;

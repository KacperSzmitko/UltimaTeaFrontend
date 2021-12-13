import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useEffect } from "react";

var classNames = require("classnames");

function ContainerItem({ id, containerName }) {
  const container = useSelector((state) => state.main[containerName]);
  const [name, setName] = useState("");
  const MAX_TEA = 200;
  const MAX_ING = 200;
  const MAX_WATER = 1000;
  const [fill, setFill] = useState(0)

  useEffect(() => {
    if ("ingredient" in container) {
      setName(container.ingredient.ingredient_name);
      setFill(container.ammount / MAX_ING * 100)
    } else if ("tea" in container) {
      setName(container.tea.tea_name);
      setFill(container.ammount / MAX_TEA * 100)
    } else {
      setName("Woda");
      setFill(container.ammount / MAX_WATER * 100)
    }
  }, [container]);

  let barClasses = classNames("bar", {
    water_bar: id.includes("water"),
    tea_bar: id.includes("tea"),
    ing_bar: id.includes("ingredient"),
  });

  let fixedBarClasses = classNames("fixed_bar");

  let containerClasses = classNames("container_status");

  let textClasses = classNames("bar_name")

  return (
    <div id={id} className={containerClasses}>
      <div className={fixedBarClasses}>
        <div
          id={id + "_bar"}
          className={barClasses}
          style={{ width: `${fill}%` }}
        ></div>
      </div>
      <div className={textClasses}>{name}</div>
    </div>
  );
}

export default ContainerItem;

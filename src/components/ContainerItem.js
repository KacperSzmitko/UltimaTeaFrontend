import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useEffect } from "react";

function ContainerItem(props) {
  const container = useSelector((state) => state.main[props.containerName]);
  const [name, setName] = useState("");

  useEffect(() => {
    if ("ingredient" in container) {
      setName(container.ingredient.ingredient_name);
    } else if ("tea" in container) {
      setName(container.tea.tea_name);
    } else {
      setName("Woda");
    }
  }, [container]);

  return (
    <div id={props.id}>
      {name}
      <div id={props.id + "_bar"}>{container.ammount}</div>
    </div>
  );
}

export default ContainerItem;

import ContainerItem from "./ContainerItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateContainers } from "../actions/mainWindowsActions";
import React, { useState } from "react";

function Containers() {
  const dispach = useDispatch();
  const [initUpdate, setInitUpdate] = useState(true);

  useEffect(() => {
    if (initUpdate) {
      dispach(updateContainers());
      setInitUpdate(false);
    }
    const id = setInterval(() => {
      dispach(updateContainers());
    }, 7000);

    return () => clearInterval(id);
  }, [dispach, initUpdate]);

  return (
    <div id="machine_containers">
      <ContainerItem id="water_container" containerName="water_container" />
      <ContainerItem id="tea_container1" containerName="tea_container1" />
      <ContainerItem id="tea_container2" containerName="tea_container2" />
      <ContainerItem
        id="ingredient_container1"
        containerName="ingredient_container1"
      />
      <ContainerItem
        id="ingredient_container2"
        containerName="ingredient_container2"
      />
    </div>
  );
}

export default Containers;

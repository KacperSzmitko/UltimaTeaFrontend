import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMachine } from "../actions/mainWindowsActions";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TEA_DONE } from "../actions/types";
import { keyframes } from "styled-components";
var classNames = require("classnames");

function Statuses() {
  const dispach = useDispatch();
  const machine_status = useSelector(
    (state) => state.main.machine.machine_status
  );
  const tea_making_status = useSelector(
    (state) => state.main.machine.state_of_the_tea_making_process
  );
  const making_recipe = useSelector(
    (state) => state.main.making_recipe
  );
  const [initUpdate, setInitUpdate] = useState(true);

  useEffect(() => {
    if (initUpdate) {
      dispach(getMachine());
      setInitUpdate(false);
    }
    if (tea_making_status === 5) {
      dispach({ type: TEA_DONE });
    }
    const id = setInterval(() => {
      dispach(getMachine());
    }, 7000);

    return () => clearInterval(id);
  }, [dispach, initUpdate, tea_making_status]);

  const machineStatusClasses = classNames(
    {
      machine_on: machine_status,
      machine_off: !machine_status,
    },
    "machine_status_dot"
  );

  const teaMakingStatusClasses = classNames(
    "loader"
  );

    const make_spin = (prev, next) => keyframes`
    0% {
        transform : rotate(${prev}0deg)
    }
    100% {
        transform : rotate(${next}deg)
    }
`;

    const tea_status_msg = () => {
        switch (tea_making_status){
        case 1:
            return "Wysłano przepis"
        case 2:
            return "Parzenie"
        case 3:
            return "Dodawanie składników"
        case 4:
            return "Mieszanie"
        case 5:
            return "Herbata gotowa"
        default:
            return "Oczekiwanie"
    }
    }


  return (
    <div id="statuses">
      <div className="machine_status">
        <div className={machineStatusClasses}></div>
        Maszyna
      </div>
      <div className="tea_making_status">
        <div className={teaMakingStatusClasses}></div>
        {tea_status_msg()}
      </div>
    </div>
  );
}

export default Statuses;

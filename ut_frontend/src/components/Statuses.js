import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMachine } from "../actions/mainWindowsActions";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TEA_DONE } from "../actions/types";
import StatusDotSet from "./StatusDotSet";
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

  const tea_dots = () => {
    switch (tea_making_status) {
      case 1:
        return (
          <div className="tea_making_status">
            <StatusDotSet filled_dots={1} />
            Wysłano przepis
          </div>
        );
      case 2:
        return (
          <div className="tea_making_status">
            <StatusDotSet filled_dots={2} />
            Parzenie
          </div>
        );
      case 3:
        return (
          <div className="tea_making_status">
            <StatusDotSet filled_dots={3} />
            Dodawanie składników
          </div>
        );
      case 4:
        return (
          <div className="tea_making_status">
            <StatusDotSet filled_dots={4} />
            Mieszanie
          </div>
        );
      case 5:
        return (
          <div className="tea_making_status">
            <StatusDotSet filled_dots={5} />
            Herbata gotowa
          </div>
        );
      default:
        return (
          <div className="tea_making_status">
            <StatusDotSet />
            Oczekiwanie
          </div>
        );
    }
  };

  return (
    <div id="statuses">
      <div className="machine_status">
        <div className={machineStatusClasses}></div>
        Maszyna
      </div>
      {tea_dots()}
    </div>
  );
}

export default Statuses;

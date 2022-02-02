import React from "react";
import StatusDot from "./StatusDot";

function StatusDotSet({ filled_dots = 0 }) {
  return (
    <div id="status_dots">
      {[1, 2, 3, 4, 5].map((num, index) =>
        filled_dots > index ? (
          <div key={index}>
            {" "}
            <StatusDot fill={true} />
          </div>
        ) : (
          <div key={index}>
            <StatusDot fill={false} />
          </div>
        )
      )}
    </div>
  );
}

export default StatusDotSet;

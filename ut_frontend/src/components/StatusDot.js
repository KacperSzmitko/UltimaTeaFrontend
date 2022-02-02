import React from 'react';
var classNames = require("classnames");

function StatusDot({fill = false}) {
  const dotClasses = classNames({full_dot: fill, empty_dot: !fill}, "status_dot")

  return <div className={dotClasses}></div>;
}

export default StatusDot;

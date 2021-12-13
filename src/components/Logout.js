import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions";

var classNames = require("classnames");

export default function Logout() {
  const navigate = useNavigate();
  const dispach = useDispatch();
  const classes = classNames("nav_item");
  const btnClasses = classNames("nav_button")
  
  function onClick() {
    dispach(logout());
    navigate("/");
  }

  return (
    <div id="logout_container" className={classes}>
      <Button onClick={() => onClick()} className={btnClasses}>
        Wyloguj się
      </Button>
    </div>
  );
}

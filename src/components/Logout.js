import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions";

export default function Logout() {
  const navigate = useNavigate();
  const dispach = useDispatch();

  function onClick() {
      console.log("F");
    dispach(logout());
    navigate("/");
  }

  return (
    <div>
      <Button onClick={() => onClick()}>Wyloguj się</Button>
    </div>
  );
}

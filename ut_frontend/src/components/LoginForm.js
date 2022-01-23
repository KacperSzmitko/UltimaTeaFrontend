import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../actions/authActions";
import {
  NOTIFY,
} from "../actions/types";

//var classNames = require("classnames");

export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispach = useDispatch();

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    let response = await dispach(login(email, password));
    if (response.status === 200) navigate("app/make_tea");
    else dispach({ type: NOTIFY, data: "Błędny login lub hasło"});//console.log("Niezalogowano");
  }

  return (
    <div>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="Login.EmailInput">
          <Form.Label>Adres e-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={(e) => onEmailChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Login.PasswordInput">
          <Form.Label>Hasło</Form.Label>
          <Form.Control type="password" onChange={(e) => onPasswordChange(e)} />
        </Form.Group>
        <Button type="submit">Zaloguj się</Button>
      </Form>
    </div>
  );
}

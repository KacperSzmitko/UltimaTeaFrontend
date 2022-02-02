import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { reset_password } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

//var classNames = require("classnames");

export default function ResetPasswordForm(props) {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    async function onSubmit(e) {
      e.preventDefault();
      dispatch(reset_password({ email: email }));
      navigate("/");
      //const x = await dispatch(reset_password({ email: email }));
    }

    return (
      <div className="resetContainer">
        <Form className="resetForm" onSubmit={(e) => onSubmit(e)}>
          <Form.Group className="mb-3" controlId="ChangePassword.EmailInput">
            <Form.Label className="inputLabel">Adres e-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Wyślij link autoryzacyjny</Button>
        </Form>
        <Link to="/">
          <Button className="returnButton">
            Powrót do strony głównej
          </Button>
        </Link>
      </div>
    );
  }


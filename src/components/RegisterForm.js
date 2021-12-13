import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { register } from "../actions/authActions";

var classNames = require("classnames");

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRePasswordChange = this.onRePasswordChange.bind(this);
    this.onMachineChange = this.onMachineChange.bind(this);

    this.state = {
      isPasswordValid: false,
      passwordSpecialCharacter: false,
      passwordBigLetter: false,
      passwordLength: false,
      passwordDigit: false,
      rePasswordValid: false,
      email: "",
    };
  }

  onSubmit(e) {
    e.preventDefault();
    if (
      this.state.passwordSpecialCharacter &&
      this.state.passwordBigLetter &&
      this.state.passwordLength &&
      this.state.passwordDigit &&
      this.state.rePasswordValid
    ) {
      if (this.state.email !== "") {
        if (this.state.machine !== "") {
          this.props.register({
            email: this.state.email,
            password: this.state.password,
            machine: this.state.machine,
          });
        }
        else{
            console.log("ID mszyny jest wymagane");
        }
      } else {
        console.log("Email jest wymagany");
      }
    } else {
      console.log("Hasło nie spełnia wymagań");
    }
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  onMachineChange(e) {
    this.setState({ machine: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value }, () => this.validatePassword());
  }

  onRePasswordChange(e) {
    this.setState({ rePassword: e.target.value }, () =>
      this.validateRePassword()
    );
  }

  validateRePassword() {
    if (this.state.password === this.state.rePassword) {
      this.setState({ rePasswordValid: true });
    } else {
      this.setState({ rePasswordValid: false });
    }
  }

  validatePassword() {
    if (
      this.state.password.match(
        "(?=.*[?!.!\"#%&'()*+,-./:<>=?@\\[\\]^_{}|~$])"
      ) != null
    ) {
      this.setState({ passwordSpecialCharacter: true });
    } else {
      this.setState({ passwordSpecialCharacter: false });
    }

    if (this.state.password.length >= 8) {
      this.setState({ passwordLength: true });
    } else {
      this.setState({ passwordLength: false });
    }

    if (this.state.password.match("(?=.*[A-Z])")) {
      this.setState({ passwordBigLetter: true });
    } else {
      this.setState({ passwordBigLetter: false });
    }

    if (this.state.password.match("(?=.*[0-9])")) {
      this.setState({ passwordDigit: true });
    } else {
      this.setState({ passwordDigit: false });
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.Group className="mb-3" controlId="Register.EmailInput">
            <Form.Label>Adres e-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={this.onEmailChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Register.MachineInput">
            <Form.Label>Id maszyny</Form.Label>
            <Form.Control
              type="text"
              placeholder="Id twojej maszyny"
              onChange={this.onMachineChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Register.PasswordInput">
            <Form.Label>Hasło</Form.Label>
            <Form.Control type="password" onChange={this.onPasswordChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Register.RePasswordInput">
            <Form.Label>Hasło</Form.Label>
            <Form.Control type="password" onChange={this.onRePasswordChange} />
          </Form.Group>
          <Button type="submit">Zaloguj się</Button>
        </Form>
      </div>
    );
  }
}

export default connect(null, { register })(RegisterForm);

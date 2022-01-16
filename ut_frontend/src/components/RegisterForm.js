import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { register } from "../actions/authActions";

const PASSSWORD_MIN_LEN = 8;

//var classNames = require("classnames");

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRePasswordChange = this.onRePasswordChange.bind(this);
    this.onMachineChange = this.onMachineChange.bind(this);

    this.userInputErrors = "";

    this.state = {
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
    this.setState({ password: e.target.value }, () => {
      this.validatePassword();
    });
    
  }

  onRePasswordChange(e) {
    this.setState({ rePassword: e.target.value }, () => {
      this.validateRePassword();
    });
    
  }

  validateRePassword() {
    if (this.state.password === this.state.rePassword) {
      this.setState({ rePasswordValid: true }, () => this.validateInputErrors());
    } else {
      this.setState({ rePasswordValid: false }, () => this.validateInputErrors());
    }
  }

  validatePassword() {
    if (
      this.state.password.match(
        "(?=.*[?!.!\"#%&'()*+,-./:<>=?@\\[\\]^_{}|~$])"
      ) != null
    ) {
      var passwordSpecialCharacter = true;
    } else {
      var passwordSpecialCharacter = false;
    }

    if (this.state.password.length >= PASSSWORD_MIN_LEN) {
      var passwordLength = true;
    } else {
      var passwordLength = false;
    }

    if (this.state.password.match("(?=.*[A-Z])")) {
      var passwordBigLetter = true;
    } else {
      var passwordBigLetter = false;
    }

    if (this.state.password.match("(?=.*[0-9])")) {
      var passwordDigit = true;
    } else {
      var passwordDigit = false;
    }

    this.setState(
      {
        passwordSpecialCharacter: passwordSpecialCharacter, 
        passwordLength: passwordLength, 
        passwordBigLetter: passwordBigLetter,
        passwordDigit: passwordDigit
      },
      () => this.validateInputErrors()
    );
  }

  validateInputErrors() {

    this.userInputErrors = "";

    if (!this.state.passwordSpecialCharacter) {
      this.userInputErrors += "<div>Hasło musi posiadać znak specjalny</div>";
    }

    if (!this.state.passwordBigLetter) {
      this.userInputErrors += "<div>Hasło musi zawierać dużą literę</div>";
    }

    if (!this.state.passwordLength) {
      this.userInputErrors += "<div>Hasło musi być dłuższe niż " + PASSSWORD_MIN_LEN + " znaków</div>";
    }

    if (!this.state.passwordDigit) {
      this.userInputErrors += "<div>Hasło musi zawierać cyfrę</div>";
    }

    if (!this.state.rePasswordValid) {
      this.userInputErrors += "<div>Powtórzone hasło nie jest takie samo</div>";
    }
    this.forceUpdate();
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
          <div dangerouslySetInnerHTML={{__html: this.userInputErrors}}></div>
          <Button type="submit">Zarejestruj się</Button>
        </Form>
      </div>
    );
  }
}

export default connect(null, { register })(RegisterForm);

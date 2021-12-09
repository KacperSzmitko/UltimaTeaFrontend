import React, { Component } from 'react'
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../actions/authActions";

export class LoginForm extends Component {

    constructor(props){
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
          email: "",
          password: ""
        }
    }

    onEmailChange(e){
        this.setState({email: e.target.value})
    }

    onPasswordChange(e){
      this.setState({ password: e.target.value });
    }

    async onSubmit(e){
        e.preventDefault();
        let response = await this.props.login(this.state.email, this.state.password);
        if (response.status === "OK") console.log(response)
        else console.log(response.data)

    }

    render() {
        return (
          <div>
            <Form onSubmit={this.onSubmit}>
              <Form.Group className="mb-3" controlId="Login.EmailInput">
                <Form.Label>Adres e-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={this.onEmailChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Login.PasswordInput">
                <Form.Label>Hasło</Form.Label>
                <Form.Control
                  type="password"
                  onChange={this.onPasswordChange}
                />
              </Form.Group>
              <Button type="submit">Zaloguj się</Button>
            </Form>
          </div>
        );
    }
}


export default connect(null, { login })(LoginForm);

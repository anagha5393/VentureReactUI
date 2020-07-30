import React from 'react'
import { Button, Form, Table } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { fbapp } from '..'


class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)

  }

  handleChange(e, { name, value }) {
    // console.log(name, value);
    this.setState({
      [name]: value
    })
  }

  handleClick() {
    const { email, password } = this.state
    fbapp.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        setTimeout(() => {
          this.setState({
            redirect: true
          })
        }, 100);
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log(error);
        // ...
      });
  }

  render() {
    if (this.state.redirect) {
      console.log(window.token);
      return <Redirect push to="/" />
    }
    return (
      <Form>
        <Form.Input
          // error
          fluid
          label='Username'
          placeholder='Username'
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        // id='form-input-first-name'
        />
        <Form.Input
          fluid
          label='Password'
          placeholder='Password'
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleClick}>Submit</Button>
      </Form>
    )
  }
}

export default Login
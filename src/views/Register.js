import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { serverApiRoute } from '../App'
import axios from 'axios'
import { Redirect } from 'react-router'
import { fbapp } from '..'

var qs = require('querystringify');

export class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e, { name, value }) {
    // console.log(name, value);
    this.setState({
      [name]: value
    })
  }

  handleSubmit() {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const email = this.state.email
    const password = this.state.password
    const userData = this.state;
    delete userData.redirect
    if (email.length > 0 && password.length > 0) {
      axios.post(serverApiRoute('signup'), qs.stringify(userData), config)
        .then((json) => {
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

        })
    }
  }

  render() {
    // console.table(this.state)
    if (this.state.redirect) {
      console.log(window.token);
      return <Redirect push to="/" />
    }
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            // id='form-subcomponent-shorthand-input-first-name'
            name="first_name"
            label='First name'
            placeholder='First name'
            value={this.state.first_name}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            // id='form-subcomponent-shorthand-input-last-name'
            name="last_name"
            label='Last name'
            placeholder='Last name'
            value={this.state.last_name}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            // id='form-subcomponent-shorthand-input-first-name'
            label='Email ID'
            name="email"
            placeholder='Email ID'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            // id='form-subcomponent-shorthand-input-last-name'
            label='Password'
            placeholder='Password'
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            // id='form-subcomponent-shorthand-input-first-name'
            label='Address 1'
            placeholder='Address 1'
            name="address_1"
            value={this.state.address_1}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            // id='form-subcomponent-shorthand-input-last-name'
            label='Address 2'
            placeholder='Address 2'
            name="address_2"
            value={this.state.address_2}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            // id='form-subcomponent-shorthand-input-first-name'
            label='City'
            placeholder='City'
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            // id='form-subcomponent-shorthand-input-last-name'
            label='State'
            placeholder='State'
            name="state"
            value={this.state.state}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            // id='form-subcomponent-shorthand-input-last-name'
            label='Zipcode'
            placeholder='Zipcode'
            name="zipcode"
            value={this.state.zipcode}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            // id='form-subcomponent-shorthand-input-last-name'
            label='Country'
            placeholder='Country'
            name="country"
            value={this.state.country}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    )
  }
}

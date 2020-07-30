import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import {
  DateInput,
  TimeInput
} from 'semantic-ui-calendar-react';
import axios from 'axios'
import { serverApiRoute } from '../App';
import { Redirect } from 'react-router'
var qs = require('querystringify');


class NewActivity extends React.Component {
  constructor() {
    super()
    this.state = {
      activity_topic: "",
      activity_name: "",
      activity_host: "",
      activity_date: "",
      activity_time: "",
      activity_loc: "",
      activity_details: "",
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
    const activity = this.state
    activity.host_id = window.uid
    delete activity.redirect
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': window.token
      }
    }
    axios.post(serverApiRoute('activities'), qs.stringify(activity), config)
      .then(res => {
        this.setState({
          redirect: true
        })
        console.log(res);
      })
  }

  render() {
    if (this.state.redirect) {
      console.log(window.token);
      return <Redirect push to="/up_activities" />
    }
    // console.table(this.state);
    return (
      <Form>
        <Form.Input
          // error
          fluid
          label='Topic'
          placeholder='Topic'
          name="activity_topic"
          value={this.state.activity_topic}
          onChange={this.handleChange}
        // id='form-input-first-name'
        />
        <Form.Input
          fluid
          label='Activity Name'
          placeholder='Activity Name'
          name="activity_name"
          value={this.state.activity_name}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label='Host Name'
          placeholder='Host Name'
          name="activity_host"
          value={this.state.activity_host}
          onChange={this.handleChange}
        />
        <DateInput
          fluid
          label="Date"
          name="activity_date"
          placeholder="Date"
          value={this.state.activity_date}
          iconPosition="left"
          onChange={this.handleChange}
        />
        <TimeInput
          fluid
          label="Time"
          name="activity_time"
          placeholder="Time"
          value={this.state.activity_time}
          iconPosition="left"
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label='Location'
          placeholder='Location'
          name="activity_loc"
          value={this.state.activity_loc}
          onChange={this.handleChange}
        />
        <Form.TextArea
          label='Activity Details'
          placeholder='Activity Details'
          name="activity_details"
          value={this.state.activity_details}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleClick}>Submit</Button>
      </Form>
    )
  }

}

export default NewActivity
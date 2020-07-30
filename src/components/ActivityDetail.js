import React from 'react'
import { Button } from 'semantic-ui-react'
import { Redirect } from 'react-router'
import { serverApiRoute } from '../App'
import axios from 'axios'

var qs = require('querystringify');
export class ActivityDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  handleSubmit(rsvp) {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': window.token
      }
    }
    if (!window.uid) {
      return
    }
    const userData = {
      uid: window.uid,
      rsvp
    }
    axios.post(serverApiRoute(`activity/${this.props.activity.activity_id}`), qs.stringify(userData), config)
      .then(() => {
        this.setState({
          redirect: true
        })
      })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/my_activities" />
    }
    return (
      <div>
        This is activity detail {this.props.activity.activity_id}
        <div>
          <Button onClick={() => this.handleSubmit("Yes")}>Yes</Button>
          <Button onClick={() => this.handleSubmit("No")}>No</Button>
          <Button onClick={() => this.handleSubmit("Maybe")}>Maybe</Button>
        </div>
      </div>
    )
  }

}

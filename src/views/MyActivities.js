import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { ActivityDetail } from '../components/ActivityDetail'
import axios from 'axios'
import { serverApiRoute } from '../App'



export class MyActivities extends React.Component {
  constructor() {
    super()
    this.state = {
      activities: []
    }
  }

  componentDidMount() {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': window.token
      }
    }
    if (!window.uid) {
      return
    }
    axios.get(`${serverApiRoute('myActivity')}?uid=${window.uid}`, config)
      .then(res => {
        this.setState({
          activities: res.data.activities
        })
      })
  }

  render() {
    // console.log(this.state.activities);
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Event</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            {/* <Table.HeaderCell>Attending</Table.HeaderCell> */}
            <Table.HeaderCell>RSVP</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.activities.map(act =>
            (<Table.Row key={act.id}>
              <Table.Cell>{act.activity_name}</Table.Cell>
              <Table.Cell>{act.activity_topic}</Table.Cell>
              <Table.Cell>{act.rsvp}</Table.Cell>
            </Table.Row>))}
        </Table.Body>
      </Table>
    )
  }
}
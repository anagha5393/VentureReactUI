import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'
// import { List } from 'semantic-ui-react'
import axios from 'axios'

import { ActivityList } from '../components/ActivityList'
import { ActivityDetail } from '../components/ActivityDetail'
import { serverApiRoute } from '../App'
// import {ActivityList} from '../components/ActivityList'

class UpcomingActivities extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
    // this.displayActivities = this.displayActivities.bind(this)
  }

  componentDidMount() {
    axios.get(serverApiRoute('activities'))
      .then(data => {
        this.setState({
          data: data.data
        })
      })
  }


  render() {
    return (
      <div>
        <p>These are the upcoming activities</p>
        <div>
          <Router basename="up_activities">
            <Route
              path="/"
              exact render={() => <ActivityList data={this.state.data} />}
            />
            <Route
              path={`/activity_detail/:activityId`}
              exact render={(props) => {
                const activity = this.state.data.filter(data => data.activity_id === props.match.params.activityId)

                return (
                  <ActivityDetail activity={activity[0]} />
                )
              }
              }
            >
            </Route>
          </Router>
        </div>
      </div>
    )
  }
}

export default UpcomingActivities
import React from 'react'
import { List } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'

import { ActivityDetail } from './ActivityDetail'

export function ActivityList(props) {
  return (
    <List bulleted>
      {props.data.map(activity =>
        <div key={activity.activity_id}>
          <List.Item
            as={Link}
            to={`/activity_detail/${activity.activity_id}`}
            name={activity.activity_name}
          >
            {activity.activity_name}
          </List.Item>
        </div>
      )}
    </List>
  )
}
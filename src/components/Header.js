import React from 'react'
import logo from '../assets/images/hills.png'
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'
import Home from '../views/Home'
import UpcomingActivities from '../views/UpcomingActivities'
import NewActivity from '../views/NewActivity'
import Contact from '../views/Contact'
import About from '../views/About'
import Login from '../views/Login'
import { Register } from '../views/Register'
import { MyActivities } from '../views/MyActivities'
import { Menu } from 'semantic-ui-react'
import { fbapp } from '..'


class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      activeItem: ""
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e, { name }) {
    this.setState({
      activeItem: name
    })


  }

  render() {
    return (
      <div>
        <Router>
          <Menu>
            <Menu.Item
              as={Link}
              to="/"
              name="Home"
              onClick={this.handleItemClick}
              active={this.state.activeItem === "Home"}
            >
              HOME
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/up_activities"
              name="UpcomingActivities"
              active={this.state.activeItem === "UpcomingActivities"}
              onClick={this.handleItemClick}
            >
              UPCOMING ACTIVITIES
            </Menu.Item>
            {window.user && <Menu.Item
              as={Link}
              to="/new_activity"
              name="NewActivity"
              active={this.state.activeItem === "NewActivity"}
              onClick={this.handleItemClick}
            >
              START NEW ACTIVITY
            </Menu.Item>}
            <Menu.Item
              as={Link}
              to="/contact"
              name="Contact"
              active={this.state.activeItem === "Contact"}
              onClick={this.handleItemClick}
            >
              CONTACT
          </Menu.Item>
            <Menu.Item
              as={Link}
              to="/about"
              name="About"
              active={this.state.activeItem === "About"}
              onClick={this.handleItemClick}
            >
              ABOUT
          </Menu.Item>

            {!window.user ? <><Menu.Item
              as={Link}
              to="/signIn"
              name="Login"
              active={this.state.activeItem === "Login"}
              onClick={this.handleItemClick}
            >
              LOGIN
          </Menu.Item>
              <Menu.Item
                as={Link}
                to="/register"
                name="Register"
                active={this.state.activeItem === "Register"}
                onClick={this.handleItemClick}
              >
                REGISTER
          </Menu.Item></> :
              <><Menu.Item
                as={Link}
                to="/my_activities"
                name="My Activities"
                active={this.state.activeItem === "MyActivities"}
                onClick={this.handleItemClick}
              >
                MY ACTIVITIES
  </Menu.Item><Menu.Item
                  as={Link}
                  to="/logout"
                  name="Logout"
                  active={this.state.activeItem === "Logout"}
                  onClick={this.handleItemClick}
                >
                  LOGOUT
    </Menu.Item></>}


          </Menu>
          <br></br>
          <Route
            path="/"
            exact render={Home}
          />
          <Route
            path="/up_activities"
            exact render={() => <UpcomingActivities />}
          />
          <Route
            path="/new_activity"
            exact render={() => <NewActivity />}
          />
          <Route
            path="/contact"
            exact render={() => <Contact />}
          />
          <Route
            path="/about"
            exact render={() => <About />}
          />
          <Route
            path="/signIn"
            exact render={() => <Login />}
          />
          <Route
            path="/register"
            exact render={() => <Register />}
          />
          <Route
            path="/logout"
            exact render={() => {
              fbapp.auth().signOut();
              return <Login />
            }}
          />
          <Route
            path="/my_activities"
            exact render={() => <MyActivities />}
          />
        </Router>
      </div>
    )
  }
}

export default Header
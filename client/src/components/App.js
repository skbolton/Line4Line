import React from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Lobby from './Lobby'
import Profile from './Profile'
import Story from './Story'
import CreateStory from './CreateStory'
import NavBar from './NavBar'
import Welcome from './Welcome'
import FinishedStories from './FinishedStories'


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: false
    }
  }

  componentDidMount () {
    //Make and initial get request to sign the user in with Facebook
    //This current user will be used in many places throughout the app.
    $.get('/user')
    .then(user => {
      this.setState({
        currentUser: user
      })
    })
    .catch(err => {
      console.log('App.js - No user is signed in:', err)
    })
  }

  render () {
    return (
      <div className="">
        <NavBar
          currentUser={this.state.currentUser}
        />
        {
        //if there is a current user, render the lobby/story with react router
        //else tell the user to login
        this.state.currentUser ?
        <Router history={hashHistory} >
          <Route path='/' component={Lobby} user={this.state.currentUser} />
          <Route path='/stories/:id' component={Story} user={this.state.currentUser} />
          <Route path='/user/:id' component={Profile} />
          <Route path='/stories/finished' component={FinishedStories} />
        </Router>
        :
        <Welcome />
        }
      </div>
    )
  }
}

export default App

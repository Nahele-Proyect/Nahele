import React, { Component } from 'react';
import './App.css';

import Navbar from './components/ui/Navbar'

import { Switch, Route, Redirect } from "react-router-dom"

import AuthServices from './services/auth.service'
import Profile from './components/pages/Profile/Profile'

class App extends Component {
  constructor() {
    super()
    this.state = { loggedInUser: false }
    this.services = new AuthServices()
  }

  componentDidUpdate = (prevProps, prevState) => console.log('El estado de app  se ha actualizado', this.state)

  componentDidMount = () => this.fetchUser()

  setTheUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    this.services.loggedin()
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }

  render() {
    return (
      <>
        <Navbar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        {<Switch>
          <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
        </Switch>}
      </>
    )
  }
}


export default App

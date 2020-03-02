import React, { Component } from 'react';
import './App.css';

import Navbar from './components/ui/Navbar'



// import Chat from './components/Chat/Chat';
// import Join from './components/Join/Join';
// import { Switch, Route } from "react-router-dom";


import AuthServices from './services/auth.services'
// import SignupForm from './components/Form/FormSignupModal';

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

        {/* <Switch>
          <Route path="/join" exact component={Join} />
          <Route path="/chat" component={Chat} />
        </Switch> */}
        <h1>Hellooo</h1>
      </>
    )
  }
}


export default App

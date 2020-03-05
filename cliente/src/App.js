import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import './App.css'

import AuthServices from './services/auth.service'

import Navbar from './components/ui/Navbar'
import Profile from './components/pages/Profile/Profile'
import Index from './components/pages/Index/index'
import Details from './components/pages/Details/Details'
import Chat from './components/ChatComponent/Chat/Chat';
import Join from './components/ChatComponent/Join/Join';



// import BasicChart from './components/Charts/basicChart/BasicChart'

class App extends Component {
  constructor() {
    super()

    this.state = { loggedInUser: false }
    this.AuthServices = new AuthServices()
  }

  componentDidUpdate = () => console.log('El estado de app  se ha actualizado', this.state)

  componentDidMount = () => {
    this.fetchUser()
  }

  setTheUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    this.AuthServices.loggedin()
      .then(theUser => theUser.status === 'fail' ? this.setState({ loggedInUser: false }) : this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }

  render() {
    return (
      <>
        <Navbar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        {<Switch>
          {/* <Route exact path='/' render={ () => <BasicChart /> } /> */}
          <Route exact path='/' render={() => <Index {...this.state.loggedInUser} />} />
          <Route path='/details/:link' render={props => <Details {...props} />} />
          <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />




          <Route path="/join" render={() => <Join loggedInUser={this.state.loggedInUser} />} />
          <Route path="/chat" render={props => <Chat {...props} loggedInUser={this.state.loggedInUser} />} />

        </Switch>}
      </>
    )
  }
}


export default App

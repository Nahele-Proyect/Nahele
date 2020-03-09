import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import './App.css'

import AuthServices from './services/auth.service'

import Navbar from './components/ui/Navbar'
import Profile from './components/pages/Profile/Profile'
import Index from './components/pages/Index/index'
import Details from './components/pages/Details/Details'
import Chat from './components/ChatComponent/Chat/Chat'
import Join from './components/ChatComponent/Join/Join'
import Map from './components/GoogleMaps/GoogleMaps'
import Calendar from './components/Calendar/Calendar'


import BasicChart from './components/Charts/basicChart/BasicChart'

class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInUser: undefined
    }
    this.AuthServices = new AuthServices()
  }

  componentDidUpdate = () => console.log('El estado de app  se ha actualizado', this.state)

  componentDidMount = () => this.fetchUser()


  setTheUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    this.AuthServices.loggedin()
      .then(theUser => theUser.status === 'fail' ? this.setState({ loggedInUser: false }) : this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }

  render() {

    return (
      <>
        {this.state.loggedInUser !== undefined ?
          <>
            <Navbar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

            <Switch>
              <Route exact path='/grafic' render={() => <BasicChart />} />
              <Route exact path='/' render={() => <Index  {...this.state.loggedInUser} />} />
              <Route path='/details/:link' render={props => <Details {...props} />} />
              <Route path='/myPet/:id' render={props => <Details {...props} />} />
              <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} /> : <Redirect to="/" />} />



              {/* rutas andres, chat mapa y calendario */}
              <Route path="/join" render={() => this.state.loggedInUser ? <Join loggedInUser={this.state.loggedInUser} /> : <Redirect to='/' />} />
              <Route path="/chat" render={props => this.state.loggedInUser ? <Chat {...props} loggedInUser={this.state.loggedInUser} /> : <Redirect to='/' />} />
              <Route path="/map" render={props => <Map {...props} />} />
              <Route path="/newCalendar/:id" render={props => <Calendar {...props} loggedInUser={this.state.loggedInUser} fetchUser={this.fetchUser} />} />

            </Switch>
          </>
          :
          <h1>Cargando</h1>
        }
      </>
    )
  }
}


export default App

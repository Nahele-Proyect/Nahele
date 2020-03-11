//Reac imports
import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
//Styling
import './App.css'
//Services
import AuthServices from './services/auth.service'
//Self-made imports
import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer/Footer'
import Profile from './components/pages/Profile/Profile'
import Index from './components/pages/Index/index'
import Details from './components/pages/Details/Details'

import Chat from './components/ChatComponent/Chat/Chat'
import Join from './components/ChatComponent/Join/Join'
import Map from './components/GoogleMaps/GoogleMaps'
import Calendar from './components/Calendar/Calendar'
//Spinner imports
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'


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
        { this.state.loggedInUser !== undefined ?
          <>
            <Navbar setTheUser={ this.setTheUser } loggedInUser={ this.state.loggedInUser } />

            <Switch>
              <Route exact path='/' render={ () => <Index  { ...this.state.loggedInUser } /> } />
              <Route path='/details/:link' render={ props => <Details loggedInUser={ this.state.loggedInUser } setTheUser={ this.setTheUser } { ...props } /> } />
              <Route path='/myPet/:id' render={ props => <Details loggedInUser={ this.state.loggedInUser } setTheUser={ this.setTheUser } { ...props } /> } />
              <Route path="/profile" render={ () => this.state.loggedInUser ? <Profile loggedInUser={ this.state.loggedInUser } setTheUser={ this.setTheUser } /> : <Redirect to="/" /> } />

              <Route path="/join" render={ () => this.state.loggedInUser ? <Join loggedInUser={ this.state.loggedInUser } /> : <Redirect to='/' /> } />
              <Route path="/chat" render={ props => this.state.loggedInUser ? <Chat { ...props } loggedInUser={ this.state.loggedInUser } /> : <Redirect to='/' /> } />
              <Route path="/map" render={ props => <Map { ...props } /> } />
              <Route path="/newCalendar/:id" render={ props => <Calendar { ...props } loggedInUser={ this.state.loggedInUser } fetchUser={ this.fetchUser } /> } />

            </Switch>
            <Footer />
          </>
          :
          <Loader style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' } } type="Rings" color="red" height={ 250 } width={ 250 } timeout={ 10000 } />
        }

      </>
    )
  }
}


export default App

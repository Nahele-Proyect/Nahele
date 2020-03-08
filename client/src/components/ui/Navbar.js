import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import AuthServices from '../../services/auth.service'

import './Navbar.css'
import SignupForm from '../Auth/signup/FormSignupModal'
import LoginForm from '../Auth/login/FormLoginModal'

export default class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModalSignUp: false,
            showModalLogin: false
        }
        this.AuthServices = new AuthServices()
    }

    logout = () => {
        this.AuthServices.logout()
            .then(response => {
                console.log(response)
                this.props.setTheUser(false)
            })
            .catch(err => console.log(err))
    }

    openModalSignUp = () => this.setState({ showModalSignUp: true })
    closeModalSignup = () => this.setState({ showModalSignUp: false })
    openModalLogin = () => this.setState({ showModalLogin: true })
    closeModalLogin = () => this.setState({ showModalLogin: false })

    render() {

        const greeting = this.props.loggedInUser ? <>Bienvenido, { this.props.loggedInUser.username }</> : <>Bienvenido, invitad@</>

        return (

            this.props.loggedInUser ?
                (
                    <Navbar style={ { marginBottom: '25px' } } sticky='top' bg="dark" expand="lg" variant="dark">
                        <Navbar.Brand ><Link className='logo' to="/">Fluffy's Shelter</Link></Navbar.Brand>
                        <Nav.Link as="small" style={ { color: 'white' } }>{ greeting }</Nav.Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/profile">Perfil</Link></Nav.Link>
                                <Nav.Link onClick={ this.logout }>Cerrar sesión</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
                :
                (
                    <>
                        <Navbar bg="dark" expand="lg" variant="dark">
                            <Navbar.Brand as="div"><Link to="/">Fluffy's Shelter</Link></Navbar.Brand>
                            <Nav.Link as="small" style={ { color: 'white' } }>{ greeting }</Nav.Link>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-auto">
                                    <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
                                    <Nav.Link onClick={ this.openModalSignUp }>Registrarte</Nav.Link>
                                    <Nav.Link onClick={ this.openModalLogin }>Entrar</Nav.Link>

                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>

                        <Modal size='sm' centered show={ this.state.showModalSignUp } onHide={ this.closeModalSignup } animation={ true }>
                            <SignupForm setTheUser={ this.props.setTheUser } closeModal={ this.closeModalSignup } />
                        </Modal>
                        <Modal size='sm' centered show={ this.state.showModalLogin } onHide={ this.closeModalLogin } animation={ true }>
                            <LoginForm setTheUser={ this.props.setTheUser } closeModal={ this.closeModalLogin } />
                        </Modal>

                    </>
                )
        )
    }
}

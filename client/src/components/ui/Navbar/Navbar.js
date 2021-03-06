//React imports
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//Bootstrap imports
import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
//Services import
import AuthServices from '../../../services/auth.service'
//Self-made css and components imports
import './Navbar.css'
import SignupForm from '../../Auth/signup/FormSignupModal'
import LoginForm from '../../Auth/login/FormLoginModal'

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
            .then(() => {
                this.props.setTheUser(false)
            })
            .catch(err => console.log(err))
    }

    openModalSignUp = () => this.setState({ showModalSignUp: true })
    closeModalSignup = () => this.setState({ showModalSignUp: false })
    openModalLogin = () => this.setState({ showModalLogin: true })
    closeModalLogin = () => this.setState({ showModalLogin: false })

    render() {

        const greeting = this.props.loggedInUser ? <>Bienvenido, { this.props.loggedInUser.username}</> : <>Bienvenido, invitad@</>

        return (

            this.props.loggedInUser ?
                (
                    <Navbar style={{ background: '#5a2020' }} sticky='top' expand="lg" >
                        <Navbar.Brand ><Link className='logo' to="/">Fluffy's Shelter</Link></Navbar.Brand>
                        <Nav.Link as="small" style={{ color: 'white' }}>{greeting}</Nav.Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link style={{ color: 'white' }} as={Link} to="/">Inicio</Nav.Link>
                                <Nav.Link style={{ color: 'white' }} as={Link} to="/profile">Perfil</Nav.Link>
                                <Nav.Link style={{ color: 'white' }} as={Link} to="/join">Salas de chat</Nav.Link>
                                <Nav.Link style={{ color: 'white' }} as={Link} to='/about'>Sobre Nosotros</Nav.Link>
                                <Nav.Link style={{ color: 'white' }} onClick={this.logout}>Cerrar sesión</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
                :
                (
                    <>
                        <Navbar bg="dark" expand="lg" variant="dark">
                            <Navbar.Brand as="div"><Link to="/">Fluffy's Shelter</Link></Navbar.Brand>
                            <Nav.Link as="small" style={{ color: 'white' }}>{greeting}</Nav.Link>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-auto">
                                    <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
                                    <Nav.Link onClick={this.openModalSignUp}>Registrarte</Nav.Link>
                                    <Nav.Link onClick={this.openModalLogin}>Entrar</Nav.Link>
                                    <Nav.Link as={Link} to='/about' >Sobre Nosotros</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>

                        <Modal size='sm' centered show={this.state.showModalSignUp} onHide={this.closeModalSignup} animation={true}>
                            <SignupForm setTheUser={this.props.setTheUser} closeModal={this.closeModalSignup} />
                        </Modal>
                        <Modal size='sm' centered show={this.state.showModalLogin} onHide={this.closeModalLogin} animation={true}>
                            <LoginForm setTheUser={this.props.setTheUser} closeModal={this.closeModalLogin} />
                        </Modal>

                    </>
                )
        )
    }
}

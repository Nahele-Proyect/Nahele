import React, { Component } from 'react'
import FilesServices from '../../../services/files.service'
import AuthServices from '../../../services/auth.service'
import Modal from 'react-bootstrap/Modal'
import ProfileForm from './UsernameForm/UsernameForm'
import PasswordForm from './PasswordForm/PasswordForm'
import EmailForm from './EmailForm/EmailForm'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.FilesServices = new FilesServices()
        this.AuthServices = new AuthServices()
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            img: "",
            showModalUsername: false,
            showModalPassword: false,
            showModalEmail: false,
        }
    }
    showModalUsername = () => this.setState({ showModalUsername: true })
    showModalPassword = () => this.setState({ showModalPassword: true })
    showModalEmail = () => this.setState({ showModalEmail: true })


    closeModal = () => this.setState({ showModalUsername: false, showModalPassword: false, showModalEmail: false, })

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }
    render() {
        return (
            <>
                <h1>Soy el perfil y tal : 3, {this.props.loggedInUser.username}</h1>

                <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
                    <Dropdown.Item eventKey="1" onClick={this.showModalUsername} >Cambiar nombre de usuario</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={this.showModalPassword}>Cambiar contraseña</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={this.showModalEmail}>Cambiar email</Dropdown.Item>

                </DropdownButton>







                <Modal size='sm' centered show={this.state.showModalUsername} onHide={this.closeModal} animation={true}>
                    <ProfileForm setTheUser={this.props.setTheUser} loggedInUser={this.props.loggedInUser} closeModal={this.closeModal} />
                </Modal>
                <Modal size='sm' centered show={this.state.showModalPassword} onHide={this.closeModal} animation={true}>
                    <PasswordForm setTheUser={this.props.setTheUser} loggedInUser={this.props.loggedInUser} closeModal={this.closeModal} />
                </Modal>
                <Modal size='sm' centered show={this.state.showModalEmail} onHide={this.closeModal} animation={true}>
                    <EmailForm setTheUser={this.props.setTheUser} loggedInUser={this.props.loggedInUser} closeModal={this.closeModal} />
                </Modal>
            </>
        )
    }
}

export default Profile
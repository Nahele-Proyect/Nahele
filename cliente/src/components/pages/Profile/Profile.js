import React, { Component } from 'react'
import FilesServices from '../../../services/files.service'
import AuthServices from '../../../services/auth.service'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProfileForm from './ProfileForm'

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
            showModal: false,
        }
    }
    showModal = () => this.setState({ showModal: true })
    closeModal = () => this.setState({ showModal: false })
    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }
    render() {
        return (
            <>
                <h1>Soy el perfil y tal : 3, {this.props.loggedInUser.username}</h1>
                <Button onClick={this.showModal} >Cambiar perfil</Button>
                <Modal size='sm' centered show={this.state.showModal} onHide={this.closeModal} animation={true}>
                    <ProfileForm setTheUser={this.props.setTheUser} loggedInUser={this.props.loggedInUser} closeModal={this.closeModal} />
                </Modal>
            </>
        )
    }
}



export default Profile
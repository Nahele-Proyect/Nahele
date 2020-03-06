import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Container from 'react-bootstrap/Container'

import FilesServices from '../../../services/files.service'
import AuthServices from '../../../services/auth.service'

import ProfileForm from './UsernameForm/UsernameForm'
import PasswordForm from './PasswordForm/PasswordForm'
import EmailForm from './EmailForm/EmailForm'
import ImgForm from './ImgForm/ImgForm'
import PetForm from './PetForm/PetForm'
import MyDate from './AppointComponent/Appoint'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.FilesServices = new FilesServices()
        this.AuthServices = new AuthServices()
        this.state = {
            showModalUsername: false,
            showModalPassword: false,
            showModalEmail: false,
            showModalImg: false,
            showPetForm: false
        }

    }
    showModalUsername = () => this.setState({ showModalUsername: true })
    showModalPassword = () => this.setState({ showModalPassword: true })
    showModalEmail = () => this.setState({ showModalEmail: true })
    showModalImg = () => this.setState({ showModalImg: true })

    closeModal = () => this.setState({ showModalUsername: false, showModalPassword: false, showModalEmail: false, showModalImg: false })

    petFormChange = () => this.setState({ showPetForm: !this.state.showPetForm })

    render() {
        return (
            <>
                <h1>Soy el perfil y tal : 3, { this.props.loggedInUser.username }</h1>
                <figure><img src={ this.props.loggedInUser.img } alt="Profile Pic" /></figure>


                <Container>
                    <Row className='justify-content-between'>
                        {/* <MyDate {...this.props} /> */ }
                        <Col>
                            <DropdownButton as={ ButtonGroup } title="Dropdown" id="bg-nested-dropdown">
                                <Dropdown.Item eventKey="1" onClick={ this.showModalUsername } >Cambiar nombre de usuario</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={ this.showModalPassword }>Cambiar contraseña</Dropdown.Item>
                                <Dropdown.Item eventKey="3" onClick={ this.showModalEmail }>Cambiar email</Dropdown.Item>
                                <Dropdown.Item eventKey="4" onClick={ this.showModalImg }>Cambiar foto de perfil</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col>

                            <Button onClick={ this.petFormChange }>{ this.state.showPetForm ? 'Ocultar formulario' : 'Mostrar formulario' }</Button>
                        </Col>
                    </Row>

                </Container>

                <Modal size='sm' centered show={ this.state.showModalUsername } onHide={ this.closeModal } animation={ true }>
                    <ProfileForm setTheUser={ this.props.setTheUser } loggedInUser={ this.props.loggedInUser } closeModal={ this.closeModal } />
                </Modal>
                <Modal size='sm' centered show={ this.state.showModalPassword } onHide={ this.closeModal } animation={ true }>
                    <PasswordForm setTheUser={ this.props.setTheUser } loggedInUser={ this.props.loggedInUser } closeModal={ this.closeModal } />
                </Modal>
                <Modal size='sm' centered show={ this.state.showModalEmail } onHide={ this.closeModal } animation={ true }>
                    <EmailForm setTheUser={ this.props.setTheUser } loggedInUser={ this.props.loggedInUser } closeModal={ this.closeModal } />
                </Modal>
                <Modal size='sm' centered show={ this.state.showModalImg } onHide={ this.closeModal } animation={ true }>
                    <ImgForm setTheUser={ this.props.setTheUser } loggedInUser={ this.props.loggedInUser } closeModal={ this.closeModal } />
                </Modal>

                { this.state.showPetForm && <Container ><PetForm petFormChange={ this.petFormChange } petFormChange={ this.petFormChange } setTheUser={ this.props.setTheUser } loggedInUser={ this.props.loggedInUser } /></Container> }

            </>
        )
    }
}

export default Profile
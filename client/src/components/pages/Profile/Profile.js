//React imports
import React, { Component } from 'react'
//Bootstrap imports
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
//Sevices imports
import FilesServices from '../../../services/files.service'
import AuthServices from '../../../services/auth.service'
//self-made componets imports
import ProfileForm from './UsernameForm/UsernameForm'
import PasswordForm from './PasswordForm/PasswordForm'
import EmailForm from './EmailForm/EmailForm'
import ImgForm from './ImgForm/ImgForm'
import PetForm from './PetForm/PetForm'
import MyDate from './myDateComponent/myDate'
import PetList from './PetsList/PetList'




export default class Profile extends Component {
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
        console.log(props)
    }
    //Modal openers handlers
    showModalUsername = () => this.setState({ showModalUsername: true })
    showModalPassword = () => this.setState({ showModalPassword: true })
    showModalEmail = () => this.setState({ showModalEmail: true })
    showModalImg = () => this.setState({ showModalImg: true })
    //Modal closers handlers
    closeModal = () => this.setState({ showModalUsername: false, showModalPassword: false, showModalEmail: false, showModalImg: false })
    //PetForm visibility handler
    petFormChange = () => this.setState({ showPetForm: !this.state.showPetForm })

    render() {
        return (
            <>
                <Container>
                    <DropdownButton as={ ButtonGroup } title="Editar perfil" id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1" onClick={ this.showModalUsername } >Cambiar nombre de usuario</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={ this.showModalPassword }>Cambiar contraseña</Dropdown.Item>
                        <Dropdown.Item eventKey="3" onClick={ this.showModalEmail }>Cambiar email</Dropdown.Item>
                        <Dropdown.Item eventKey="4" onClick={ this.showModalImg }>Cambiar foto de perfil</Dropdown.Item>
                    </DropdownButton>
                    <Row className='justify-content-between' style={ { marginTop: '50px' } }>
                        <Col md={ 6 }>

                            { this.props.loggedInUser.img ?
                                <figure style={ { margin: '0 auto' } } ><Image style={ { objectFit: 'cover', height: '400px', width: '80%' } } src={ this.props.loggedInUser.img } alt="Profile Pic" roundedCircle /></figure>
                                :
                                <>
                                    <figure><Image style={ { objectFit: 'cover', height: '400px', width: '80%' } } src='./suited-dog.jpg' alt='default' roundedCircle /></figure>
                                    <h4><i>Podrías añadir una foto de perfil</i></h4>
                                </> }
                        </Col>

                        <Col md={ 6 }>
                            <MyDate { ...this.props } />
                            <PetList setTheUser={ this.props.setTheUser } loggedInUser={ this.props.loggedInUser } />
                        </Col>
                    </Row>

                    <Button style={ { marginTop: '10px' } } onClick={ this.petFormChange }>{ this.state.showPetForm ? 'Ocultar formulario' : 'Dar en adopción' }</Button>
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

                { this.state.showPetForm && <Container ><PetForm petFormChange={ this.petFormChange } setTheUser={ this.props.setTheUser } loggedInUser={ this.props.loggedInUser } /></Container> }

            </>
        )
    }
}
//Reat imports
import React, { Component } from 'react'
//Services imports
import PetServices from '../../../../services/pet.service'
//Bootstrap imports
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default class AdoptPet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                request: ''
            }
        }
        this.petServices = new PetServices()
    }

    inputHandler = e => this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } })


    submitHandler = e => {
        e.preventDefault()

        this.petServices.newScraped(this.props.pet)
            .then(pet => pet.pet)
            .then(pet => this.petServices.addRequest(pet._id, this.state.form))
            .then(user => { this.finish(user.user) })
            .catch(err => console.log(err))
    }

    finish(user) {
        this.props.setTheUser(user)
        this.props.closeModal()
    }

    render() {
        return (
            //nombre, correo, textarea para motivo (mensaje para mandar al propietario)

            <Container>
                <h3>Solicitud de adopción</h3>
                <hr />

                <Form.Row className='justify-content-between'>
                    <Form.Group as={ Col } md={ 12 }>
                        <Form.Label >Usuario</Form.Label>
                        <Form.Control value={ this.props.loggedInUser.username } readOnly />

                        <Form.Label>Correo</Form.Label>
                        <Form.Control value={ this.props.loggedInUser.email } readOnly />

                        <Form.Label >Motivos</Form.Label>
                        <Form.Control name='request' as='textarea' value={ this.state.form.textArea } onChange={ this.inputHandler } />

                        <Button onClick={ this.submitHandler } >Mandar solicitud</Button>

                    </Form.Group>
                </Form.Row>

            </Container>
        )
    }
}
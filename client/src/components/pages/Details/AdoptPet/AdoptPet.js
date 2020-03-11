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
            <div className='login'>
                <form id="form-container" onSubmit={this.submitHandler}>
                    <div className='box'>
                        <div className='box-form'>
                            <div className='box-login-tab'></div>
                            <div className='box-login-title'>
                                <div className='i i-login'></div>
                                <div className='i i-login'></div>
                                <div className='i i-login'></div>
                            </div>
                            <div className='box-login'>
                                <div className='fieldset-body' id='login_form'>
                                    <p className='field'>
                                        <label htmlFor='username'>Usuario</label>
                                        <input type='text' id='username' name='username' value={this.props.loggedInUser.username} readOnly />
                                    </p>
                                    <p className='field'>
                                        <label htmlFor='email'>Correo</label>
                                        <input type='email' id='email' name='email' value={this.props.loggedInUser.email} readOnly />
                                    </p>
                                    <p className='field'>
                                        <label htmlFor='request'>Mensaje</label>
                                        <input name='request' type='textarea' value={this.state.form.textArea} onChange={this.inputHandler} />
                                    </p>
                                    <p className='failureMessage'> {this.state.errorMessage}</p>
                                    <p className='link account-message aux-mes' onClick={this.props.closeModal} >Volver atrás</p>
                                    <input type='submit' id='do_login' value='MANDAR SOLICITUD' />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
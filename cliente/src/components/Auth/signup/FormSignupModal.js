import React, { Component } from 'react'

import AuthServices from '../../../services/auth.service'

import './FormSignupModal.css'

export default class SignupForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            errorMessage: ""
        }
        this.AuthServices = new AuthServices()

    }

    finishAction = () => this.props.closeModal()

    postUser = () => {
        this.AuthServices.signup(this.state)
            .then(theLoggedNewUser => {
                if (theLoggedNewUser.status === 'fail') {
                    this.setState({ errorMessage: theLoggedNewUser.message })
                    return
                }
                this.setState({ username: '', password: '', confirmPassword: '', email: '' })
                this.props.setTheUser(theLoggedNewUser)
                this.finishAction()

            })
            .catch(err => console.log(err))
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postUser()
    }

    render() {

        return (
            <div className='signup'>
                <form id="form-container" onSubmit={this.handleSubmit}>
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
                                        <input type='text' id='username' name='username' title='Introduzca nombre de usuario' placeholder="Introduzca nombre de usuario" value={this.state.username} onChange={this.handleChange} />
                                    </p>
                                    <p className='field'>
                                        <label htmlFor='email'>Email</label>
                                        <input type='email' id='email' name='email' title='Introduzca correo electrónico' placeholder="Introduzca correo electrónico" value={this.state.email} onChange={this.handleChange} />

                                    </p>
                                    <p className='field'>
                                        <label htmlFor='password'>Contraseña</label>
                                        <input type='password' id='password' name='password' title='Introduzca la contraseña'
                                            placeholder="Introduzca la contraseña" value={this.state.password} onChange={this.handleChange} /></p>
                                    <p className='field'>
                                        <label htmlFor='confirmPassword'> Confirmar contraseña</label>
                                        <input type='password' id='confirmPassword' name='confirmPassword' placeholder="Confirme la contraseña"
                                            title='Confirme la contraseña' value={this.state.confirmPassword} onChange={this.handleChange} />

                                    </p>
                                    <p className='failureMessage'>{this.state.errorMessage}</p>
                                    <p className='link account-message aux-mes' onClick={this.props.closeModal} > Volver atrás</p>
                                    <input type='submit' id='do_login' value='CREAR CUENTA' />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}



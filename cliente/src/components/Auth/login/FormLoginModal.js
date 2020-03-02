import React, { Component } from 'react'

import AuthServices from '../../../services/auth.service'



class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.AuthServices = new AuthServices()
        this.errorMessage = ""
    }

    finishAction = () => {
        this.props.closeModal()
    }

    postUser = () => {
        this.AuthServices.login(this.state)
            .then(theLoggedUser => {
                this.setState({ username: '', password: '' })
                this.props.setTheUser(theLoggedUser)
                this.finishAction()
            })
            .catch(err => console.log(err))
    }
    // TO-DO preguntar como asignar el error abajo en el form
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
                                    <label htmlFor='password'>Contraseña</label>
                                    <input type='password' id='password' name='password' title='Introduzca la contraseña'
                                        placeholder="Introduzca la contraseña" value={this.state.password} onChange={this.handleChange} /></p>

                                <p className='link account-message aux-mes' onClick={this.props.closeModal} > Volver atrás</p>
                                <input type='submit' id='do_login' value='ENTRAR' />
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        )
    }
}


export default LoginForm
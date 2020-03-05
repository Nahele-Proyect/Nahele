import React, { Component } from 'react'

import './Email.css'

import AuthServices from '../../../../services/auth.service'



class PasswordForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newEmail: '',
            oldEmail: '',
            errorMessage: ''
        }


        this.AuthServices = new AuthServices()
    }

    finishAction = () => {
        this.props.closeModal()
    }

    updateUser = () => {
        this.AuthServices.updateEmail(this.state)
            .then(theUpdateUser => {
                if (theUpdateUser.status === 'fail') {
                    this.setState({ errorMessage: theUpdateUser.message })
                    return
                }
                this.props.setTheUser(theUpdateUser)
                this.setState({ newEmail: '', oldEmail: '', mesage: '' })
                this.finishAction()
            })
            .catch(err => (err))
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.updateUser()
    }


    render() {

        return (
            <div className='email'>
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
                                        <label htmlFor='oldEmail'>Email actual</label>
                                        <input type='email' id='oldEmail' name='oldEmail' title='Introduzca nuevo correo electrónico' placeholder="Introduzca email actual" value={this.state.oldEmail} onChange={this.handleChange} />
                                    </p>
                                    <p className='field'>
                                        <label htmlFor='newEmail'>Nuevo email</label>
                                        <input type='email' id='newEmail' name='newEmail' title='Introduzca nuevo correo electrónico' placeholder="Introduzca nuevo email" value={this.state.newEmail} onChange={this.handleChange} />
                                    </p>

                                    <p className='failureError'> {this.state.errorMessage}</p>
                                    <p className='link account-message aux-mes' onClick={this.props.closeModal} > Volver atrás</p>
                                    <input type='submit' id='do_login' value='ACTUALIZAR EMAIL' />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}


export default PasswordForm
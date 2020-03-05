import React, { Component } from 'react'

import './Password.css'

import AuthServices from '../../../../services/auth.service'



class PasswordForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: "",
            confirmPassword: '',
            errorMessage: ""
        }


        this.AuthServices = new AuthServices()
    }

    finishAction = () => {
        this.props.closeModal()
    }

    updateUser = () => {
        this.AuthServices.updatePassword(this.state)
            .then(theUpdateUser => {
                if (theUpdateUser.status === 'fail') {
                    this.setState({ errorMessage: theUpdateUser.message })
                    return
                }
                this.props.setTheUser(theUpdateUser)
                this.setState({ username: '', confirmPassword: '', mesage: '' })
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
            <div className='password'>
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
                                    <input type='submit' id='do_login' value='CAMBIAR CONTRASEÑA' />
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

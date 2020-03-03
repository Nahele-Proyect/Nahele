import React, { Component } from 'react'

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
                                {/* <p className='field'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' id='email' name='email' title='Introduzca correo electrónico' placeholder="Introduzca correo electrónico" value={this.state.email} onChange={this.handleChange} />

                                </p>
                                <p className='field'>
                                    <label htmlFor='img'>Foto de perfil</label>
                                    <input type='file' id='img' name='img' title='Cambiar foto de perfil' value={this.state.img} onChange={this.handleChange} />
                                </p> */}
                                {this.state.errorMessage}
                                <p className='link account-message aux-mes' onClick={this.props.closeModal} > Volver atrás</p>
                                <input type='submit' id='do_login' value='CREAR CUENTA' />
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        )
    }
}


export default PasswordForm

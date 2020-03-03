import React, { Component } from 'react'

import AuthServices from '../../../../services/auth.service'
import FilesServices from '../../../../services/files.service'
import './ProfileForm.css'



class UsernameFrom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            errorMessage: ""
        }


        this.AuthServices = new AuthServices()
        this.filesServices = new FilesServices()

    }

    finishAction = () => {
        this.props.closeModal()
    }
    updateUser = () => {
        this.AuthServices.updateUsername(this.state)
            .then(theUpdateUser => {
                if (theUpdateUser.status === 'fail') {
                    this.setState({ errorMessage: theUpdateUser.message })
                    return
                }
                this.props.setTheUser(theUpdateUser)
                this.setState({ username: '', mesage: '' })
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
            <div className='username'>
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
                                        <input type='text' id='username' name='username' title='Introduzca nuevo nombre de usuario' placeholder="Introduzca nombre de usuario" value={this.state.username} onChange={this.handleChange} />
                                    </p>

                                    <p className='failureMessage'>{this.state.errorMessage}</p>
                                    <p className='link account-message aux-mes' onClick={this.props.closeModal} > Volver atrás</p>
                                    <input type='submit' id='do_login' value='CAMBIAR NOMBRE DE USUARIO' />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


export default UsernameFrom
import React, { Component } from 'react'

import './ImgForm.css'

import FilesServices from '../../../../services/files.service'
import AuthServices from '../../../../services/auth.service'

class ImgForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMessage: ''
        }
        this.FilesServices = new FilesServices()
        this.AuthServices = new AuthServices()
    }

    finishAction = () => this.props.closeModal()

    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("imageUrl", e.target.files[0])
        this.FilesServices.handleUpload(uploadData)
            .then(response => {
                this.props.setTheUser({ ...this.props.loggedInUser, img: response.secure_url })
                this.finishAction()
            })
            .catch(err => console.log(err))
    }
    updateUser = () => {
        this.AuthServices.updateImg(this.state)
            .then(theUpdateUser => {
                if (theUpdateUser.status === 'fail') {
                    this.setState({ errorMessage: theUpdateUser.message })
                    return
                }
                this.props.setTheUser(theUpdateUser)

                this.finishAction()
            })
            .catch(err => (err))
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = e => e.preventDefault()


    render() {

        return (
            <div className='pic-profile'>
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
                                        <label htmlFor='imageUrl'>Foto de perfil</label>
                                        <input style={{ color: 'transparent' }} type='file' id='imageUrl' name='imageUrl' title='Sube una foto de perfil' onChange={this.handleFileUpload} />
                                    </p>
                                    <p className='failureError'> {this.state.errorMessage}</p>
                                    <p className='link account-message aux-mes' onClick={this.props.closeModal} >Volver atrás</p>
                                    <input type='submit' id='do_login' value='ACTUALIZAR FOTO' />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}


export default ImgForm
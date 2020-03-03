import './ImgForm.css'
import React, { Component } from 'react'
import FilesServices from '../../../../services/files.service'
import AuthServices from '../../../../services/auth.service'

class ImgForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            img: '',
            errorMessage: ''
        }
        this.FilesServices = new FilesServices()
        this.AuthServices = new AuthServices()
    }

    finishAction = () => {
        this.props.closeModal()
    }

    updateUser = () => {
        this.AuthServices.updateImg(this.state)
            .then(theUpdateUser => {
                if (theUpdateUser.status === 'fail') {
                    this.setState({ errorMessage: theUpdateUser.message })
                    return
                }
                this.props.setTheUser(theUpdateUser)
                this.setState({ img: '', errorMessage: '' })
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
    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("img", e.target.files[0])
        this.filesServices.handleUpload(uploadData)
            .then(response => {
                console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.secure_url)
                this.setState({
                    img: response.secure_url
                })
            })
            .catch(err => console.log(err))
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
                                        <label htmlFor='img'>Foto de perfil</label>
                                        <input type='file' id='img' name='img' title='Sube una foto de perfil' onChange={this.handleFileUpload} />
                                    </p>
                                    <p className='failureError'> {this.state.errorMessage}</p>
                                    <p className='link account-message aux-mes' onClick={this.props.closeModal} > Volver atrás</p>
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
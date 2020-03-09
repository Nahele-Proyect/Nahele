//React imports
import React, { Component } from 'react'
//Services imports
import PetServices from '../../../../services/pet.service'
import FileServices from '../../../../services/files.service'
//Bootstrap imports
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default class PetForm extends Component {
    constructor(props) {
        super(props)
        this.petServices = new PetServices()
        this.fileServices = new FileServices()
        this.state = {
            form: {
                name: '',
                img: '',
                city: '',
                urgency: 'En Adopción',
                born: '',
                specie: '',
                gender: '',

                activity: '',
                weigth: '',
                size: 'Mediano',

                vaccinated: false,
                dewormed: false,
                healthy: false,
                sterilized: false,
                indentified: false,
                microchip: false,

                comment: '',
            },
            showMoreForm: false,
            message: ''
        }
    }
    showMoreInfoHandler = () => this.setState({ showMoreForm: !this.state.showMoreForm })//Change extended form visibility
    inputsHandler = e => {//Handles all inputs, except image one
        e.target.type === 'radio' && (e.target.value = e.target.id)
        e.target.type === 'checkbox' && (e.target.value = e.target.checked)

        this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } })
    }
    imgFileUpload = e => {//Handle cloudinary upload (and image set)
        const uploadData = new FormData()
        uploadData.append('img', e.target.files[0])
        this.fileServices.uploadImage(uploadData)
            .then(img => this.setState({ form: { ...this.state.form, img: img.img } }))
            .catch(err => console.log(err))
    }
    submitHandler = e => {//Handle the button effect and the form submit
        e.preventDefault()

        this.petServices.createPet(this.state.form)
            .then(user => user.status === 'ok' ? this.finishForm(user) : this.setState({ message: user.message }))
            .catch(err => console.log(err))
    }
    finishForm = user => this.props.setTheUser(user.user, this.props.petFormChange())//Set the global user and close the form

    render() {
        return (
            <Container>
                <hr />
                <br />
                <Form>
                    <Form.Row className='justify-content-between'>

                        <Form.Group as={ Col } md='5'>
                            { this.state.form.img ?
                                <img style={ { margin: '20px 0px', width: '60%' } } src={ this.state.form.img } alt='foto' />
                                :
                                <>
                                    <img style={ { margin: '20px 0px', width: '60%' } } src='./jake.png' alt='foto' />
                                    <Form.Control name='img' id='img' type='file' onChange={ this.imgFileUpload } />
                                </>
                            }

                            <Form.Label htmlFor='specie'></Form.Label>
                            <Form.Control type='text' id='specie' name='specie' value={ this.state.form.specie } placeholder='Gato, Perro...' onChange={ this.inputsHandler } />

                            <Form.Label htmlFor='urgency'>Urgencia</Form.Label>
                            <Form.Control as='select' id='urgency' name='urgency' value={ this.state.form.urgency } onChange={ this.inputsHandler }>
                                <option>En Adopción</option>
                                <option>Urgente</option>
                            </Form.Control>

                        </Form.Group>
                        <Form.Group as={ Col } md='5' className="align-self-end">
                            <Form.Label htmlFor='name'>Nombre</Form.Label>
                            <Form.Control type='text' id='name' name='name' value={ this.state.form.name } placeholder='Nombre de la mascota' onChange={ this.inputsHandler } />

                            <Form.Label htmlFor='city'>Ciudad</Form.Label>
                            <Form.Control type='text' id='city' name='city' value={ this.state.form.city } placeholder='Escribe el nombre de tu ciudad' onChange={ this.inputsHandler } />

                            <Form.Label htmlFor='born'>Nacimiento</Form.Label>
                            <Form.Control type='date' id='born' name='born' value={ this.state.form.born } onChange={ this.inputsHandler } />

                            <fieldset>
                                <Form.Group as={ Row } >
                                    <Form.Label as={ Col } md={ 2 }>Genero</Form.Label>
                                    <Col md={ 4 }>

                                        <Form.Check checked={ this.state.form.gender === 'Macho' } onChange={ this.inputsHandler }
                                            type="radio"
                                            label="Macho"
                                            name="gender"
                                            id="Macho"
                                        />
                                    </Col>
                                    <Col md={ 4 }>

                                        <Form.Check checked={ this.state.form.gender === 'Hembra' } onChange={ this.inputsHandler }
                                            type="radio"
                                            label="Hembra"
                                            name="gender"
                                            id="Hembra"
                                        />
                                    </Col>
                                </Form.Group>
                            </fieldset>

                        </Form.Group>
                    </Form.Row>
                </Form>


                <Button onClick={ this.showMoreInfoHandler }>{ this.state.showMoreForm ? 'Ocultar opciones extra' : 'Mostrar más opciones' }</Button>
                {
                    this.state.showMoreForm &&
                    <Row className='justify-content-between align-items-center'>
                        <Form.Group as={ Col } md={ 5 }>
                            <Form.Label htmlFor='activity'>Actividad</Form.Label>
                            <Form.Control as='select' id='activity' name='activity' value={ this.state.form.activity } onChange={ this.inputsHandler } >
                                <option value='Desconocida'>Desconocida</option>
                                <option value='Baja'>Baja</option>
                                <option value='Media'>Media</option>
                                <option value='Alta'>Alta</option>
                            </Form.Control>

                            <Form.Label htmlFor='weigth'>Peso</Form.Label>
                            <Form.Control type='text' id='weigth' name='weigth' value={ this.state.form.weigth } placeholder='Peso en kilos' onChange={ this.inputsHandler } />

                            <Form.Label htmlFor='size'>Tamaño</Form.Label>
                            <Form.Control as='select' id='size' name='size' value={ this.state.form.activity } onChange={ this.inputsHandler }>
                                <option value='Mediano'>Mediano</option>
                                <option value='Pequeño'>Pequeño</option>
                                <option value='Grande'>Grande</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={ Col } md={ 5 }  >
                            <Form.Check label="Vacunado" name='vaccinated' checked={ this.state.form.vaccinated === 'true' } onChange={ this.inputsHandler } />
                            <Form.Check label='Desparasitado' name='dewormed' checked={ this.state.form.dewormed === 'true' } onChange={ this.inputsHandler } />
                            <Form.Check label='Sano' name='healthy' checked={ this.state.form.healthy === 'true' } onChange={ this.inputsHandler } />
                            <Form.Check label='Esterilizado' name='sterilized' checked={ this.state.form.sterilized === 'true' } onChange={ this.inputsHandler } />
                            <Form.Check label='Identificado' name='identified' checked={ this.state.form.identified === 'true' } onChange={ this.inputsHandler } />
                            <Form.Check label='Microchip' name='microchip' checked={ this.state.form.microchip === 'true' } onChange={ this.inputsHandler } />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor='comment'>Información extra:</Form.Label>
                            <Form.Control as='textarea' name='comment' value={ this.state.form.comment } onChange={ this.inputsHandler } />
                        </Form.Group>
                    </Row>

                }

                <Container>
                    <Row className='justify-content-end'>
                        { this.state.message.length > 0 && <h6>{ this.state.message }</h6> }
                        <Button as={ Col } md={ 2 } onClick={ this.submitHandler }>Crear mascota</Button>
                    </Row>
                </Container>

            </Container>
        )
    }
}
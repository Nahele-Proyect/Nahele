import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default class PetForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                name: '',//Basic
                img: 'https://img.miwuki.com/a/ZJL889/500',//Basic
                city: '',//Basic
                urgency: '',//Basic
                born: '',//Basic
                specie: '',//Basic
                gender: '',//Basic

                activity: '',//Extends
                weigth: '',//Extends
                size: '',//Extends

                vaccinated: '',//State
                dewormed: '',//State
                healthy: '',//State
                sterilized: '',//State
                indentified: '',//State
                microchip: '',//State

                personality: [],//Soft
                comment: '',//Soft

                //flag: '',   //Sera por defecto la bandera de españa (Podriamos quitar esto de aqui)
                //owner: '', //Sera el usuario actual (Podriamos quitaer esto de aqui y usar el req.user para almacenarlo)
            },
            showMoreForm: false,
        }
    }
    showMoreInfoHandler = () => this.setState({ showMoreForm: !this.state.showMoreForm })

    render() {
        return (
            <Container>
                <hr />
                <br />
                <Form>
                    <Form.Row className='justify-content-between'>

                        <Form.Group as={ Col } md='5'>
                            { this.state.form.img ? <img style={ { margin: '20px 0px', width: '60%' } } src={ this.state.form.img } alt='animal' />
                                :
                                <>
                                    <Form.Label htmlFor='img'>Imagen</Form.Label>
                                    <Form.Control name='img' id='img' type='file' />
                                </>
                            }

                            <Form.Label htmlFor='specie'>Especie</Form.Label>
                            <Form.Control type='text' id='specie' name='specie' value={ this.state.form.specie } placeholder='Gato, Perro...' />

                            <Form.Label htmlFor='urgency'>Especie</Form.Label>
                            <Form.Control as='select' id='urgency' name='urgency' value={ this.state.form.urgency } >
                                <option>En Adopción</option>
                                <option>Urgente</option>
                            </Form.Control>

                        </Form.Group>
                        <Form.Group as={ Col } md='5' className="align-self-end">
                            <Form.Label htmlFor='name'>Nombre</Form.Label>
                            <Form.Control type='text' id='name' name='name' value={ this.state.form.name } placeholder='Nombre de la mascota' />

                            <Form.Label htmlFor='city'>Ciudad</Form.Label>
                            <Form.Control type='text' id='city' name='city' value={ this.state.form.city } placeholder='Escribe el nombre de tu ciudad' />

                            <fieldset>
                                <Form.Group as={ Row } >
                                    <Form.Label as={ Col } md={ 2 }>Genero</Form.Label>
                                    <Col md={ 4 }>

                                        <Form.Check
                                            type="radio"
                                            label="Macho"
                                            name="genero"
                                            id="male"
                                        />
                                    </Col>
                                    <Col md={ 4 }>

                                        <Form.Check
                                            type="radio"
                                            label="Hembra"
                                            name="genero"
                                            id="female"
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
                    <Container>
                        <Form.Group as={ Col } md={ 6 }>
                            <Form.Label htmlFor='activity'>Especie</Form.Label>
                            <Form.Control as='select' id='activity' name='activity' value={ this.state.form.activity } >
                                <option value='Desconocida'>Desconocida</option>
                                <option value='Baja'>Baja</option>
                                <option value='Media'>Media</option>
                                <option value='Alta'>Alta</option>
                            </Form.Control>

                            <Form.Label htmlFor='weigth'>Peso</Form.Label>
                            <Form.Control type='text' id='weigth' name='weigth' value={ this.state.form.weigth } placeholder='Peso en kilos' />

                            <Form.Label htmlFor='activity'>Actividad</Form.Label>
                            <Form.Control as='select' id='activity' name='activity' value={ this.state.form.activity }>
                                <option value='Mediano'>Mediano</option>
                                <option value='Pequeño'>Pequeño</option>
                                <option value='Grande'>Grande</option>
                            </Form.Control>



                        </Form.Group>
                    </Container>
                }

            </Container>
        )
    }
}
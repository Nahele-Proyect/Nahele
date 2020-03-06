import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                specie: '',
                urgency: ''
            },
            filter: {
                specie: '',
                urgency: ''
            }
        }
    }
    quitFilters = () => {

        this.setState({ form: { specie: '', urgency: '' }, filter: { specieFilter: '', urgencyFilter: '' } }, () => this.props.changeFilters(this.state.filter))
    }
    inputHandler = e => {

        this.setState({ form: { ...this.state.form, [e.target.name]: e.target.id }, filter: { ...this.state.filter, [e.target.name]: e.target.id } }, () => this.props.changeFilters(this.state.filter))
    }

    render() {

        return (
            <>
                <Container>

                    <Row>
                        <Col md={ 5 }>
                            <Form.Group as={ Row } >
                                <Form.Label htmlFor='specie'>Especie:</Form.Label>

                                <Col md={ 2 } >
                                    <Form.Check checked={ this.state.form.specie === 'Perro' } onChange={ this.inputHandler }
                                        type="radio"
                                        label="Perro"
                                        name="specie"
                                        id="Perro"
                                    />
                                </Col>
                                <Col md={ 2 }>
                                    <Form.Check checked={ this.state.form.specie === 'Gato' } onChange={ this.inputHandler }
                                        type="radio"
                                        label="Gato"
                                        name="specie"
                                        id="Gato"
                                    />
                                </Col>

                                <Col md={ 2 } >
                                    <Form.Check checked={ this.state.form.specie === 'Otros' } onChange={ this.inputHandler }
                                        type="radio"
                                        label="Otros"
                                        name="specie"
                                        id="Otros"
                                    />
                                </Col>
                            </Form.Group>
                        </Col>

                        <Col md={ 5 }>
                            <Form.Group as={ Row } >
                                <Form.Label htmlFor='urgency'>Urgencia:</Form.Label>
                                <Col md={ 3 } >
                                    <Form.Check checked={ this.state.form.urgency === 'Urgencia' } onChange={ this.inputHandler }
                                        type="radio"
                                        label="Urgencia"
                                        name='urgency'
                                        id="Urgencia"
                                    />
                                </Col>
                                <Col md={ 5 } >
                                    <Form.Check checked={ this.state.form.urgency === 'En Adopción' } onChange={ this.inputHandler }
                                        type="radio"
                                        label="En Adopción"
                                        name="urgency"
                                        id="En Adopción"
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        { (this.state.form.specie.length !== 0 || this.state.form.urgency.length !== 0) && <Col md={ 2 }><Button className='btn-sm' onClick={ this.quitFilters } >Mostrar Todos</Button></Col> }
                    </Row>

                </Container>

            </>
        )
    }
}
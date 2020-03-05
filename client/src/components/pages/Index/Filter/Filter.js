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
                specieFilter: 'sadf',
                urgencyFilter: ''
            },
        }
    }
    quitFilters = () => this.setState({ form: { specieFilter: '', urgencyFilter: '' } })

    render() {
        return (
            <>
                <Container>

                    <Row>
                        <Col md={ 5 }>
                            <Form.Group as={ Row } >
                                <Form.Label htmlFor='specie'>Especie:</Form.Label>

                                <Col md={ 2 }>
                                    <Form.Check
                                        type="radio"
                                        label="Perro"
                                        name="specie"
                                        id="Perro"
                                    />
                                </Col>
                                <Col md={ 2 }>
                                    <Form.Check
                                        type="radio"
                                        label="Gato"
                                        name="specie"
                                        id="Gato"
                                    />
                                </Col>

                                <Col md={ 2 }>
                                    <Form.Check
                                        type="radio"
                                        label="Otros"
                                        name="specie"
                                        id="Otros"
                                    />
                                </Col>
                            </Form.Group>
                        </Col>

                        <Col md={ 5 }>
                            <Form.Group as={ Row }>
                                <Form.Label htmlFor='urgency'>Urgencia:</Form.Label>
                                <Col md={ 2 }>
                                    <Form.Check
                                        type="radio"
                                        label="Perro"
                                        name="specie"
                                        id="Perro"
                                    />
                                </Col>
                                <Col md={ 2 }>
                                    <Form.Check
                                        type="radio"
                                        label="Gato"
                                        name="specie"
                                        id="Gato"
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        { (this.state.form.specieFilter.length !== 0 || this.state.form.urgencyFilter.length !== 0) && <Col md={ 2 }><Button className='btn-sm' onClick={ this.quitFilters } >Mostrar Todos</Button></Col> }
                    </Row>

                </Container>

            </>
        )
    }
}
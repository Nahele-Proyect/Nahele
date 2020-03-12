//Resumen de lo que somos
//Ubicacion
//Contancto
//email

import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

import Map from '../../GoogleMaps/GoogleMaps'

const About = () => {
    return (
        <Container>
            <Row className='items-align-center justify-content-between' style={{ minHeight: '80vh' }}>
                <Col md={5}>

                    <h3 style={{ paddingTop: '20px' }}>¿Quiénes somos?</h3>
                    <p>Somos un refugio de animales concienciados con ayudar a los animales a encontrar una vida mejor. También tenemos servicio para que aquellos que no puedan hacerse cargo de un animal, puedan conseguirles una buena casa.</p>
                    <br />

                    <h3>Contacto</h3>

                    <ListGroup variant="flush">
                        <hr />
                        <ListGroup.Item>
                            <figure style={{ display: 'flex', alignItems: 'center' }}><img src='./location.svg' alt='location logo' /><h6 style={{ marginTop: '5px' }}>Dirección</h6></figure>
                            <p>Paseo de la chopera nº 14, Matadero, Madrid</p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <figure style={{ display: 'flex', alignItems: 'center' }}><img src='./email.svg' alt='email logo' /><h6 style={{ marginTop: '5px' }}>Email</h6></figure>
                            <p>nahere-shelter@gmail.com</p>
                        </ListGroup.Item>

                    </ListGroup>

                </Col>
                <Col md={6}>
                    <figure style={{ minHeight: '60vh', paddingTop: '20px' }}><Map /></figure>
                </Col>
            </Row>
        </Container>
    )
}

export default About
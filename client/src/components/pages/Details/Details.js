import React, { Component } from 'react'
import { Link } from "react-router-dom"
//Services imports
import ScrapServices from '../../../services/scrap.service'
//Bootstrap imports
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
//Styling
import './details.css'

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pet: undefined
        }
        this.scrapServices = new ScrapServices()
    }
    componentDidMount = () => this.getOnePet(this.props.match.params.link)

    getOnePet = petLink => {
        this.scrapServices.getDetails(petLink)
            .then(onePet => this.setState({ pet: onePet.pet }))
            .catch(err => err)
    }

    render() {

        return (
            <>
                { this.state.pet ?
                    <div className="details">

                        <Container>
                            <Row className='justify-content-between align-items-center'>
                                <Col md={ 5 }>
                                    <figure><img src={ this.state.pet.img } alt='pet' /></figure>
                                </Col>

                                <Col md={ 5 }>

                                    <h1>Nombre: { this.state.pet.name }</h1>
                                    <h6>{ this.state.pet.specie }</h6>
                                    <p>Nacimiento: { this.state.pet.born ? this.state.pet.born.substr(0, 10) : 'Desconocido' }</p>
                                    <p>Sexo: { this.state.pet.gender }</p>
                                    <p>Tamaño: { this.state.pet.size }</p>
                                    <p>Peso: { this.state.pet.weigth }</p>
                                    <p>Actividad: { this.state.pet.activity }</p>
                                    <p>Vacunado: { this.state.pet.vaccinated }</p>
                                    <p>Desparasitado: { this.state.pet.dewormed }</p>
                                    <p>Sano: { this.state.pet.healthy }</p>
                                    <p>Esterilizado: { this.state.pet.sterilized }</p>
                                    <p>Identificado: { this.state.pet.indentified }</p>
                                    <p>Microchip: { this.state.pet.microchip }</p>
                                    <p>Estado: { this.state.pet.urgency }</p>
                                    <Row className='justify-content-start'>
                                        <Col md={ 6 }><p>Ciudad: { this.state.pet.city }</p></Col>
                                        <Col md={ 4 }><figure><img className='flag' src={ this.state.pet.flag } alt="flag" /></figure></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr />
                            <p>{ this.state.pet.comment }</p>
                        </Container>
                        <hr />
                        <Link style={ { display: "flex", justifyContent: 'center' } } to={ `/newCalendar/${this.props.match.params.link}` }><h3>Book an Appointment</h3></Link>

                    </div>
                    :
                    <p>Cargando man -.-"/</p> }
            </>
        )
    }
}
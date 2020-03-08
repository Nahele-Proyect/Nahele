import React, { Component } from 'react'
import { Link } from "react-router-dom"

import ScrapServices from '../../../services/scrap.service'

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

                        <figure><img src={ this.state.pet.img } alt='pet' /></figure>
                        <h1>Nombre: { this.state.pet.name }</h1>
                        <h6>{ this.state.pet.specie }</h6>
                        <p>Nacimiento: { this.state.pet.born.substr(0, 10) }</p>
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
                        <br /><br />
                        <p>{ this.state.pet.comment }</p>
                        <br /><br />
                        <p>Ciudad: { this.state.pet.city }</p>
                        <figure><img src={ this.state.pet.flag } alt="flag" /></figure>
                        <Link to={ `/newCalendar/${this.props.match.params.link}` }><h3>Book an Appointment</h3></Link>

                    </div>
                    :
                    <p>Cargando man -.-"/</p> }
            </>
        )
    }
}
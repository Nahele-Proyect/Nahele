//React imports 
import React, { Component } from 'react'
import { Link } from "react-router-dom"
//Services imports
import ScrapServices from '../../../services/scrap.service'
import PetServices from '../../../services/pet.service'
//Bootstrap imports
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
//Spinner import
import Loader from 'react-loader-spinner'
import AdoptPet from './AdoptPet/AdoptPet'
//Self-made css import
import './details.css'

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pet: undefined,
            showAdoptModal: false
        }
        this.scrapServices = new ScrapServices()
        this.petServices = new PetServices()
    }
    componentDidMount = () => {
        this.props.match.params.link && this.getOnePet(this.props.match.params.link)
        this.props.match.params.id && this.getMyPet(this.props.match.params.id)
    }

    getOnePet = petLink => {
        this.scrapServices.getDetails(petLink)
            .then(onePet => this.setState({ pet: onePet.pet }))
            .catch(err => err)
    }

    getMyPet = petId => {
        this.petServices.getOnePet(petId)
            .then(onePet => this.setState({ pet: onePet.pet }))
            .catch(err => err)
    }

    showAdoptModal = () => this.setState({ showAdoptModal: true })
    closeModal = () => this.setState({ showAdoptModal: false })

    render() {

        return (
            <>
                {this.state.pet ?
                    <>
                        <div className="details">

                            <Container>
                                <Row className='justify-content-between align-items-center'>
                                    <Col md={5}>
                                        <figure><img src={this.state.pet.img} alt='pet' /></figure>
                                        {this.props.loggedInUser && <Button size='lg' variant='outline-info' onClick={this.showAdoptModal} >Adoptar</Button>}
                                    </Col>

                                    <Col md={5}>

                                        <h1>Nombre: {this.state.pet.name}</h1>
                                        <h6>{this.state.pet.specie}</h6>
                                        <p>Nacimiento: {this.state.pet.born ? this.state.pet.born.substr(0, 10) : 'Desconocido'}</p>
                                        <p>Sexo: {this.state.pet.gender}</p>
                                        <p>Tamaño: {this.state.pet.size}</p>
                                        <p>Peso: {this.state.pet.weigth}</p>
                                        <p>Actividad: {this.state.pet.activity}</p>
                                        <p>Vacunado: {this.state.pet.vaccinated}</p>
                                        <p>Desparasitado: {this.state.pet.dewormed}</p>
                                        <p>Sano: {this.state.pet.healthy}</p>
                                        <p>Esterilizado: {this.state.pet.sterilized}</p>
                                        <p>Identificado: {this.state.pet.indentified}</p>
                                        <p>Microchip: {this.state.pet.microchip}</p>
                                        <p>Estado: {this.state.pet.urgency}</p>
                                        <Row className='justify-content-start'>
                                            <Col md={6}><p>Ciudad: {this.state.pet.city}</p></Col>
                                            <Col md={4}><figure><img className='flag' src={this.state.pet.flag} alt="flag" /></figure></Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <hr />
                                <p>{this.state.pet.comment}</p>
                            </Container>
                            <hr />
                            <Link style={{ display: "flex", justifyContent: 'center', border: '1px solid grey' }} to={`/newCalendar/${this.props.match.params.link}`}><h3>CALENDARIO</h3></Link>

                        </div>

                        <Modal size='sm' centered show={this.state.showAdoptModal} onHide={this.closeModal} animation={true}>
                            <AdoptPet loggedInUser={this.props.loggedInUser} closeModal={this.closeModal} setTheUser={this.props.setTheUser} pet={this.state.pet} />
                        </Modal>
                    </>
                    :
                    <Loader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }} type="Rings" color="red" height={250} width={250} timeout={10000} />

                }
            </>
        )
    }
}
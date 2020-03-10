//React imoprts
import React, { Component } from 'react'
//Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
//Services imports
import ScrapServices from '../../../services/scrap.service'
//Self-made imports
import PetCard from './petCard/PetCard'
import Filter from './Filter/Filter'
import IndexChart from '../../Charts/IndexChart/IndexChart'

// Spinner
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: props.loggedInUser,
            pets: undefined,
            filters: {
                specie: '',
                urgency: ''
            },
            showGraficModal: false
        }
        this.filtered = undefined
        this.scrapServices = new ScrapServices()
    }

    componentDidMount = () => this.getAllPets()

    componentWillUnmount = () => this.scrapServices.cancelAll()

    getAllPets = () => {
        this.scrapServices.getAll()
            .then(allPets => this.setState({ pets: allPets.pets }))
            .catch(err => err)
    }

    //Filter handlers
    changeFilters = filters => this.setState({ ...this.state, filters: { specie: filters.specie, urgency: filters.urgency } })

    //Modal handlers
    closeModal = () => this.setState({ showGraficModal: false })
    openGraficModal = () => this.setState({ showGraficModal: true })

    render() {

        //This filter by the filter state
        if (this.state.pets) {
            this.filtered = [...this.state.pets]

            this.state.filters.specie && (
                this.state.filters.specie === 'Otros' ?
                    this.filtered = this.state.pets.filter(elm => elm.specie.localeCompare('Gato') && elm.specie.localeCompare('Perro'))
                    :
                    (this.filtered = this.state.pets.filter(elm => !elm.specie.localeCompare(this.state.filters.specie))))
            this.state.filters.urgency && (this.filtered = this.filtered.filter(elm => !elm.urgency.localeCompare(this.state.filters.urgency)))
        }

        return (
            <div className='index'>
                <Container>

                    {this.state.pets &&
                        <>
                            <Row>
                                <Col >
                                    <Filter changeFilters={this.changeFilters} />
                                </Col>
                            </Row>
                            <Modal size='lg' centered show={this.state.showGraficModal} onHide={this.closeModal} animation={true}>
                                <IndexChart pets={this.state.pets} closeModal={this.closeModal} />
                            </Modal>

                            <Button onClick={this.openGraficModal} >Ver porcentajes</Button></>}

                    {this.state.pets ?
                        <Row>
                            {this.filtered.length === 0 ?
                                <h1>No hay ahora mismo mascotas con esos filtros</h1>
                                :
                                this.filtered.map((elm, idx) => <Col lg="3" md='4' sm='6' key={idx}><PetCard {...elm}></PetCard></Col>)}
                        </Row>
                        :
                        <>
                            <Loader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }} type="Rings" color="red" height={250} width={250} timeout={10000} />

                        </>
                    }

                </Container>
            </div>
        )
    }
}

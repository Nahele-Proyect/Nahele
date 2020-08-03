//React imoprts
import React, { Component } from 'react'
//Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

//Services imports
import ScrapServices from '../../../services/scrap.service'
import PetServices from '../../../services/pet.service'
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
        this.petServices = new PetServices()
    }

    componentDidMount = () => this.getAllPets()

    componentWillUnmount = () => this.scrapServices.cancelAll()

    getAllPets = () => {

        Promise.all([this.scrapServices.getAll(), this.petServices.getAllPets()])
            .then(response => {
                const scraped = response[0].pets
                let db = response[1].pets
                db = db.filter(elm => elm.owner)

                return db.concat(scraped)
            })
            .then(pets => this.setState({ pets: pets }))
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
                    <Accordion defaultActiveKey="1">
                        <Card style={{ backgroundColor: '#ffffff', border: '1px solid grey' }}>
                            <Card.Header style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Accordion.Toggle style={{ margin: '0 auto', textDecoration: 'none', color: 'black' }} as={Button} variant="link" eventKey="0">FILTROS</Accordion.Toggle>
                            </Card.Header>
                            <Button variant='outline-info' onClick={this.openGraficModal} >Ver información general</Button>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {this.state.pets &&
                                        <Filter changeFilters={this.changeFilters} />
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    {this.state.pets ?
                        <Row style={{ paddingBottom: '85px' }}>

                            {this.filtered.length === 0 ?
                                <h1 style={{ paddingBottom: '37vh', marginTop: '100px' }}>Ahora mismo no hay mascotas con esos filtros</h1>
                                :
                                this.filtered.map((elm, idx) => <Col lg="3" md='4' sm='6' key={idx}><PetCard {...elm}></PetCard></Col>)}
                        </Row>
                        :
                        <>
                            <Loader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }} type="Rings" color="red" height={250} width={250} timeout={10000} />

                        </>
                    }

                    <Modal size='md' centered show={this.state.showGraficModal} onHide={this.closeModal} animation={true}>
                        <IndexChart pets={this.state.pets} closeModal={this.closeModal} />
                    </Modal>
                </Container>
            </div>
        )
    }
}

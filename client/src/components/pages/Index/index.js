import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ScrapServices from '../../../services/scrap.service'

import PetCard from './petCard/PetCard'
import Filter from './Filter/Filter'

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: props.loggedInUser,
            pets: undefined,
            filters: {
                specieFilter: '',
                urgencyFilter: ''
            }
        }
        this.filtered = undefined
        this.scrapServices = new ScrapServices()
    }

    componentDidMount = () => { this.getAllPets() }

    componentWillUnmount = () => this.scrapServices.cancelAll()

    getAllPets = () => {
        this.scrapServices.getAll()
            .then(allPets => this.setState({ pets: allPets.pets }))
            .catch(err => err)
    }

    changeFilters = filters => this.setState(filters)

    render() {
        if (this.state.pets) {
            this.filtered = [...this.state.pets]

            this.state.filters.specieFilter && (
                this.state.filters.specieFilter === 'Otros' ?
                    this.filtered = this.state.pets.filter(elm => elm.specie.localeCompare('Gato') && elm.specie.localeCompare('Perro'))
                    :
                    (this.filtered = this.state.pets.filter(elm => !elm.specie.localeCompare(this.state.filters.specieFilter))))
            this.state.filters.urgencyFilter && (this.filtered = this.filtered.filter(elm => !elm.urgency.localeCompare(this.state.filters.urgencyFilter)))
        }

        return (
            <div className='index'>
                <Container>
                    <Row>
                        <Col >
                            <Filter changeFilters={ this.changeFilters } />
                        </Col>
                    </Row>

                    { this.state.pets ?
                        <Row>
                            { this.filtered.map((elm, idx) => <Col md="3" key={ idx }><PetCard { ...elm }></PetCard></Col>) }
                        </Row>
                        :
                        <p>Cargando man... :3</p>
                    }


                </Container>
            </div>
        )
    }
}

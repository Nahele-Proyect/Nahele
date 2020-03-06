import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ScrapServices from '../../../services/scrap.service'

import PetCard from './petCard/PetCard'

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: props.loggedInUser,
            pets: undefined,
            specieFilter: '',
            urgencyFilter: ''
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

    render() {
        if (this.state.pets) {
            this.filtered = [...this.state.pets]
            this.state.specieFilter && (this.filtered = this.state.pets.filter(elm => !elm.specie.localeCompare(this.state.specieFilter)))
            this.state.urgencyFilter && (this.filtered = this.state.filter(elm => !elm.urgency.localeCompare(this.state.urgencyFilter)))
        }

        return (
            <div className='index'>
                <Container>

                    {this.state.pets ?
                        <Row>
                            {this.filtered.map((elm, idx) => <Col md="3" key={idx}><PetCard  {...elm}></PetCard></Col>)}
                        </Row>
                        :
                        <p>Cargando man... :3</p>
                    }


                </Container>
            </div>
        )
    }
}

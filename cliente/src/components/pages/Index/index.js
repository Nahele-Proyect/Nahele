import React, { Component } from 'react'
import ScrapServices from '../../../services/scrap.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PetCard from './petCard/PetCard'

export default class Index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedInUser: props.loggedInUser,
            pets: undefined
        }
        this.scrapServices = new ScrapServices()
    }

    componentDidMount() {
        this.getAllPets()

    }

    getAllPets = () => {
        this.scrapServices.getAll()
            .then(allPets => this.setState({ pets: allPets.pets }))
            .catch(err => err)
    }

    render() {
        return (
            <div className='index'>
                <Container>

                    { this.state.pets ?
                        <Row>
                            { this.state.pets.map((elm, idx) => <Col md="4" key={ idx }><PetCard { ...elm }></PetCard></Col>) }
                        </Row>
                        :
                        <p>Cargando man... :3</p>
                    }


                </Container>
            </div>
        )
    }
}
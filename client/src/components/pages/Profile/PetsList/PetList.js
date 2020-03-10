//React imports 
import React, { Component } from 'react'
//Services import
import PetServices from '../../../../services/pet.service'
//Self-made components imports
import IndexPetListCard from './IndexPetListCard/IndexPetListCard'
import Card from 'react-bootstrap/Card'

export default class PetList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.petServices = new PetServices()

    }
    deleteFromList = id => {
        this.petServices.deleteOnePet(id)
            .then(user => this.props.setTheUser(user.user))
            .catch(err => err)
    }
    render() {
        return (
            <Card style={{ height: "auto", backgroundColor: "rgba(255,255, 255, 0.5)", width: '70%', margin: '0 auto' }}>
                <Card.Body >
                    <Card.Title style={{ textAlign: "center" }}>
                        <h4>Animales en adopción</h4>
                    </Card.Title>
                    <Card.Text as={'div'} style={{ height: "25vh", textAlign: "center", overflowY: "scroll", backgroundColor: '#00000008' }}>

                        {this.props.loggedInUser.pets.map(elm => <IndexPetListCard key={elm._id} deleteFromList={() => this.deleteFromList(elm._id)} {...elm} />)}

                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
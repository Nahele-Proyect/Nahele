import React, { Component } from 'react'

import IndexPetListCard from './IndexPetListCard/IndexPetListCard'

export default class PetList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className='petList'>
                { this.props.loggedInUser.pets.map(elm => <IndexPetListCard key={ elm._id } { ...elm } />) }
            </div>
        )
    }
}
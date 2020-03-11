//React imports
import React from 'react'
import { Link } from 'react-router-dom'
//Bootstrap import
import Button from 'react-bootstrap/Button'

const IndexPetListCard = props => {
    return (
        <div className='idexPetListCard' style={ { display: 'flex', justifyContent: 'space-around', borderBottom: '.5px solid rgb(200,200,200)', margin: '5px', padding: '5px' } }>
            <Link to={ '/myPet/' + props._id }>{ props.name }</Link>
            <p>{ props.requests.length }</p>
            <Button onClick={ props.deleteFromList }>Dar de baja</Button>
        </div>
    )
}

export default IndexPetListCard
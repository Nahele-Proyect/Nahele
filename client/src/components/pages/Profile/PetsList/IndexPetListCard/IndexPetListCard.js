//React imports
import React from 'react'
import { Link } from 'react-router-dom'
//Bootstrap import
import Button from 'react-bootstrap/Button'

const IndexPetListCard = props => {
    return (
        <div className='idexPetListCard' style={{ display: 'flex', justifyContent: 'space-around', borderBottom: '.5px solid rgb(200,200,200)', margin: '5px', padding: '5px' }}>
            <Link to={'/myPet/' + props._id}>{props.name}</Link>
            <p>{props.requests.length} <Button variant='outline-danger' style={{ height: '35px', textAlign: 'center', marginLeft: '15px' }} onClick={props.deleteFromList}>Dar de baja</Button></p>

        </div>
    )
}

export default IndexPetListCard
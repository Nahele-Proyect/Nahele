import React from 'react'
import { Link } from 'react-router-dom'

const IndexPetListCard = props => {
    console.log(props)
    return (
        <div className='idexPetListCard'><Link to={ '/myPet/' + props._id }>{ props.name }</Link></div>
    )
}

export default IndexPetListCard
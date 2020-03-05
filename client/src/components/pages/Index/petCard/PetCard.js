import React from 'react'
import { Link } from 'react-router-dom'

import './petCard.css'

const PetCard = props => {

    return (

        <div className='petCardIndex'>
            <figure><img src={props.img} alt='pet' /></figure>
            <h3>{props.name}</h3>
            <h6>Especie: {props.specie}</h6>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h6> {props.urgency}</h6>

                <div style={{
                    display: "flex", justifyContent: "space-around"
                }}>
                    <p>{props.city}</p>
                    <figure><img style={{ width: "50px" }} src={props.flag} alt='flag' /></figure>
                </div>
            </div>

            <Link to={'/details' + props.link}>Detalles</Link>

        </div>
    )
}

export default PetCard
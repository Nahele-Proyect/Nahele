//React imports 
import React from 'react'
import { Link } from 'react-router-dom'
//Self-made css import
import './petCard.css'
//Bootstrap imports
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'



const PetCard = props => {

    return (
        <div className='petCard' style={{ borderRadius: '0 0 25px 25px' }} >
            <Link to={'/details' + props.link}>
                <Card style={{ border: '1px solid grey', marginTop: '40px', borderRadius: '5px 5px 25px 25px' }}>
                    <Card.Img src={props.img} style={{ width: '100%' }} alt='pet' />
                    <Card.Body style={{ padding: '10px' }}>
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Text>{props.specie} - {props.city} <img style={{ width: "20px", height: '15px' }} src={props.flag} alt='flag' /> </Card.Text>

                    </Card.Body>
                    {props.urgency === 'Urgente' ? <Button style={{ backgroundColor: 'red', border: 'none' }} className='button-index' >{props.urgency}</Button> : <Button className='button-index' >{props.urgency}</Button>}
                </Card>
            </Link>
        </div>

    )
}

export default PetCard
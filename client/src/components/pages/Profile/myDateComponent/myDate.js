import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from "react-bootstrap"
import CalendarService from '../../../../services/calendar.service'


class myDate extends Component {
    constructor(props) {
        super(props)
        this.calendarService = new CalendarService()
    }
    deleteCalendar = id => {
        this.calendarService.deleteCalentar(id)
            .then(response => this.props.setTheUser(response.user))
            .catch(err => console.log(err))
    }

    render() {


        return (

            <Card
                style={{ height: "auto", backgroundColor: "rgba(255,255, 255, 0.5)", boxShadow: "10px 10px 15px 0px rgba(0, 0, 0, 0.75)", marginTop: '50px' }}>
                <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                        <h3>CALENDARIO DE CITAS</h3>
                    </Card.Title>
                    <Card.Text as={'div'} style={{ height: "65vh", textAlign: "center", overflowY: "scroll" }}>

                        {this.props.loggedInUser.calendar &&
                            this.props.loggedInUser.calendar.map((elm, idx) => (
                                <div key={idx}>
                                    {console.log(elm)}
                                    <p><strong>Título: </strong>{elm.title}</p>
                                    <p><strong>Fecha: </strong>{elm.start.substr(0, 10)}</p>
                                    <Link to={`/details/${elm.petsUrl}`}>Ir a la mascota</Link>
                                    <Button onClick={() => this.deleteCalendar(elm._id)} >Eliminar</Button>
                                </div>
                            ))}

                    </Card.Text>
                </Card.Body>
            </Card>


        )
    }
}
export default myDate
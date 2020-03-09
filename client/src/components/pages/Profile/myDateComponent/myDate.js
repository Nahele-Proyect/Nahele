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

            <Card style={{ height: "auto", backgroundColor: "rgba(255,255, 255, 0.5)", width: '70%', margin: '0 auto' }}>
                <Card.Body >
                    <Card.Title style={{ textAlign: "center" }}>
                        <h4>CALENDARIO DE CITAS</h4>
                    </Card.Title>
                    <Card.Text as={'div'} style={{ height: "25vh", textAlign: "center", overflowY: "scroll", backgroundColor: '#00000008' }}>

                        {this.props.loggedInUser.calendar &&
                            this.props.loggedInUser.calendar.map((elm, idx) => (
                                <div key={idx}>
                                    {console.log(elm)}
                                    <p><strong>Título: </strong>{elm.title}</p>
                                    <p><strong>Fecha de inicio: </strong>{elm.start && (elm.start.substr(0, 10))}</p>
                                    <p><strong>Fecha fin: </strong>{elm.end && (elm.end.substr(0, 10))}</p>

                                    <Link to={`/details/${elm.petsUrl}`}>Ir a la mascota</Link>
                                    <Button onClick={() => this.deleteCalendar(elm._id)} >Eliminar</Button>
                                    <hr />
                                </div>
                            ))}

                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
export default myDate
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Col } from "react-bootstrap"


class myDate extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        console.log(props.loggedInUser)
    }
    render() {


        return (
            <Col md={6} >
                <Card
                    style={{
                        height: "75vh",
                        backgroundColor: "rgba(255,255, 255, 0.5)",
                        boxShadow: "10px 10px 15px 0px rgba(0, 0, 0, 0.75)"
                    }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: "center" }}>
                            <h3>CALENDARIO DE CITAS</h3>
                        </Card.Title>
                        <Card.Text as={'div'} style={{ height: "65vh", textAlign: "center", overflow: "scroll" }}>

                            {this.props.loggedInUser.calendar &&
                                this.props.loggedInUser.calendar.map((elm, idx) => (
                                    <div key={idx}>
                                        <p><strong>Cita</strong></p>
                                        <p><strong>Nombre de la cita: {elm.title}</strong></p>
                                        <p><strong>Date: {elm.start.substr(0, 10)}</strong></p>
                                        <Link to={`/details/${elm.petsUrl}`}>Go to Center</Link>
                                    </div>
                                ))}

                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

        )
    }
}
export default myDate
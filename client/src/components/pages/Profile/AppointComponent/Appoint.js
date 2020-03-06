import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Col } from "react-bootstrap"


class myDate extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        console.log(props)
    }
    render() {


        return (
            <Col md={6} >
                <Card
                    style={{
                        height: "85vh",
                        backgroundColor: "rgba(255,255, 255, 0.5)",
                        overflow: "scroll",
                        boxShadow: "10px 10px 15px 0px rgba(0, 0, 0, 0.75)"
                    }}
                >
                    <Card.Body>
                        <Card.Title style={{ textAlign: "center" }}>
                            <h3>CALENDARIO DE CITAS</h3>
                        </Card.Title>
                        <Card.Text
                            style={{
                                height: "75vh",
                                textAlign: "center",
                                overflow: "scroll"
                            }}
                        >
                            {this.props.loggedInUser.calendar
                                ? this.state.user.calendar.map(elm => (
                                    <p>
                                        <strong>Woof Appointment: </strong>
                                        {elm.dog.name}
                                        <br></br>
                                        <strong>Booking Name: </strong>
                                        {elm.title}
                                        <br></br>
                                        <strong>Date: </strong>
                                        {elm.start.substr(0, 10)}
                                        <br></br>
                                        <Link to={`/centers/${elm.dog.center}`}>
                                            Go to Center
                              </Link>
                                        <hr></hr>
                                    </p>
                                ))
                                : null}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

        )
    }
}
export default myDate
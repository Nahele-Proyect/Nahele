import React, { Component } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap"
import CalendarService from "../../services/calendar.service"
//Falta algo para obtener los datos de la mascota
import ScrapServices from '../../services/scrap.service'

const localizer = momentLocalizer(moment)

class MyCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dog: { calendar: [] },
            showModalWindow: false,
            mybackup: [],
            myEventsList: [
                {
                    title: "",
                    start: new Date(""),
                    end: new Date("")
                }
            ],
            showEvents: false
        }

        this.ScrapServices = new ScrapServices()
        this.calendarService = new CalendarService()
    }
    componentDidMount = () => this.dogInfo()

    dogInfo = () => {
        this.ScrapServices.getDetails(this.props.match.params.id)
            .then(theDog => this.setState({ dog: { ...this.state.dog, ...theDog.pet } }))
            .catch(err => console.log(err))
    }

    handleSubmit = e => {

        e.preventDefault()
        this.calendarService.postCalendar(this.state.myEventsList[0], this.props.match.params.id)
            .then(() => {
                this.props.history.push(`/profile`)
            })
            .catch(err => console.log(err))
    }

    handleInputChange = e => {
        const myEvent = this.state.myEventsList.map(event => {
            e.target.name.includes("title") && (event.title = e.target.value)
            e.target.name.includes("start") && (event.start = e.target.value)
            e.target.name.includes("end") && (event.end = e.target.value)
            return event
        })
        this.setState({
            myEventsList: myEvent
        })
    }

    handleShow = () => this.setState({ showModalWindow: true })
    handleClose = () => this.setState({ showModalWindow: false })



    render() {
        return (
            <>
                <Container>
                    <section>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant="light" className="btn-profile" onClick={this.handleShow}>
                                Add an Appointment
              </Button>
                        </div>
                        <Row>
                            <Col md={12}>
                                <div
                                    style={{ height: "75vh", marginTop: "25px" }}
                                    className="calendar-container"
                                >
                                    <Calendar
                                        localizer={localizer}
                                        events={this.state.mybackup}
                                        startAccessor="start"
                                        endAccessor="end"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </section>
                </Container>
                <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Woof Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Booked Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Full Name"
                                    onChange={this.handleInputChange}
                                    value={this.state.myEventsList.title}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Pick a Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="start"
                                    onChange={this.handleInputChange}
                                    value={this.state.myEventsList.start}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Pick an End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="end"
                                    onChange={this.handleInputChange}
                                    value={this.state.myEventsList.end}
                                />
                            </Form.Group>
                            <Button
                                variant="dark"
                                size="sm"
                                type="submit"
                                onClick={this.handleSubmit}
                            >
                                Book Appointment
              </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default MyCalendar
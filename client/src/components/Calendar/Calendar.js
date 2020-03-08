import React, { Component } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import CalendarService from "../../services/calendar.service"
//Falta algo para obtener los datos de la mascota
import ScrapServices from '../../services/scrap.service'
import './calendar.css'

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
                this.props.fetchUser()
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
                            <Button variant="light" className="btn-profile" onClick={this.handleShow}>Añadir una cita</Button>
                        </div>
                        <Row>
                            <Col md={12}>
                                <div
                                    style={{ height: "75vh", marginTop: "25px" }}
                                    className="calendar-container">
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
                <Modal size='sm' centered animation={true} show={this.state.showModalWindow} onHide={this.handleClose}>
                    <div className='date-appo'>
                        <form id="form-container" onSubmit={this.handleSubmit}>
                            <div className='box'>
                                <div className='box-form'>
                                    <div className='box-login-tab'></div>
                                    <div className='box-login-title'>
                                        <div className='i i-login'></div>
                                        <div className='i i-login'></div>
                                        <div className='i i-login'></div>
                                    </div>
                                    <div className='box-login'>
                                        <div className='fieldset-body' id='login_form'>
                                            <p className='field'>
                                                <label htmlFor='title'>Título de la cita</label>
                                                <input type='text' id='username' name='title' title='Introduzca título para la cita.' placeholder="Introduzca título para la cita." onChange={this.handleInputChange} value={this.state.myEventsList.title} />
                                            </p>
                                            <p className='field'>
                                                <label htmlFor='start'>Selecciona fecha de inicio</label>
                                                <input type='date' id='start' name='start' title='Introduzca fecha de inicio.' onChange={this.handleInputChange} value={this.state.myEventsList.start} />
                                            </p>
                                            <p className='field'>
                                                <label htmlFor='end'>Selecciona fecha de finalización</label>
                                                <input type='date' id='end' name='end' title='Introduzca fecha de finalización.' onChange={this.handleInputChange} value={this.state.myEventsList.end} />
                                            </p>

                                            <p className='failureMessage'> {this.state.errorMessage}</p>
                                            <p className='link account-message aux-mes' onClick={this.handleClose}>Volver atrás</p>
                                            <input type='submit' id='do_login' value='Añadir cita' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </>
        )
    }
}

export default MyCalendar
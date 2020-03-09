import React, { Component } from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'moment/locale/es'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import CalendarService from '../../services/calendar.service'
import ScrapServices from '../../services/scrap.service'

import './calendar.css'

const localizer = momentLocalizer(moment)
const messages = {
    allDay: 'Todo el dia',
    previous: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Tiempo',
    event: 'Evento',
    showMore: total => `+ Mostrar más (${total})`
}

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
            .then(theDog => {
                this.setState({ dog: { ...this.state.dog, ...theDog.pet }, showEvents: true }, () => this.showPrevEvents())
            })
            .catch(err => console.log(err))
    }

    showPrevEvents = () => {
        let calendarCopy = [...this.state.mybackup]
        let a, b, c
        this.props.loggedInUser.calendar.map(elm => {
            if (elm.start) {
                a = elm.start.substr(0, 10)
                b = elm.title
                c = elm.end.substr(0, 10)
            }
            let aux = {
                title: `${b}`,
                start: new Date(`${a} 00:00:00`),
                end: new Date(`${c} 00:00:00`)
            }
            return calendarCopy.push(aux)
        })
        this.setState({ mybackup: calendarCopy })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.calendarService.postCalendar(this.state.myEventsList[0], this.props.match.params.id)
            .then(() => {
                this.props.fetchUser()
                this.handleClose()
            })
            .catch(err => console.log(err))
        this.showPrevEvents()
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
                        <div style={{ display: "flex", justifyContent: 'center' }}>
                            <Button variant="light" className="btn-profile" onClick={this.handleShow}>Añadir una cita</Button>
                        </div>
                        <Row>
                            <Col md={12}>
                                <div style={{ height: "80vh", marginTop: "25px" }} className="calendar-container">
                                    <Calendar
                                        messages={messages}
                                        culture='es'
                                        localizer={localizer}
                                        events={this.state.mybackup}
                                        startAccessor="start"
                                        endAccessor="end" />
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
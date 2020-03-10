//React imports
import React, { Component } from 'react'
//Bootstrap imports
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//Self-made css import
import './Filter.css'


export default class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                specie: '',
                urgency: ''
            },
            filter: {
                specie: '',
                urgency: ''
            }
        }
    }
    quitFilters = () => this.setState({ form: { specie: '', urgency: '' }, filter: { specieFilter: '', urgencyFilter: '' } }, () => this.props.changeFilters(this.state.filter))

    inputHandler = e => this.setState({ form: { ...this.state.form, [e.target.name]: e.target.id }, filter: { ...this.state.filter, [e.target.name]: e.target.id } }, () => this.props.changeFilters(this.state.filter))

    render() {

        return (
            <div className='filter' style={{ display: 'flex' }}>



                <Form.Group className='mr40' style={{ display: 'flex' }} >

                    <Form.Label className='mr20' htmlFor='specie'>Especie:</Form.Label>


                    <Form.Check className='mr15' checked={this.state.form.specie === 'Perro'} onChange={this.inputHandler}
                        type="radio"
                        label="Perro"
                        name="specie"
                        id="Perro"
                    />


                    <Form.Check className='mr15' checked={this.state.form.specie === 'Gato'} onChange={this.inputHandler}
                        type="radio"
                        label="Gato"
                        name="specie"
                        id="Gato"
                    />



                    <Form.Check className='mr15' checked={this.state.form.specie === 'Otros'} onChange={this.inputHandler}
                        type="radio"
                        label="Otros"
                        name="specie"
                        id="Otros"
                    />

                </Form.Group>

                <Form.Group style={{ display: 'flex' }} >
                    <Form.Label className='mr20' htmlFor='urgency'>Urgencia:</Form.Label>

                    <Form.Check className='mr15' checked={this.state.form.urgency === 'Urgente'} onChange={this.inputHandler}
                        type="radio"
                        label="Urgente"
                        name='urgency'
                        id="Urgente"
                    />


                    <Form.Check className='mr15' checked={this.state.form.urgency === 'En Adopción'} onChange={this.inputHandler}
                        type="radio"
                        label="En Adopción"
                        name="urgency"
                        id="En Adopción"
                    />

                    {(this.state.form.specie.length !== 0 || this.state.form.urgency.length !== 0) && <Button style={{ marginLeft: '80px' }} variant="outline-info" size="sm" onClick={this.quitFilters} >Mostrar Todos</Button>}
                </Form.Group>



            </div >


        )
    }
}
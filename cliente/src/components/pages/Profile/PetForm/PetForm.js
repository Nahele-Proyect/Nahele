import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

export default class PetForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                name: '',//=>
                img: '',//=>
                city: '',//=>
                flag: '',   //Sera por defecto la bandera de españa (Podriamos quitar esto de aqui)
                owner: '', //Sera el usuario actual (Podriamos quitaer esto de aqui y usar el req.user para almacenarlo)
                urgency: '',//=>
                personality: [],
                born: '',
                gender: '',
                size: '',
                weigth: '',
                activity: '',
                vaccinated: '',
                dewormed: '',
                healthy: '',
                sterilized: '',
                indentified: '',
                microchip: '',
                comment: ''
            },
            showMoreForm: false,
        }
    }
    showMoreInfoHandler = () => this.setState({ showMoreForm: !this.state.showMoreForm })

    render() {
        return (
            <Container>
                <h1>Soy el formulario PAPASOTE</h1>
                <Button onClick={ this.showMoreInfoHandler }>{ this.state.showMoreForm ? 'Ocultar opciones extra' : 'Mostrar más opciones' }</Button>
                { this.state.showMoreForm ?
                    <h1>Aqui mostrando mas usuario papasote</h1>
                    :
                    <></>
                }

            </Container>
        )
    }
}
import React, { Component } from 'react'
import ScrapServices from '../../../services/scrap.service'

export default class BasicChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            specie: undefined,
            data: undefined
        }
        this.scrapServices = new ScrapServices()
    }

    componentDidMount = () => {

        Promise.all([this.getSpecie()])
            .then(() => this.setData())
            .catch(err => err)

    }

    getSpecie = () => {
        return this.scrapServices.getAll()
            .then(allPets => allPets.pets.map(elm => elm.specie))
            .then(specie => this.setState({ specie: specie }))
            .catch(err => err)
    }

    setData = () => {
        let arrSpecie = [...this.state.specie]
        let key = []
        arrSpecie.forEach(elm => key.includes(elm) ? null : key.push(elm))

    }

    render() {
        return (
            this.state.data ?
                <div className='basicChart'>

                </div>
                :
                <h1>Cargando el grafico weeeee</h1>
        )
    }
}
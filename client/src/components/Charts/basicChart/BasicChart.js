import React, { Component } from 'react'

import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"

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
            .then(() => this.mountChart())
            .catch(err => err)
    }

    componentWillUnmount = () => this.chart && this.chart.dispose()

    getSpecie = () => {
        return this.scrapServices.getAll()
            .then(allPets => allPets.pets.map(elm => elm.specie))
            .then(specie => this.setState({ specie: specie }))
            .catch(err => err)
    }

    setData = () => {
        let arrSpecie = [...this.state.specie]
        let keySpecie = []
        arrSpecie.forEach(elm => keySpecie.includes(elm) ? null : keySpecie.push(elm))

        const objSpecie = {}
        keySpecie.map(elm => objSpecie[elm] = 0)
        arrSpecie.map(elm => objSpecie[elm] += 1)

        this.setState({ ...this.state.data, data: { specie: keySpecie.map((elm, idx) => { return { Especie: elm, Cantidad: objSpecie[elm], name: 'name' + idx } }) } })
    }

    mountChart = () => {
        let chart = am4core.create("chartdiv", am4charts.PieChart)

        chart.paddingRight = 20
        chart.data = this.state.data.specie

        let pieSeries = chart.series.push(new am4charts.PieSeries())

        pieSeries.dataFields.value = "Cantidad"
        pieSeries.dataFields.category = "Especie"
    }

    render() {
        return (
            this.state.data ?
                <div className='basicChart'>
                    <div id="chartdiv" style={ { width: "100%", height: "500px" } }></div>
                </div>
                :
                <h1>Cargando el grafico weeeee</h1>
        )
    }
}
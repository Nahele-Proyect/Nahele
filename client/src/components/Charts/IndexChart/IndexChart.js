import React, { Component } from 'react'

import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"

export default class IndexChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: undefined
        }
    }

    componentDidMount = () => this.setData()

    componentDidUpdate = () => {
        this.chart && this.chart.dispose()
        this.mountChart()
    }

    componentWillUnmount = () => {
        this.chart && this.chart.dispose()
        this.props.closeModal()
    }

    setData = () => {
        let arrSpecie = [...this.props.pets].map(elm => elm.specie)
        let keySpecie = []
        arrSpecie.forEach(elm => keySpecie.includes(elm) ? null : keySpecie.push(elm))

        const objSpecie = {}
        keySpecie.map(elm => objSpecie[elm] = 0)
        arrSpecie.map(elm => objSpecie[elm] += 1)

        this.setState({ ...this.state.data, data: { specie: keySpecie.map((elm, idx) => { return { Especie: elm, Cantidad: objSpecie[elm] } }) } })
    }

    mountChart = () => {
        this.chart = am4core.create("indexChart", am4charts.PieChart)

        this.chart.paddingRight = 90
        this.chart.paddingLeft = 90
        this.chart.data = this.state.data.specie

        let pieSeries = this.chart.series.push(new am4charts.PieSeries())

        pieSeries.dataFields.value = "Cantidad"
        pieSeries.dataFields.category = "Especie"
    }

    render() {
        return (
            this.state.data ?
                <div className='indexChart'>
                    <div id="indexChart" style={ { width: "100%", height: "500px" } }></div>
                </div>
                :
                <h1>Cargando el grafico weeeee</h1>
        )
    }
}
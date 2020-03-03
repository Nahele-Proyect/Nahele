import React, { Component } from 'react'
import ScrapServices from '../../../services/scrap.service'

import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


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

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
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

        this.setState({ data: key })

    }

    mountChart = () => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;

        let data = [];
        let visits = 10;
        for (let i = 1;i < 366;i++) {
            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }

        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";

        series.tooltipText = "{valueY.value}";
        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;

        this.chart = chart;
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
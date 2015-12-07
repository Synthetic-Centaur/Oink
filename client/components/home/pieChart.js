import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactHighCharts from 'react-highcharts/dist/bundle/highcharts'

class pieChart extends Component {
  render() {
    let config = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Budget'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Microsoft Internet Explorer',
            y: 56.33
        }, {
            name: 'Chrome',
            y: 24.03,
            sliced: true,
            selected: true
        }, {
            name: 'Firefox',
            y: 10.38
        }, {
            name: 'Safari',
            y: 4.77
        }, {
            name: 'Opera',
            y: 0.91
        }, {
            name: 'Proprietary or Undetectable',
            y: 0.2
        }]
      }]
    }

    return (
      <ReactHighCharts config={config} ref="chart"></ReactHighCharts>
    )

  }

  componentDidMount() {
    //here we can access high charts and change data accordingly
  }
}

export default pieChart
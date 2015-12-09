import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactHighCharts from 'react-highcharts/dist/bundle/highcharts'
import chartConfig from './config/chartConfig'

class pieChart extends Component {

  //Making sure pie chart does not refresh whenever input form is changed
  shouldComponentUpdate() {
    return false;
  }

  render() {
    //Call chartconfig to configure highchart with user budget data
    //let config = chartConfig(this.props.budgetData)
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

    //render highChart
    return (
      <ReactHighCharts config={config} ref="chart" />
    )

  }

  //Dynamically change high chart as user adds new budget categories
  componentDidMount() {
    //here we can access high charts and change data accordingly
  }
}

export default pieChart
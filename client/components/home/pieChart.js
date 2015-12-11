import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactHighCharts from 'react-highcharts/dist/bundle/highcharts'
import chartConfig from './config/chartConfig'

class pieChart extends Component {

  // Making sure pie chart does not refresh whenever input form is changed
  shouldComponentUpdate(nextProps) {
    console.log('NEXT PROPS:', nextProps)
    if (this.props.data && nextProps.data) {
      return this.props.data.length !== nextProps.data.length
    } else {
      return true
    }
  }

  componentDidUpdate() {

  }
  render() {
    //Call chartconfig to configure highchart with user budget data
    if (this.props.data) {
      let config = chartConfig(this.props.data)
      //render highChart
      return (
        <ReactHighCharts config={config} ref="chart" />
      )

    } else {
      return (<div/>)
    }
  }

  //Dynamically change high chart as user adds new budget categories
  componentDidMount() {
    //here we can access high charts and change data accordingly
  }
}

export default pieChart

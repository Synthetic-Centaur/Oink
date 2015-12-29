import React, { Component, PropTypes } from 'react'
import chartConfig from './config/chartConfig'

let ReactHighCharts

class SpendingChart extends Component {

  shouldComponentUpdate(nextProps) {

    // prevents redraw when user selects a point on graph
    if (nextProps.selectedDate) {
      return false
    } else {
      return true
    }
  }

  render() {
    let { data, selectDate } = this.props
    let config = {}

    // prevents errors when running tests
    if (window !== undefined) {
      ReactHighCharts = require('react-highcharts/dist/bundle/highcharts')
    }

    if (data) {
      
      // loads configuration object from function call
      config = chartConfig(data, selectDate)
    }
    
    return (
      <div>
        {
          window !== undefined
          ?
          <ReactHighCharts config={config} ref="chart" />
          :
          null
        }
      </div>
    )
  }
}

export default SpendingChart

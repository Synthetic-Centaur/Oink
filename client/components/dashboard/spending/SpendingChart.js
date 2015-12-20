import React, { Component, PropTypes } from 'react'
import chartConfig from './config/chartConfig'

let ReactHighCharts

class SpendingChart extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.selectedDate) {
      return false
    } else {
      return true
    }
  }

  render() {
    let { data, selectDate } = this.props
    let config = {}

    if (window !== undefined) {
      ReactHighCharts = require('react-highcharts/dist/bundle/highcharts')
    }

    if (data) {
      config = chartConfig(data, selectDate)
    }

    
    return (


      <div>
        <ReactHighCharts config = {config}></ReactHighCharts>
      </div>
    )
  }
}

export default SpendingChart
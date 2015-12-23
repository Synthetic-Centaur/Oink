import React, { Component, PropTypes } from 'react'
import chartConfig from './config/chartConfig'

let ReactHighCharts

class SpendingChart extends Component {

  render() {
    let { data } = this.props
    let config = {}

    if (window !== undefined) {
      ReactHighCharts = require('react-highcharts/dist/bundle/highcharts')
    }

    if (data) {
      let transactions = data.transactions
      config = chartConfig(transactions)
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

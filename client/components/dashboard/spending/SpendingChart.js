import React, { Component, PropTypes } from 'react'
import ReactHighcharts from 'react-highcharts'
import chartConfig from './config/chartConfig'

class SpendingChart extends Component {

  render() {
    let { data } = this.props
    let config = {}
    if (data) {
      let transactions = data.transactions
      config = chartConfig(transactions)
    }
    
    return (
      <div>
        <ReactHighcharts config = {config}></ReactHighcharts>
      </div>
    )
  }
}

export default SpendingChart
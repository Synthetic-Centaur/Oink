import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactHighCharts from 'react-highcharts/dist/bundle/highcharts'
import chartConfig from './config/barChartConfig'

class BarChart extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.data.budgets && nextProps.data.budgets) {
      return this.props.data.budgets.length !== nextProps.data.budgets.length
    } else {
      return true
    }
  }

  render() {
    const { data } = this.props
    let config = data.budgets !== undefined ? chartConfig(data.budgets) : null
    return (
        <div>
          {
            data.budgets !== undefined
            ?
            <ReactHighCharts config={config} ref="chart" />
            :
            null
          }
        </div>
      )
  }

}

export default BarChart

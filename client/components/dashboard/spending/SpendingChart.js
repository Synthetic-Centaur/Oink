import React, { Component, PropTypes } from 'react'
import ReactHighcharts from 'react-highcharts'
import chartConfig from './config/chartConfig'

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
    if (data) {
      config = chartConfig(data, selectDate)
    }
    
    return (
      <div>
        <ReactHighcharts config = {config}></ReactHighcharts>
      </div>
    )
  }
}

export default SpendingChart
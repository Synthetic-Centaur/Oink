import React, { Component, PropTypes } from 'react'
import ReactHighcharts from 'react-highcharts'
import config from './config/chartConfig'
class GoalChart extends Component {
  render() {
    
    return (
      <div>
        <ReactHighcharts config = {config}></ReactHighcharts>
      </div>
    )
  }
}

export default GoalChart
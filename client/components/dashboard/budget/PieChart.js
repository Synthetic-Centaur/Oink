// ## Pie chart for visualizing a user's budgets

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ChartTheme from '../../../chart-theme'
import chartConfig from './config/chartConfig'

// Set the styling for the Graph
let ReactHighCharts

class PieChart extends Component {

  // Check if our charts should re-render
  shouldComponentUpdate(nextProps) {

    // If the user has any budgets in state
    if (this.props.data.budgets && nextProps.data.budgets) {
      let oldBudget = this.props.data.budgets
      let newBudget = nextProps.data.budgets
      
      // If there are more budgets than previously, update the chart
      if (oldBudget.length !== newBudget.length) { return true }

      // If the value of the target or actual has changed, update the chart
      return oldBudget.reduce((bool, budget, i) => {
        return budget.target !== newBudget[i].target || budget.actual !== newBudget[i].actual ? true : bool
      }, false)

    } else {
      return true
    }
  }

  render() {
    const { data } = this.props
    let config = data.budgets !== undefined ? chartConfig(data.budgets) : null

    // This check is required for our testing enviroment due to the fact that there is no DOM when tests run
    if (window !== undefined) {
      ReactHighCharts = require('react-highcharts/dist/bundle/highcharts')
      ReactHighCharts.Highcharts.setOptions(ChartTheme)
    }

    return (
        <div>
          {
            data.budgets !== undefined && window !== undefined
            ?
            <ReactHighCharts config={config} ref="chart" />
            :
            null
          }
        </div>
      )
  }
}

// Specify what props are required by the component
PieChart.propTypes = {
  data: PropTypes.object.isRequired
}

export default PieChart

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactHighCharts from 'react-highcharts/dist/bundle/highcharts'
import ChartTheme from '../../../chart-theme'
import chartConfig from './config/chartConfig'

// Set the styling for the Graph
ReactHighCharts.Highcharts.setOptions(ChartTheme)

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

export default PieChart

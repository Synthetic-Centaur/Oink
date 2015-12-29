import React, { Component, PropTypes } from 'react'
import chartConfig from './config/chartConfig'
import ChartTheme from '../../../chart-theme'

let ReactHighCharts

class GoalChart extends Component {

  checkSelectedGoal(curProps, newProps) {
    let curGoal = curProps.data.goals[curProps.goalPage.selectedGoal - 1]
    let nextGoal = newProps.data.goals[newProps.goalPage.selectedGoal - 1]
    if (curProps.selectedAvg !== newProps.selectedAvg || curGoal.id !== nextGoal.id || curGoal.amount !== nextGoal.amount) {
      return true
    } else {
      return false
    }
  }

  shouldComponentUpdate(nextProps) {

    // this prevents graph from redrawing with state changes on rest of dashboard view
    if (this.props.data && nextProps.data && this.props.goalPage.selectedGoal && nextProps.goalPage.selectedGoal) {
      return this.checkSelectedGoal(this.props, nextProps)
    } else {
      return true
    }
  }

  render() {
    let { data } = this.props

    // prevents errors when running testing
    if (window !== undefined) {
      ReactHighCharts = require('react-highcharts/dist/bundle/highcharts')
      ReactHighCharts.Highcharts.setOptions(ChartTheme)
    }

    let config = {}

    if (data.goals.length > 0) {
      let goal = data.goals[this.props.goalPage.selectedGoal - 1]
      let net = data.avgNet
      let avg = this.props.goalPage.selectedAvg / 30

      // generates config options from function
      config = chartConfig(goal, net, avg)
    }
    
    return (
      <div>
          {

            // prevents errors when running testing
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

export default GoalChart

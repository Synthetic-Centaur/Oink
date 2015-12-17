import React, { Component, PropTypes } from 'react'
import ReactHighcharts from 'react-highcharts'
import chartConfig from './config/chartConfig'
class GoalChart extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.goalPage.selectedGoal && nextProps.goalPage.selectedGoal) {
      return (this.props.goalPage.selectedGoal !== nextProps.goalPage.selectedGoal || this.props.goalPage.selectedAvg !== nextProps.goalPage.selectedAvg)
    } else {
      return true
    }
  }

  render() {
    let { data } = this.props
    let config = {}
    if (data.goals.length > 0) {
      let goal = data.goals[this.props.goalPage.selectedGoal - 1]
      let net = data.avgNet
      let avg = this.props.goalPage.selectedAvg / 30
      config = chartConfig(goal, net, avg)
    }
    
    return (
      <div>
        <ReactHighcharts config = {config}></ReactHighcharts>
      </div>
    )
  }
}

export default GoalChart
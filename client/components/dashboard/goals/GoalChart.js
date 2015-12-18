import React, { Component, PropTypes } from 'react'
import ReactHighcharts from 'react-highcharts'
import chartConfig from './config/chartConfig'
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
    if (this.props.data && nextProps.data && this.props.goalPage.selectedGoal && nextProps.goalPage.selectedGoal) {
      return this.checkSelectedGoal(this.props, nextProps)
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
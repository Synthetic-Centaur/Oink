import React, { Component, PropTypes } from 'react'
import moment from 'moment'

class MessageCenter extends Component {
  render() {
    const { data } = this.props
    let message = 'Welcome to Oink! I see that you don\'t currently have a goal.  Please create a goal on the right.'
    if (data.goals[this.props.selectedGoal - 1] !== undefined) {
      let goal = data.goals[this.props.selectedGoal - 1]
      let start = moment(goal.goalStarted)
      let avg = Math.min(data.avgNet.lastMonth, data.avgNet.lastThree, data.avgNet.lastSix, data.avgNet.lastYear)
      
      let end = moment(goal.goalStarted).add((goal.amount / (-avg / 30)), 'days')
      message = 'You are saving for ' + goal.description + ', and you need to save $' + goal.amount + ' to achieve this. \
        Based on current savings of $' + -avg.toFixed(2) + ' you should achieve this by ' + moment(end).format('MMMM Do, YYYY') + '.'
    }

    return (
      <div>
        <h5> {message} </h5>
      </div>
    )
  }
}

export default MessageCenter
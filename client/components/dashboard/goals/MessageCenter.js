import React, { Component, PropTypes } from 'react'
import moment from 'moment'

class MessageCenter extends Component {
  render() {
    const { data } = this.props
    let message = "not selected, please select one to the right"
    if ( data.goals[this.props.selectedGoal] !== undefined ) {
      let goal = data.goals[this.props.selectedGoal]
      message = "You are saving for " + goal.description + ", and you need to save $" + goal.amount + " to achieve this. \
        Based on current spending you should achieve this by " + moment(goal.goalBy).format("MMMM Do, YYYY")
    }
    return (
      <div>
        <h5> {message} </h5>
      </div>
    )
  }
}

export default MessageCenter
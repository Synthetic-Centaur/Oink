import React, { Component, PropTypes } from 'react'

class MessageCenter extends Component {
  render() {
    const { data } = this.props
    let selectedGoal = this.props.selectedGoal
    console.log(data.goals[{selectedGoal}].description)
    return (
      <div>
        <h5> This is my Message Center, current goal is { data.goals[0].description} </h5>
      </div>
    )
  }
}

export default MessageCenter
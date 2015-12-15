import React, { Component, PropTypes } from 'react'
import { DatePicker, DatePickerDialog, TextField, RaisedButton } from 'material-ui'

class GoalConfigurer extends Component {

  handleGoal(e) {
    e.preventDefault()

    let description = this.refs.description.getValue()
    let amount = parseInt(this.refs.amount.getValue())
    let goalBy = this.refs.goalBy.getValue()

    this.props.postGoal({
      description,
      amount,
      goalBy
    })

    this.refs.amount.setValue('')
    this.refs.category._setSelectedIndex(0)
  }

  render() {
    return (
      <div className="container">
        <div className = "row">
          <h5> Create a goal </h5>
        </div>
        <div className = "row">
          <TextField
            ref="description"
            hintText="What is your goal?" />
        </div>
        <div className = "row">
          <TextField
            ref="amount"
            hintText="How much would you like to save?" />
        </div>
        <DatePicker
          ref="goalBy"
          hintText="When do you want your goal by?"
          mode="landscape"/>
        <div className = "row">
          <RaisedButton label="Submit"
           onClick={this.handleGoal.bind(this)}/>
        </div>
        <br/>
      </div>
    )
  }
}

export default GoalConfigurer
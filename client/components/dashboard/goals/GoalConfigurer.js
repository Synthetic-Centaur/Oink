import React, { Component, PropTypes } from 'react'
import { DatePicker, DatePickerDialog, TextField, RaisedButton } from 'material-ui'

class GoalConfigurer extends Component {

  handleGoal(e) {
    e.preventDefault()

    let description = this.refs.description.getValue()
    let amount = parseInt(this.refs.amount.getValue())
    let goalBy = JSON.stringify(this.refs.goalBy.getDate())
    let goal = {
      description,
      amount,
      goalBy
    }
    console.log('POSTING THIS: ', goal)
    this.props.postGoal(goal)

    this.refs.amount.setValue('')
    this.refs.description.setValue('')
    this.refs.goalBy.setDate('')
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
        <div className = "row">
          <DatePicker
            ref="goalBy"
            hintText="When do you want your goal by?"
            />
        </div>
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
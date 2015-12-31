import React, { Component, PropTypes } from 'react'
import { DatePicker, DatePickerDialog, TextField, RaisedButton } from 'material-ui'
import moment from 'moment'

class GoalAdd extends Component {

  handleEntry(e) {

    // Ensure that type is correct on input and all input provided
    if (this.refs.amount.getValue() !== undefined && !isNaN(parseInt(this.refs.amount.getValue())) && this.refs.description.getValue() !== undefined && this.refs.goalBy.getDate() !== undefined) {
      this.props.validateGoal(true)
    } else {
      this.props.validateGoal(false)
    }
  }
  
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

    if (this.props.isValid) {
      this.props.postGoal(goal)

      // Hides add goal component on addition
      this.props.changeGoalView('')
    }
  }

  render() {

    // Prevents user from creating a goal before tomorrow
    let tomorrow = moment().add(1, 'days').toDate()
    return (
      <div>
        <div className="row">
          <TextField
            fullWidth={true}
            ref="description"
            hintText="What is your goal?"
            onChange={this.handleEntry.bind(this)}
          />
        </div>
        <div className="row">
          <TextField
            fullWidth={true}
            ref="amount"
            hintText="How much would you like to save?"
            onChange={this.handleEntry.bind(this)}
          />
        </div>
        <div className="row">
          <DatePicker
            fullWidth={true}
            ref="goalBy"
            autoOk={true}
            minDate={tomorrow}
            hintText="When do you want your goal by?"
            onChange={this.handleEntry.bind(this)}
            />
        </div>
        <br />
        <div className="row">
          <RaisedButton
            label="CREATE"
            disabled={(!this.props.isValid)}
            primary={true}
            onClick={this.handleGoal.bind(this)}
          />
        </div>
        <br />
      </div>
    )
  }
}

export default GoalAdd
import React, { Component, PropTypes } from 'react'
import { DatePicker, DatePickerDialog, TextField, RaisedButton } from 'material-ui'
import moment from 'moment'

class GoalUpdate extends Component {

  handleEntry(e) {
    if (this.refs.amount.getValue() !== undefined && !isNaN(parseInt(this.refs.amount.getValue())) && this.refs.description.getValue() !== undefined && this.refs.goalBy.getDate() !== undefined) {
      this.props.validateGoal(true)
    } else {
      this.props.validateGoal(false)
    }
  }

  deleteGoal(e) {
    const { data } = this.props
    let id = data.goals[this.props.selectedGoal - 1].id
    e.preventDefault()
    this.props.deleteGoal(id)

    // dispatches state change to return to defaults
    this.props.changeGoalView('')
    this.props.switchGoal(1)
    this.props.selectAvg(0)
  }
  
  handleGoal(e) {
    e.preventDefault()
    const { data } = this.props

    let description = this.refs.description.getValue()
    let amount = parseInt(this.refs.amount.getValue())
    let goalBy = JSON.stringify(this.refs.goalBy.getDate())
    let id = data.goals[this.props.selectedGoal - 1].id
    let goal = {
      description,
      amount,
      goalBy,
      id
    }

    if (this.props.isValid) {
      this.props.updateGoal(goal)
      this.props.changeGoalView('')
    }
  }

  render() {
    const { data } = this.props
    let goal = data.goals[this.props.selectedGoal - 1]

    // prevents user from changing goal to anything before tomorrow
    let tomorrow = moment().add(1, 'days').toDate()

    return (
      <div>
        <div className = 'row'>
          <TextField
            fullWidth={true}
            ref='description'
            defaultValue={goal.description}
            hintText='What is your goal?'
            onChange={this.handleEntry.bind(this)} />
        </div>
        <div className = 'row'>
          <TextField
            fullWidth={true}
            ref='amount'
            defaultValue={goal.amount}
            hintText='How much would you like to save?'
            onChange={this.handleEntry.bind(this)}/>
        </div>
        <div className = 'row'>
          <DatePicker
            fullWidth={true}
            ref='goalBy'
            autoOk={true}
            defaultDate = {moment(goal.goalBy).toDate()}
            minDate={tomorrow}
            hintText='When do you want your goal by?'
            onChange={this.handleEntry.bind(this)}
            />
        </div>
        <br/>
        <div className = 'row'>
          <div className='u-pull-left'>
            <RaisedButton label='Update' disabled={(!this.props.isValid)}
              onClick={this.handleGoal.bind(this)}/>
          </div>
          <div className='u-pull-right'>
           <RaisedButton label='DELETE' secondary={true} onClick={this.deleteGoal.bind(this)}/>
          </div>
        </div>
        <br/>
      </div>
    )
  }
}

export default GoalUpdate
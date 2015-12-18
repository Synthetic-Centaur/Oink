import React, { Component, PropTypes } from 'react'
import { DatePicker, DatePickerDialog, TextField, RaisedButton } from 'material-ui'
import moment from 'moment'
import GoalAdd from './GoalAdd'
import GoalUpdate from './GoalUpdate'

class GoalConfigurer extends Component {

  switchView() {
    const { goalPage, data, actions } = this.props
    switch (goalPage.goalView) {
      case 'CREATE':
        return <GoalAdd 
                data = { data }
                isValid = { goalPage.isValid }
                validateGoal = { actions.validateGoal }
                postGoal = { actions.postGoal }
                changeGoalView = { actions.changeGoalView } />
      case 'EDIT' :
        return <GoalUpdate
                data = { data }
                isValid = { goalPage.isValid }
                selectedGoal = { goalPage.selectedGoal }
                updateGoal = { actions.updateGoal }
                deleteGoal = { actions.deleteGoal }
                changeGoalView = { actions.changeGoalView }
                validateGoal = { actions.validateGoal } />
      default: 
        return <br/>
    }

  }

  changeView(view) {
    this.props.actions.changeGoalView(view)
  }

  render() {
    const { actions, goalPage, data } = this.props
    let editValid = data.goals.length > 0 ? false: true
    return (
      <div className="container">
        <div className="row">
          <h5>Goal Management</h5>
        </div>

        <div className="row">
          <div className=" u-pull-left">
            <RaisedButton label="Create" onTouchTap={this.changeView.bind(this, 'CREATE')} />
          </div>
          <div className=" u-pull-right">
            <RaisedButton label="Edit" secondary={true} disabled ={editValid} onTouchTap={this.changeView.bind(this, 'EDIT')} />
          </div>
        </div>
        { this.switchView() }
      </div>
    )
  }
}

export default GoalConfigurer
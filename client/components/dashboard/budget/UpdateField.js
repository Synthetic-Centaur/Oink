// ## Field row in budget management console to change or delete a budget

import React, { Component, PropTypes } from 'react'
import { TextField, RaisedButton, ListDivider } from 'material-ui'

export class UpdateField extends React.Component {
  componentWillUnmount() {
    const { showBudget } = this.props

    showBudget(null)
  }

  handleSave(e) {
    e.preventDefault()

    const { currentBudget, data, postBudget, changeSettingsView } = this.props

    let category = data.budgets[currentBudget.index].description
    let budget = parseInt(this.refs.amount.getValue())

    postBudget({
      category: category,
      budget: budget
    })

    changeSettingsView('ADD')
  }

  handleDelete(e) {
    e.preventDefault()

    const { currentBudget, data, deleteBudget, changeSettingsView } = this.props

    let category = data.budgets[currentBudget.index].description

    deleteBudget({
      category: category,
    })

    changeSettingsView('ADD')
  }

  render() {
    const { currentBudget, data } = this.props
    let title = data.budgets[currentBudget.index].description
    let amount = data.budgets[currentBudget.index].target.toString()

    return (
      <div className="budget-fields">
      
        <span className="budget-title">{ title }</span>

        <div className="row">
          <TextField
            ref="amount"
            hintText="Amount"
            defaultValue={amount}
          />
        </div>

        <div className="row">

          <div className="u-pull-left">
            <RaisedButton
              label="SAVE"
              onTouchTap={this.handleSave.bind(this)}
            />
          </div>

          <div className="u-pull-right">
            <RaisedButton
              label="DELETE"
              primary={true}
              onTouchTap={this.handleDelete.bind(this)}
            />
          </div>

        </div>

      </div>
    )
  }
}

// Specify what props are required by the component
UpdateField.propTypes = {
  changeSettingsView: PropTypes.func.isRequired,
  postBudget: PropTypes.func.isRequired,
  deleteBudget: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  currentBudget: PropTypes.object.isRequired,
  showBudget: PropTypes.func.isRequired
}

export default UpdateField

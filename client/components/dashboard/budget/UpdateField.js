import React, { Component, PropTypes } from 'react'
import { TextField, RaisedButton, ListDivider } from 'material-ui'

export class UpdateField extends React.Component {
  componentWillUnmount() {
    const { showBudget } = this.props

    showBudget(null)
  }

  handleSave() {

  }

  handleDelete() {

  }

  render() {
    const { currentBudget, data } = this.props
    let title = data.budgets[currentBudget.index].description
    let amount = data.budgets[currentBudget.index].target.toString()

    return (
      <div>
      
        <span className="budget-title">{ title }</span>

        <div className="row">
          <TextField
            hintText="Amount"
            defaultValue={ amount }
          />
        </div>

        <div className="row">

          <div className="u-pull-left">
            <RaisedButton label="SAVE" />
          </div>

          <div className="u-pull-right">
            <RaisedButton label="DELETE" primary={true} />
          </div>

        </div>

      </div>
    )
  }
}

export default UpdateField

// ## Budget Management Console with Create, Update, Delete functionality

import React, { Component, PropTypes } from 'react'
import { List, ListDivider, ListItem, Paper, RaisedButton } from 'material-ui'
import BudgetCategories from './BudgetCategories'
import BudgetList from './BudgetList'
import UpdateField from './UpdateField'

export class OptionsBar extends React.Component {
  renderView() {
    const { actions, homePage, data, budgetPage } = this.props
    switch (budgetPage.settingsView) {
      case 'ADD':
        return (
            <BudgetCategories className="add-budget-form"
              data={data}
              postBudget={actions.postBudget}
              numberValidation={actions.numberValidation}
              categoryValidation={actions.categoryValidation}
              numberError={homePage.numberError}
              categoryError={homePage.categoryError}
              category={homePage.category}
            />
          )
      case 'EDIT':
        return (
            <BudgetList
              data={data}
              editBudget={actions.changeSettingsView}
              showBudget={actions.changeCurrentBudget}
            />
          )
      case 'UPDATE':
        return (
            <UpdateField
              changeSettingsView={actions.changeSettingsView}
              postBudget={actions.postBudget}
              deleteBudget={actions.deleteBudget}
              data={data}
              currentBudget={budgetPage.currentBudget}
              showBudget={actions.changeCurrentBudget}
            />
          )

      default:
        return <div />
    }
  }

  changeView(view) {
    const { actions } = this.props
    actions.changeSettingsView(view)
  }

  render() {
    const { actions, homePage, data } = this.props

    return (
      <div className="options-bar container">

        <div className="row">
          <h5>Budget Management</h5>
        </div>

        <div className="row">

          <div className="u-pull-left">
            <RaisedButton
              label="ADD"
              primary={true}
              onTouchTap={this.changeView.bind(this, 'ADD')}
            />
          </div>

          <div className="u-pull-right">
            <RaisedButton
              label="EDIT"
              secondary={true}
              onTouchTap={this.changeView.bind(this, 'EDIT')}
            />
          </div>

        </div>

        { this.renderView() }

      </div>
    )
  }
}

// Specify what props are required by the component
OptionsBar.propTypes = {
  actions: PropTypes.object.isRequired,
  budgetPage: PropTypes.object.isRequired,
  homePage: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

export default OptionsBar

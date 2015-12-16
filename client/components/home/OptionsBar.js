import React, { Component, PropTypes } from 'react'
import { List, ListDivider, ListItem, Paper } from 'material-ui'
import BudgetCategories from './BudgetCategories'

export class OptionsBar extends React.Component {
  render() {
    const { actions, homePage, data } = this.props

    return (
      <Paper zDepth={1} className="options-bar">
        <BudgetCategories className="add-budget-form"
          data = { data }
          postBudget={ actions.postBudget }
          numberValidation={ actions.numberValidation }
          categoryValidation={ actions.categoryValidation }
          numberError={ homePage.numberError }
          categoryError={ homePage.categoryError }
          category={ homePage.category }
        />
      </Paper>
    )
  }
}

export default OptionsBar

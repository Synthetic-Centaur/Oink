import React, { Component, PropTypes } from 'react'
import { List, ListDivider, ListItem, Paper } from 'material-ui'

class BudgetList extends Component {
  handleEdit(index) {
    const { editBudget, showBudget } = this.props
    
    editBudget('UPDATE')
    showBudget(index)
  }

  render() {
    const { data } = this.props

    let budgets = data.budgets.map((budget, i) => {
      return (
          <ListItem
            key={i}
            primaryText={ `${budget.description} - $${budget.target}` }
            rightIconButton={
              <i className='material-icons'
                onTouchTap={this.handleEdit.bind(this, i)}>mode_edit
              </i>
            }
          />
        )
    })

    return (
      <List>
        { budgets }
      </List>
    )
  }
}

export default BudgetList

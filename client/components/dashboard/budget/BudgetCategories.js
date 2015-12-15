import React, { Component, PropTypes } from 'react'
import DropDownMenu from 'material-ui/lib/drop-down-menu'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import { List, ListDivider, ListItem, Paper } from 'material-ui'

class BudgetCategories extends React.Component{

  //Refresh state to undisable form
  componentDidUpdate() {
  }

  //form-validation for input field/budget amount
  handleNumError(e) {
    var value = e.target.value
    var isNumeric = !isNaN(parseFloat(value)) && isFinite(value)
    
    this.props.numberValidation(isNumeric)
  }

  //form-validation for drop-down field/budget category
  handleCatError(e) {
    var value = e.target.value
    var isChosen = value !== 'Choose a category' ? false : true

    this.props.categoryValidation(isChosen, value)
  }

  //send budget to server and update state
  handleBudget(e) {
    e.preventDefault()

    let category = this.props.category
    let budget = parseInt(this.refs.amount.getValue())

    this.props.postBudget({
      category: category,
      budget: budget
    })

    this.refs.amount.setValue('')
    this.refs.category._setSelectedIndex(0)
  }

  render() {
    const { data } = this.props
    let menuItems = [{ payload: 'Choose a category', text: 'Choose a category'}]

    if (data.categories !== undefined) {
      let categories = data.categories.map((category) => {
        return {payload: category, text: category}
      })
      menuItems = menuItems.concat(categories)
    }

    return (
      <div className="container">
        <div className="row">
          <DropDownMenu className="category-dropdown"
            ref="category"
            autoWidth={false}
            style={{
              width: '100%',
            }}
            menuItems={menuItems}
            errorText="Please choose a category."
            onChange={this.handleCatError.bind(this)} />
        </div>
        <div className="row">
          <TextField
            fullWidth={true}
            ref="amount"
            hintText="Enter a sum"
            onChange={this.handleNumError.bind(this)} />
        </div>
        <div className="row">
          <RaisedButton className="submit-budget-button"
            ref="input"
            label="Add new category"
            disabled={this.props.numberError || this.props.categoryError}
            onClick={this.handleBudget.bind(this)} />
        </div>
      </div>
    )
  }

}

export default BudgetCategories

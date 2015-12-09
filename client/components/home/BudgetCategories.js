import React, { Component, PropTypes } from 'react'
import DropDownMenu from 'material-ui/lib/drop-down-menu'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

class budgetCategories extends React.Component{

  //Refresh state to undisable form
  componentDidUpdate() {
    console.log("is component updating? ", this.props)
  }

  //form-validation for input field/budget amount
  handleNumError(e) {
    var value = e.target.value;
    var isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    // this.setState({
    //   numError: isNumeric ? false : true
    // })
    this.props.numberValidation(isNumeric)
  }

  //form-validation for drop-down field/budget category
  handleCatError(e) {
    var value = e.target.value;
    var isChosen = value !== 'Choose a category' ? false : true
    // this.setState({
    //   catError: value !== 'Choose a category' ? false : true,
    //   category: value
    // })
    this.props.categoryValidation(isChosen, value)

  }

  //send budget to server and update state
  handleBudget(e) {
    e.preventDefault()

    let category = this.state.category
    let budget = this.refs.amount.getValue()

    this.props.postBudget({
      category: category,
      budget: budget
    });
  }

  render() {
    console.log(this.props);
    let menuItems = [
      { payload: 'Choose a category', text: 'Choose a category'},
      { payload: 'Option 1', text: 'Option 1'},
      { payload: 'Option 2', text: 'Option 2'}
    ]
    return (
      <form className="u-pull-right">
        <div className="row">
          <DropDownMenu 
            ref="category"
            menuItems={menuItems}
            errorText="Please choose a category."
            onChange={this.handleCatError.bind(this)} />
        </div>
        <div className="row">
          <TextField 
            ref="amount" 
            hintText="Enter a sum"
            defaultValue="abc"
            onChange={this.handleNumError.bind(this)} />
        </div>
        <div className="row" className="four columns">
          <RaisedButton 
            ref="input"
            className="two columns offset-by-two"
            label="Add new category"
            disabled={this.props.numberError || this.props.categoryError}
            onClick={this.handleBudget.bind(this)} />
        </div>
      </form>
    )
  }

}

export default budgetCategories
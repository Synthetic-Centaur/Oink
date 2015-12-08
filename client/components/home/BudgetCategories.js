import React, { Component, PropTypes } from 'react'
import DropDownMenu from 'material-ui/lib/drop-down-menu'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

class budgetCategories extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      numError: true,
      catError: true,
      numErrorText: 'Please enter a number.',
      catErrorText: 'Please choose a category.',
      category: ''
    };
  }

  handleNumError(e) {
    var value = e.target.value;
    var isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      numError: isNumeric ? false : true
    })
  }

  handleCatError(e) {
    var value = e.target.value;
    this.setState({
      catError: value !== 'Choose a category' ? false : true,
      category: value
    })

  }

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
    let menuItems = [
      { payload: 'Choose a category', text: 'Choose a category'},
      { payload: 'Option 1', text: 'Option 1'},
      { payload: 'Option 2', text: 'Option 2'}
    ]
    return (
      <form>
        <div className="row">
          <DropDownMenu 
            ref="category"
            menuItems={menuItems}
            errorText={this.state.catErrorText}
            onChange={this.handleCatError.bind(this)} />
        </div>
        <div className="row">
          <TextField 
            ref="amount" 
            hintText="Enter a sum"
            errorText={this.state.numErrorText}
            defaultValue="abc"
            onChange={this.handleNumError.bind(this)} />
        </div>
        <div className="row">
          <RaisedButton 
            label="Add new category"
            disabled={this.state.numError || this.state.catError}
            onClick={this.handleBudget.bind(this)} />
        </div>
      </form>
    )
  }

}

export default budgetCategories
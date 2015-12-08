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
      catErrorText: 'Please choose a category.'
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
      catError: value > 1 ? false : true
    })
  }

  handleBudget(e) {
    e.preventDefault

    let category = this.refs.category.getValue()
    let budget = this.refs.amount.getValue()

    this.props.postBudget({
      category: category,
      buget: budget
    });
  }

  render() {
    let menuItems = [
      { payload: '1', text: 'Choose a category'},
      { payload: '2', text: 'Option 1'},
      { payload: '3', text: 'Option 2'}
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
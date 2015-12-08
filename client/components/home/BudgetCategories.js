import React, { Component, PropTypes } from 'react'
import DropDownMenu from 'material-ui/lib/drop-down-menu'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

class budgetCategories extends React.Component{
  constructor (props) {
    super(props);
    this.state = {floatingError2Text: 'This field must be numeric.'};
  }

  handleFloating2ErrorInputChange(e) {
    // var input = this.refs.amount.getValue()
    // var z1 = /^[0-9]*$/;
    // if (!z1.test(input)) { 

    // }
    var value = e.target.value;
    var isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    console.log(isNumeric);
    this.setState({
      floatingError2Text: isNumeric ? '' : 'This field must be numeric.'
    })
  }

  render() {
    let menuItems = [
      { payload: '1', text: 'Categories'}
    ]
    return (
      <form>
        <div className="row">
          <DropDownMenu menuItems={menuItems}/>
        </div>
        <div className="row">
          <TextField 
            ref="amount" 
            hintText="Enter a sum"
            errorText={this.state.floatingError2Text}
            defaultValue="abc"
            onChange={this.handleFloating2ErrorInputChange.bind(this)} />
        </div>
        <div className="row">
          <RaisedButton 
            label="Add new category"
            disabled={this.state.floatingError2Text} />
        </div>
      </form>
    )
  }

}

export default budgetCategories
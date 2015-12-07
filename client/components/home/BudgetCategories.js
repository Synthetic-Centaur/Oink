import React, { Component, PropTypes } from 'react'
import DropDownMenu from 'material-ui/lib/drop-down-menu'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

class budgetCategories extends Component {
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
          <TextField ref="amount" hintText="Enter a sum"/>
        </div>
        <div className="row">
          <RaisedButton label="Add new category"/>
        </div>
      </form>
    )
  }
}

export default budgetCategories
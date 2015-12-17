import React, { Component, PropTypes } from 'react'
import { List, ListDivider, ListItem, TextField, RaisedButton, FontIcon } from 'material-ui'

export class AccountSettingsField extends React.Component {

  handleEditStart(key) {
    this.props.editStart(key)
  }

  handleEditFinish(key) {
    this.props.editFinish(key)
  }

  renderEdit(item, i) {
    return (
      <tr key={i}>
        <td>
          <ListItem primaryText={ item.title } disabled={true} />
        </td>
        <td>
          <TextField
            ref = {item.key}
            defaultValue= {item.property}
          />
        </td>
        <td>
          <FontIcon hoverColor='red' className='material-icons' onTouchTap={this.handleEditFinish.bind(this, item.key)} > close </FontIcon>
        </td>
      </tr>
    )
  }

  renderSave(item, i) {    
    return (
      <tr key={i}>
        <td>
          <ListItem primaryText={ item.title } disabled={true} />
        </td>
        <td>
          <ListItem
            ref={item.key}
            secondaryText={ item.property }
            disabled={true}
          />
        </td>
        <td>
          <FontIcon hoverColor='red' className='material-icons' onTouchTap={this.handleEditStart.bind(this, item.key)} > mode_edit </FontIcon>
        </td>
      </tr>
    )
  }

  renderItem(item, i) {
    if (item.editing) {
      return this.renderEdit(item, i)
    }
    return this.renderSave(item, i)
  }

  // handleSettings(e) {
  //   e.preventDefault()

  //   let firstName = this.refs.FRIST_NAME.getValue()
  //   let lastName = this.refs.LAST_NAME.getValue()
  //   let email = this.refs.EMAIL.getValue()

  //   this.props.postSettings({
  //     firstName: firstName,
  //     lastName: lastName,
  //     email: email
  //   })
  // }
  
  render() {
    return (
      <table className="ten columns offset-by-one" style={{border: '0px'}}>
        <tbody>
          {this.props.userData.map(this.renderItem, this)}
        </tbody>
      </table>
    )
  }
}

export default AccountSettingsField

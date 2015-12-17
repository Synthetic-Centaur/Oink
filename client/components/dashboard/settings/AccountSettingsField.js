import React, { Component, PropTypes } from 'react'
import { List, ListDivider, ListItem, TextField, RaisedButton, FontIcon } from 'material-ui'

export class AccountSettingsField extends React.Component {

  componentDidUpdate() {
    this.render()
  }

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
            onChange={this.updateAccountSettings.bind(this, item)}
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

  updateAccountSettings(item) {

    let keyToValue = {
      'FIRST_NAME': 'first_name',
      'LAST_NAME': 'last_name',
      'EMAIL': 'email'
    }

    let itemName = keyToValue[item.key]
    let itemVal = this.refs[item.key].getValue()

    let itemToUpdate = {}

    itemToUpdate[itemName] = itemVal

    this.props.updateAccountSettings(itemToUpdate)
  }

  updateCommunicationSettings() {
    let phoneNumber = this.refs.PHONE_NUMBER.getValue()

    this.props.updateCommunicationSettings({
      firstName: phoneNumber
    })
  }
  
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

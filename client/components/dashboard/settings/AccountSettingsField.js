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
          <FontIcon hoverColor='#ff1970' className='material-icons' onTouchTap={this.handleEditFinish.bind(this, item.key)} > close </FontIcon>
        </td>
      </tr>
    )
  }

  renderEditPhone(item, i) {
    //let error = this.props.accountData ? this.props.accountData.errorText : ''
    return (
      <tr key={i}>
        <td>
          <ListItem primaryText={ item.title } disabled={true} />
        </td>
        <td>
          <TextField
            ref = {item.key}
            defaultValue= {item.property}
            errorText={this.props.accountData.errorText}
            onChange={this.updateAccountSettings.bind(this, item)}
          />
        </td>
        <td>
          <FontIcon hoverColor='#ff1970' className='material-icons' onTouchTap={this.handleEditFinish.bind(this, item.key)} > close </FontIcon>
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
            secondaryText={ item.property }
            disabled={true}
          />
        </td>
        <td>
          <FontIcon hoverColor='#ff1970' className='material-icons' onTouchTap={this.handleEditStart.bind(this, item.key)} > mode_edit </FontIcon>
        </td>
      </tr>
    )
  }

  renderItem(item, i) {
    if (item.editing) {
      return item.key === 'PHONE_NUMBER' ? this.renderEditPhone(item, i) : this.renderEdit(item, i)
    }

    return this.renderSave(item, i)
  }

  parsePhoneNumber(num) {
    num = num.replace(/\D/g, '')

    if (num.length === 10) {
      return num
    }
    
    return 'ERROR'
  }

  updateAccountSettings(item) {

    let updateFields = {}

    if (this.refs.FIRST_NAME) {
      updateFields.first_name = this.refs.FIRST_NAME.getValue()
    }

    if (this.refs.LAST_NAME) {
      updateFields.last_name = this.refs.LAST_NAME.getValue()
    }

    if (this.refs.EMAIL) {
      updateFields.email = this.refs.EMAIL.getValue()
    }
    
    if (this.refs.PHONE_NUMBER) {
      let parsedNum = this.parsePhoneNumber(this.refs.PHONE_NUMBER.getValue())

      if (parsedNum === 'ERROR') {
        updateFields.errorText = 'Please enter ten digit phone number'
      } else {
        updateFields.phone_number = parsedNum
        updateFields.phone_verified = false
        updateFields.errorText = ''
      }
    }

    this.props.updateAccountSettings(updateFields)
  }

  updateCommunicationSettings() {
    let phoneNumber = this.refs.PHONE_NUMBER.getValue()

    this.props.updateCommunicationSettings({
      firstName: phoneNumber
    })
  }
  
  render() {
    return (
      <table className="ten columns offset-by-one">
        <tbody>
          {this.props.userData.map(this.renderItem, this)}
        </tbody>
      </table>
    )
  }
}

export default AccountSettingsField

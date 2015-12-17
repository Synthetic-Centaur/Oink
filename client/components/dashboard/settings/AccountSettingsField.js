import React, { Component, PropTypes } from 'react'
import { List, ListDivider, ListItem, TextField, RaisedButton, FontIcon } from 'material-ui'

export class AccountSettingsField extends React.Component {

  renderFristName() {
    console.log('rendering first name', this.props.editingFirstName)
    let test = this.props.editingFirstName || false
    if (test) {
      return <TextField ref="firstName" hintText="First Name"/>
    }
    return <span>{this.props.firstName}</span>
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
            ref = {item.property}
            defaultText= {item.property}
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

  handleSettings(e) {
    e.preventDefault()

    let firstName = this.refs.firstName.getValue()
    let lastName = this.refs.lastName.getValue()
    let email = this.refs.email.getValue()
    let phone = this.refs.phone.getValue()
    let password = this.refs.password.getValue()

    this.props.signup({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password
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

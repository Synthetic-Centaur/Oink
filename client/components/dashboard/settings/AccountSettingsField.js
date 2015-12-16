import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

export class AccountSettingsField extends React.Component {

  renderFristName() {
    console.log('rendering first name', this.props.editingFirstName)
    let test = this.props.editingFirstName || false
    if (test) {
      return <TextField ref="firstName" hintText="First Name"/>
    }
    return <span>{this.props.firstName}</span>
  }

  renderItems() {
    console.log('Rendering Items')
    return <ul>{this.props.userData.map(this.renderItem, this)}</ul>
  }

  renderItem(item) {
    return <li>{item}</li>
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
    console.log('USER DATA FROM ACCT FIELD SETTINGS:', this.props.userData)
    return (
      <form>
        {this.renderItems()}
      </form>
    )
  }
}

export default AccountSettingsField

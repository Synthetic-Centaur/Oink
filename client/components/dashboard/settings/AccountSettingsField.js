import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'

export class AccountSettingsField extends React.Component {
  render() {

    let user = {
      firstName: this.props.firstName ? this.props.firstName : '',
      firstName: this.props.lastName ? this.props.lastName : ''
    }
    return (
      <form>
        <div className="row">
          <TextField ref="firstName" hintText="First Name"/>
        </div>
        <div className="row">
          <TextField ref="lastName" hintText="Last Name"/>
        </div>
        <div className="row">
          <TextField ref="email" hintText="Email"/>
        </div>
        <div className="row">
          <TextField ref="password" type="password" hintText="Password"/>
        </div>
      </form>
    )
  }
}

export default AccountSettingsField

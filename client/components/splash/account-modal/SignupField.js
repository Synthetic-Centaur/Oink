import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'

export class SignupField extends React.Component {
  render() {
    return (
      <form style={{padding: '24px'}}>
        <div className="row">
          <TextField ref="firstName" hintText="First Name" fullWidth={true} />
        </div>
        <div className="row">
          <TextField ref="lastName" hintText="Last Name" fullWidth={true} />
        </div>
        <div className="row">
          <TextField ref="phone" hintText="Phone" fullWidth={true} />
        </div>
        <div className="row">
          <TextField ref="email" hintText="Email" fullWidth={true} />
        </div>
        <div className="row">
          <TextField ref="password" type="password" hintText="Password" fullWidth={true} />
        </div>
        <div className="row">
          <TextField ref="verifyPassword" type="password" hintText="Verify Your Password" fullWidth={true} />
        </div>
      </form>
    )
  }
}

export default SignupField

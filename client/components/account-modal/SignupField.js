import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'

export class SignupField extends React.Component {
  render() {
    return (
      <form>
        <div className="row">
          <TextField ref="firstName" hintText="First Name"/>
        </div>
        <div className="row">
          <TextField ref="lastName" hintText="Last Name"/>
        </div>
        <div className="row">
          <TextField ref="phone" hintText="Phone"/>
        </div>
        <div className="row">
          <TextField ref="email" hintText="Email"/>
        </div>
        <div className="row">
          <TextField ref="password" type="password" hintText="Password"/>
        </div>
      </form>
    );
  }
}

export default SignupField

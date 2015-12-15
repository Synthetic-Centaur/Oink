import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import { Link } from 'react-router'

export class LoginField extends Component {
  render() {
    return (
      <form>
        <div className="row">
          <TextField ref="email" hintText="email"/>
        </div>
        <div className="row">
          <TextField ref="password" type="password" hintText="password"/>
        </div>
        <div className="row">
        </div>
      </form>
    )
  }
}

export default LoginField

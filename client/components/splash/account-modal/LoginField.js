// ## Login fields for AccountModal.js

import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import { Link } from 'react-router'

export class LoginField extends Component {
  render() {
    return (
      <form style={{padding: '24px'}}>
        <div className="row">
          <TextField ref="email" hintText="Email" fullWidth={true} />
        </div>
        <div className="row">
          <TextField ref="password" type="Password" hintText="password" fullWidth={true} />
        </div>
        <div className="row">
        </div>
      </form>
    )
  }
}

export default LoginField

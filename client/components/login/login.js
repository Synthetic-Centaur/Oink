import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import {Link} from 'react-router'

class Login extends Component {
  render() {
    return (
        <div className="container">
          <div className="row">
            <TextField hintText="email"/>
          </div>
          <div className="row">
            <TextField hintText="password"/>
          </div>
          <div className="row">
            <RaisedButton label="Login"/>
          </div>
          <div className="row">
            <Link to='/signup'>
              <RaisedButton label="Signup"/>
            </Link>
          </div>
        </div>
    )
  }
}

Login.propTypes = {

}

export default Login

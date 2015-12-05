import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import {Link} from 'react-router'

class Login extends Component {
  handleLogin() {
    let email = this.refs.email.getValue();
    let password = this.refs.password.getValue();
    
    this.props.login({
      email: email,
      password: password
    })
    
  }
  render() {
    console.log('this in render: ', this);
    return (
        <div className="container">
          <div className="row">
            <TextField ref="email" hintText="email"/>
          </div>
          <div className="row">
            <TextField ref="password" hintText="password"/>
          </div>
          <div className="row">
            <RaisedButton label="Login" onClick={this.handleLogin.bind(this)}/>
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
  login: PropTypes.func.isRequired
}

export default Login

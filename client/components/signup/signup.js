import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import {Link} from 'react-router'
import axios from 'axios'

class Login extends Component {
  handleSignup() {
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
    // axios.post('/auth/signup', {
    //   firstName: firstName,
    //   lastName: lastName,
    //   phone: phone,
    //   password: password
    // })
    //   .then((response) => {
    //     console.log(response.status);
    //   })

  }

  render() {
    return (
        <div className="container">
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
            <TextField ref="password" hintText="Password"/>
          </div>
          <div className="row">
            <Link to='/signup'>
              <RaisedButton label="Signup" onClick={this.handleSignup.bind(this)}/>
            </Link>
          </div>
        </div>
    )
  }
}

Login.propTypes = {

}

export default Login

import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import { Link } from 'react-router'

class SignupForm extends Component {
  handleSignup(e) {
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
          <div className="row">
            <RaisedButton label="Signup" onClick={this.handleSignup.bind(this)}/>
          </div>
        </form>
    )
  }
}

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired
}

export default SignupForm

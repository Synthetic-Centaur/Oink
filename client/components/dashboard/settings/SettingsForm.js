import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

// dont think we're using react-router yet
// import { Link } from 'react-router'

class SettingsForm extends Component {
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
            <RaisedButton label="Save" onClick={this.handleSettings.bind(this)}/>
          </div>
        </form>
    )
  }
}

// code below may be useful for form validation
SettingsForm.propTypes = {
  settings: PropTypes.func.isRequired
}

export default SettingsForm

import React, { Component, PropTypes } from 'react'
import { FontIcon, FlatButton, RaisedButton } from 'material-ui'

class PhoneVerifyIcon extends React.Component {

  openPhoneVerify () {
    console.log('SHOULD BE CLICKED NOW')
    this.props.showPhoneVerify()
  }

  renderVerifyNeeded() {
    console.log('returningVerifyNeeded')
    return (
      <a onClick={this.openPhoneVerify.bind(this)} >
        <RaisedButton label="Verify Phone" />
      </a>
    )
  }

  renderVerified() {
    return ''
  }

  handleRender() {
    if (this.props.userIsVerified) {
      return this.renderVerified()
    } else {
      return this.renderVerifyNeeded()
    }
  }

  render() {
    console.log('INSIDE PHONE VERIFY ICON')
    return (
      <div>  
        {this.handleRender()}
      </div>
    )
  }
}

export default PhoneVerifyIcon

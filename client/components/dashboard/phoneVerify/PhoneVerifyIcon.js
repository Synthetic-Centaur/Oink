import React, { Component, PropTypes } from 'react'
import { FontIcon, FlatButton, RaisedButton, Badge} from 'material-ui'

class PhoneVerifyIcon extends React.Component {

  openPhoneVerify() {
    console.log('Phone verify icon has been clicked')
    this.props.showPhoneVerify()
  }

  renderVerifyNeeded() {
    console.log('rendering Verify Needed')
    return (
      <Badge badgeContent={1} primary={true}>
        <FontIcon 
          hoverColor='red'
          className='material-icons'
          onTouchTap={this.openPhoneVerify.bind(this)} > cellphone </FontIcon>
      </Badge>
    )
  }

  renderVerified() {
    return (
      ''
    )
  }

  handleRender() {
    console.log('inside phone verify icon userIsVerified is ', this.props.userIsVerified)
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

PhoneVerifyIcon.propTypes = {
  showPhoneVerify: PropTypes.func.isRequired
}

export default PhoneVerifyIcon

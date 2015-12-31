import React, { Component, PropTypes } from 'react'
import { FontIcon, FlatButton, RaisedButton, Badge, MenuItem } from 'material-ui'

class PhoneVerifyIcon extends React.Component {

  openPhoneVerify() {
    this.props.showPhoneVerify()
  }

  renderVerifyNeeded() {
    return (
      <Badge badgeContent={1} primary={true} >
        <FontIcon
          hoverColor='grey'
          color='#FF8A80'
          className='material-icons'
          onTouchTap={this.openPhoneVerify.bind(this)} > cellphone </FontIcon>
      </Badge>
    )
  }

  handleRender() {
    if (this.props.userIsVerified) {
      return ''
    } else {
      return this.renderVerifyNeeded()
    }
  }

  render() {
    return (
      <MenuItem
        className='menu-item phone-verify'
        onTouchTap={this.openPhoneVerify.bind(this)}
      >
        {'Phone Verification'}
        {this.handleRender()}
      </MenuItem>
    )
  }
}

PhoneVerifyIcon.propTypes = {
  showPhoneVerify: PropTypes.func.isRequired
}

export default PhoneVerifyIcon

import React, { Component, PropTypes } from 'react'
import { FontIcon, FlatButton, RaisedButton, Badge} from 'material-ui'

class PhoneVerifyIcon extends React.Component {

  openPhoneVerify() {
    this.props.showPhoneVerify()
  }

  renderVerifyNeeded() {
    return (
      <a onClick={this.openPhoneVerify.bind(this)}>
        <Badge badgeContent={1} primary={true} >
          <FontIcon
            hoverColor='grey'
            className='material-icons'
            onTouchTap={this.openPhoneVerify.bind(this)} > cellphone </FontIcon>
        </Badge>
      </a>
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

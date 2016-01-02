// ## Left Navigation Menu

import React, { Component, PropTypes } from 'react'
import { FontIcon, FlatButton, RaisedButton, Badge } from 'material-ui'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MenuDivider from 'material-ui/lib/menus/menu-divider'

class SideNav extends Component {

  // Sets selected component on state so that it will be rendered within component playground
  handleComponentChange(item) {
    const { handleNavigation } = this.props
    handleNavigation(item)
  }

  openPhoneVerify() {
    this.props.showPhoneVerify()
  }

  renderVerifyNeeded() {
    return (
      <MenuItem
        className="menu-item phone-verify"
        onTouchTap={this.openPhoneVerify.bind(this)}
      >
        {'Verify Phone'}
        <i className="test">
          <Badge
            ref="badge"
            primary={true}
            style={{padding:'0px'}}
            badgeStyle={{height: '10px', width: '10px'}}
          >
            <span className="material-icons">cellphone</span>
          </Badge>
          </i>
      </MenuItem>
    )
  }

  handlePhoneVerifyRender() {
    if (this.props.verifySuccess) {
      return ''
    } else {
      return this.renderVerifyNeeded()
    }
  }

  render() {

    // Receives array of component objects and renders each component's icon and text in side bar
    const { handleNavigation, dropDownComponents } = this.props

    // Conditionally renders phone verify icon if user has not yet verified their phone number
    let phoneVerifyIcon = this.handlePhoneVerifyRender()

    // Maps over each component and returns a menu item with text, icon and click event binding
    let menuItems = dropDownComponents.map((item, index) => {
      return (
        <MenuItem
          className="menu-item"
          index={index}
          key={index}
          onTouchTap={this.handleComponentChange.bind(this, item)}
        >
          {item.text}
          <i className="material-icons">{ item.icon }</i>
        </MenuItem>
      )
    })

    return (
      <div className="sidenav">

        <div className="header">
          <img className="logo" src="/images/Oink-logo.png" alt="oink financial logo"/>
          <h4 className="logo-text">ink.</h4>
        </div>

        { menuItems }
        { phoneVerifyIcon }
        
      </div>
    )
  }
}

// Specify what props are required by the component
SideNav.propTypes = {
  changeView: PropTypes.func.isRequired,
  handleNavigation: PropTypes.func.isRequired,
  dropDownComponents: PropTypes.array.isRequired,
  showPhoneVerify: PropTypes.func.isRequired,
  showVerify: PropTypes.bool.isRequired,
  userIsVerified: PropTypes.bool.isRequired,
  verifySuccess: PropTypes.bool.isRequired,
  phoneVerifyFailed: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

export default SideNav


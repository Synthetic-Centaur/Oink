import React, { Component, PropTypes } from 'react'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MenuDivider from 'material-ui/lib/menus/menu-divider'

class SideNav extends Component {

  // Sets selected component on state so that it will be rendered within component playground
  handleComponentChange(item) {
    const { handleNavigation } = this.props
    handleNavigation(item)
  }

  render() {

    // Receives array of component objects and renders each component's icon and text in side bar
    const { handleNavigation, dropDownComponents } = this.props

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
      </div>
    )
  }
}

SideNav.propTypes = {
  handleNavigation: PropTypes.func,
  dropDownComponents: PropTypes.array
}

export default SideNav


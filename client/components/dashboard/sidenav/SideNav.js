import React, { Component, PropTypes } from 'react'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MenuDivider from 'material-ui/lib/menus/menu-divider'

class SideNav extends Component {

  handleComponentChange(item) {
    const { handleNavigation } = this.props
    console.log('in handle comp change: ------->', item.component)
    handleNavigation(item)
  }

  render() {

    const { handleNavigation, dropDownComponents } = this.props

    let menuItems = dropDownComponents.map((item, index) => {
      console.log('in menu map, item is: ', item.component)
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
          <img className="logo" src="/images/Logo-small.png" alt="oink financial logo"/>
          <h4 className="logo-text">ink.</h4>
        </div>
        { menuItems }
      </div>
    )
  }
}

SideNav.propTypes = {

}

export default SideNav


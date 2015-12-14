import React, { Component, PropTypes } from 'react'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'

class Settings extends Component {
  handleLogout(e) {
    e.preventDefault()
    
    this.props.logout()
  }
  
  render() {
    return (
      <IconMenu iconButtonElement={
        <IconButton>
          <MoreVertIcon className="settings-icon" />
        </IconButton>
      }>
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Sign out" onTouchTap={this.handleLogout.bind(this)}/>
      </IconMenu>
    )
  }
}

Settings.propTypes = {
  logout: PropTypes.func.isRequired
}

export default Settings

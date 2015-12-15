import React, { Component, PropTypes } from 'react'
import { List, ListDivider, ListItem, IconMenu, MenuItem } from 'material-ui'

class MessageCenter extends Component {
  render() {
    const { data } = this.props
    return (
      <List subheader="Select from your goals">
        <ListItem primaryText="Tahiti" />
        <ListItem primaryText="Maui" />
        <ListItem primaryText="New Car" />
      </List>
    )
  }
}

export default MessageCenter
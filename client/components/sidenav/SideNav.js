import React, { Component, PropTypes } from 'react'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MenuDivider from 'material-ui/lib/menus/menu-divider'

const views = [
  { text: 'Budget', icon: 'shopping_cart'},
  { text: 'Plan Goals', icon: 'account_balance'},
  { text: 'Heatmap', icon: 'add_location'},
  { text: 'Recommendations', icon: 'lightbulb_outline'},
  { text: 'Forecast', icon: 'trending_up'}
]

class SideNav extends Component {
  handleViewChange(i) {
    const { changeView } = this.props

    let view = views[i].text
    
    changeView(view)

    console.log('In a view change, the view is: ', views[i].text)
  }

  render() {
    console.log(this.refs.divider)
    let menuItems = views.map((item, i) => {
      return (
          <MenuItem
            className="menu-item"
            index={i}
            key={i}
            onTouchTap={this.handleViewChange.bind(this, i)}
          >
            { item.text }
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

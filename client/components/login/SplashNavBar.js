import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import { Link } from 'react-router'

class SplashNavBar extends Component {
  openLogin() {

  }
  render() {
    const { showLoginModal } = this.props
    return (
      <div className="container">
        <FlatButton
          className="u-pull-right"
          label="login"
          onTouchTap={showLoginModal}/>
      </div>
    )
  }
}

SplashNavBar.propTypes = {
  showLoginModal: PropTypes.func
}

export default SplashNavBar

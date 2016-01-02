// ## Top Navbar for splash page

import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import { Link } from 'react-router'

class SplashNavBar extends Component {
  render() {
    const { showLoginModal, showSignupModal } = this.props
    return (
      <div className="splashnav">
          <img className="oink-logo u-pull-left" src="images/Logo-small-grey.png" alt="Oink Financial Logo"/>
          <span>
            <h5 className="logo-text u-pull-left">ink Financial</h5>
          </span>
          <button className="u-pull-right" onClick={showLoginModal}>LOGIN</button>
      </div>
    )
  }

}

// Specify what props are required by the component
SplashNavBar.propTypes = {
  showLoginModal: PropTypes.func.isRequired,
  showSignupModal: PropTypes.func
}

export default SplashNavBar

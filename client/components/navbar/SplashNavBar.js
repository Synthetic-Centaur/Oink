import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import { Link } from 'react-router'

class SplashNavBar extends Component {
  render() {
    const { showLoginModal, showSignupModal } = this.props
    return (
      <div className="container splash-nav">
          <span>
            <img className="logo-oink" alt="Oink Financial Logo" src="/images/Logo-small.png"/>
            <h5 className="u-pull-left">ink Financial.</h5>
          </span>
          <button className="u-pull-right" onClick={showLoginModal}>LOGIN</button>
          <button className="u-pull-right" onClick={showSignupModal}>SIGNUP</button>
      </div>
    )
  }
}

SplashNavBar.propTypes = {
  showLoginModal: PropTypes.func.isRequired,
  showSignupModal: PropTypes.func
}

export default SplashNavBar

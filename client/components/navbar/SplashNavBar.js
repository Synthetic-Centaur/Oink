import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import { Link } from 'react-router'

class SplashNavBar extends Component {
  render() {
    const { showLoginModal, showSignupModal } = this.props
    return (
      <div className="splashnav">
          <span>
            <h5 className="u-pull-left">Oink Financial</h5>
          </span>
          <button className="u-pull-right" onClick={showLoginModal}>LOGIN</button>
      </div>
    )
  }

}

SplashNavBar.propTypes = {
  showLoginModal: PropTypes.func.isRequired,
  showSignupModal: PropTypes.func
}

export default SplashNavBar

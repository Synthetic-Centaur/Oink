import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AccountModal from '../components/account-modal/AccountModal'
import SplashNavBar from '../components/navbar/SplashNavBar'
import { postLogin, postSignup } from '../api/authHandlers'
import { showLogin, hideLogin, showSignup, hideSignup, getJWT } from '../actions/actions'

class Splash extends Component {
  render() {
    const { actions, splashPage } = this.props
    return (
      <div>
      
        <AccountModal
          login={actions.postLogin}
          signup={actions.postSignup}
          showLogin={splashPage.showLogin}
          showSignup={splashPage.showSignup}
          showLoginModal={actions.showLogin}
          showSignupModal={actions.showSignup}
          hideLoginModal={actions.hideLogin}
          hideSignupModal={actions.hideSignup}
        />

        <div className="navbar container">
          <div className="row">
            <SplashNavBar showLoginModal={actions.showLogin} />
          </div>
        </div>

        <div className="hero">
          <div className="container">
            <div className="row">

              <div className="row heading u-full-width">
                <h1>PLAN FOR THE FUTURE.</h1>
              </div>
              <div className="row subheading u-full-width">
                <h2>Make intelligent budgets and be notified when you go over them.</h2>
              </div>
              <div className="row signup u-full-width">
                <button onClick={actions.showSignup}>Get started</button>
              </div>

            </div>
          </div>
        </div>

        <div className="info">
          <div className="container">
            <div className="row">

              <div className="one-third column">
                <h3>Text Updates</h3>
                <h4>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</h4>
              </div>
              <div className="one-third column">
                <h3>Security</h3>
                <h4>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</h4>
              </div>
              <div className="one-third column">
                <h3>Personalization</h3>
                <h4>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</h4>
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
}

Splash.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
    splashPage: state.splashPage,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      postLogin,
      postSignup,
      showLogin,
      showSignup,
      hideLogin,
      hideSignup
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)

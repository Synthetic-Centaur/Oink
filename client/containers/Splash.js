import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from '../components/login/LoginForm'
import SplashNavBar from '../components/login/SplashNavBar'
import { postLogin } from '../api/authHandlers'
import { showLogin, hideLogin, showSignup, hideSignup } from '../actions/actions'

class Splash extends Component {
  render() {
    const { actions, splashPage } = this.props
    return (
      <div>
        <div className="first-image">
          <SplashNavBar showLoginModal={actions.showLogin} showSignupModal={actions.showSignup} />
          <div className="section hero">
            <div className="container">
              <div className="row">
                <div className="one-half column">
                  <h4 className="hero-heading">Change your daily spending habits by creating intelligent budgets. Welcome to Oink.</h4>
                  <LoginForm 
                  login={actions.postLogin} 
                  showLogin={splashPage.showLogin}
                  hideLoginModal={actions.hideLogin}
                  />
                </div>
                <div className="one-half column logo-container">
                  <img className="logo" alt="Oink Financial Logo" src="/images/Logo.png"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
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
    splashPage: state.splashPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      postLogin,
      showLogin,
      showSignup,
      hideLogin,
      hideSignup
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)

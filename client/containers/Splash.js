import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AccountModal from '../components/account-modal/AccountModal'
import SplashNavBar from '../components/navbar/SplashNavBar'
import { postLogin, postSignup } from '../api/authHandlers'
import { showLogin, hideLogin, showSignup, hideSignup } from '../actions/actions'

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
          hideSignupModal={actions.hideSignup} />

        <div className="first-image">
          <SplashNavBar showLoginModal={actions.showLogin} showSignupModal={actions.showSignup} />
          <div className="section hero">
            <div className="container">
              <div className="row">
                <div className="one-half column">
                  <h4 className="hero-heading">Change your daily spending habits by creating intelligent budgets. Welcome to Oink.</h4>
                </div>
                <div className="one-half column logo-container">
                  
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
      postSignup,
      showLogin,
      showSignup,
      hideLogin,
      hideSignup
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)

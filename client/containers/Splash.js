// ## Splashpage View Container

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AccountModal from '../components/splash/account-modal/AccountModal'
import SplashNavBar from '../components/splash/navbar/SplashNavBar'
import { postLogin, postSignup, splashRedirect, getPlaid, postPlaid } from '../actions/api/authActions'
import { showLogin, hideLogin, showSignup, hideSignup, getJWT, showPlaid, hidePlaid,
         removeAlerts, passwordMatchError, phoneNumberError, missingSignupFields } from '../actions/actions'
import ProfileCard from '../components/splash/ProfileCard'
import Theme from '../splash-theme.js'
import ThemeManager from 'material-ui/lib/styles/theme-manager'

class Splash extends Component {
  componentWillMount() {
    // Necessary in the case where a user logouts of the Dashboard and is redirected to the splash page
    document.body.style.backgroundColor = '#fff'
  }

  render() {
    const { actions, splashPage, publicKey, showPlaid, passwordErr, missingFields } = this.props
    return (
      <div className="splashpage">
      
        <AccountModal
          login={actions.postLogin}
          signup={actions.postSignup}
          showLogin={splashPage.showLogin}
          showSignup={splashPage.showSignup}
          showLoginModal={actions.showLogin}
          showSignupModal={actions.showSignup}
          hideLoginModal={actions.hideLogin}
          hideSignupModal={actions.hideSignup}
          authenticate={actions.postPlaid}
          getKey={actions.getPlaid}
          publicKey={publicKey}
          showPlaid={showPlaid}
          invalidEmail={splashPage.invalidEmail}
          invalidPassword={splashPage.invalidPassword}
          invalidPhone={splashPage.invalidPhone}
          invalidBank={splashPage.invalidBank}
          userExists={splashPage.userExists}
          errorText={splashPage.errorText}
          removeAlerts={actions.removeAlerts}
          passwordErr={passwordErr}
          phoneNumberError={actions.phoneNumberError}
          passwordMatchError={actions.passwordMatchError}
          missingFields={missingFields}
          missingSignupFields={actions.missingSignupFields}
        />

        <div className="navbar">
          <div className="container">
            <div className="row">
              <SplashNavBar showLoginModal={actions.showLogin} />
            </div>
          </div>
        </div>

        <div className="hero">
          <div className="container">
          
            <div className="row">

              <div className="row heading u-full-width">
                <h1>PLAN FOR THE FUTURE</h1>
              </div>
              <div className="row subheading u-full-width">
                <h2>Make intelligent budgets and be notified when you go over them</h2>
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
                <img src="/images/text10.png" alt=""/>
                <h3>Text Updates</h3>
                <h4>Oink will text you when you go over budget and let you know how much you overspent. Be confident that you are sticking to your personal financial plan every month.</h4>
              </div>
              <div className="one-third column">
                <img src="/images/shield94.png" alt=""/>
                <h3>Security</h3>
                <h4>We access your transactions by authenticating your bank via <a href="https://plaid.com/" target="_blank">Plaid</a>. This means we never access any sensitive and personally identifing information like bank account numbers.</h4>
              </div>
              <div className="one-third column">
                <img src="/images/gears3.png" alt=""/>
                <h3>Discovery</h3>
                <h4>We allow you to examine your spending habits through a new lens. Oink shows you where, when, and on what you spend your money.</h4>
              </div>

            </div>
          </div>
        </div>

        <div className="about">
          <div className="container">

            <div className="row">
              <h3 className="heading">Meet the Team</h3>
            </div>

            <div className="row">

              <div className="three columns">
                <ProfileCard
                  name="Clayton Schneider"
                  title="Fullstack Engineer"
                  picture="images/Clayton_Schneider.jpg"
                  email="claykschneider@gmail.com"
                  github="https://github.com/claytonschneider"
                  linkedin="https://www.linkedin.com/in/claytonschneider"
                  description="Clayton is enthusiastic about staying on the bleeding edge of JavaScript development by building with technologies like React.js"
                />
              </div>
              <div className="three columns">
                <ProfileCard
                  name="Lucilla Chalmer"
                  title="Fullstack Engineer"
                  picture="images/Lucilla_Chalmer.jpg"
                  email="chalmer.lucilla@gmail.com"
                  github="https://github.com/LucillaC"
                  linkedin="https://www.linkedin.com/in/LucillaChalmer"
                  description="Lucilla is focused on tactical problem solving and passionate about delivering an exceptional user experience."
                />
              </div>
              <div className="three columns">
                <ProfileCard
                  name="Aaron Ackerman"
                  title="Fullstack Engineer"
                  picture="images/Aaron_Ackerman.jpg"
                  email="a.ackerman050@gmail.com"
                  github="https://github.com/aackerman050"
                  linkedin="https://www.linkedin.com/in/aackerman050"
                  description="Aaron is interested in full-stack software design for maintaining efficient and expandable websites."
                />
              </div>
              <div className="three columns">
                <ProfileCard
                  name="Todd Levin"
                  title="Fullstack Engineer"
                  picture="images/Todd_Levin.jpg"
                  email="todd.levin@me.com"
                  github="https://github.com/tlevin"
                  linkedin="https://www.linkedin.com/in/toddglevin"
                  description="Todd is committed to building responsible software by writing modular and maintainable code."
                />
              </div>

            </div>
          </div>
        </div>

        <div className="opensource">
          <div className="container">

            <div className="row">
              <div className="six columns">
                <h3>Oink Financial is an Open Source Project</h3>
              </div>

              <div className="three columns">
                <a href="https://github.com/Synthetic-Centaur/Oink" target="_blank">
                  <button>Github</button>
                </a>
              </div>

              <div className="three columns">
                <a href="/documentation" target="_blank">
                  <button>Documentation</button>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

// Specify what props are required by the container
Splash.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  splashPage: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isAuthenticated,
  token: PropTypes.string.isRequired,
  publicKey: PropTypes.string.isRequired,
  showPlaid: PropTypes.bool.isRequired,
  passwordErr: PropTypes.bool.isRequired,
  missingFields: PropTypes.bool.isRequired
}

// Specify which pieces of state should be available as props
function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
    splashPage: state.splashPage,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    publicKey: state.plaid.publicKey,
    showPlaid: state.plaid.showPlaid,
    passwordErr: state.splashPage.passwordMatchError,
    missingFields: state.splashPage.missingSignupFields
  }
}

// Bind Redux store's dispatch to container actions and make available as props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      postLogin,
      postSignup,
      showLogin,
      showSignup,
      hideLogin,
      hideSignup,
      splashRedirect,
      getPlaid,
      postPlaid,
      showPlaid,
      hidePlaid,
      removeAlerts,
      passwordMatchError,
      phoneNumberError,
      missingSignupFields
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)

import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'
import SnackBar from 'material-ui/lib/snackbar'
import LoginField from './LoginField'
import SignupField from './SignupField'
import PlaidButton from './PlaidButton'
import Theme from '../../../splash-theme.js'
import ThemeManager from 'material-ui/lib/styles/theme-manager'

class AccountModal extends Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    }
  }

  componentDidMount() {
    const { hideLoginModal, hideSignupModal } = this.props
    hideLoginModal()
    hideSignupModal()
  }

  componentDidUpdate() {
    if (this.props.showLogin || this.props.showSignup) {
      this.refs.modal.show()
    }
  }

  handleSubmit() {
    const { showLogin, showSignup, removeAlerts, passwordErr } = this.props
    showLogin ? this.handleLogin() : showSignup ? this.handleSignup() : null
  }

  handleLogin() {
    const { loginField } = this.refs
    const { login, hideLoginModal } = this.props
    let email = loginField.refs.email.getValue()
    let password = loginField.refs.password.getValue()

    login({
      email: email,
      password: password
    })

    removeAlerts()
  }

  handleSignup() {
    const { signupField } = this.refs
    const { signup, hideSignupModal, passwordMatchError, phoneNumberError, missingSignupFields, removeAlerts } = this.props

    let firstName = signupField.refs.firstName.getValue()
    let lastName = signupField.refs.lastName.getValue()
    let email = signupField.refs.email.getValue()
    let phone = signupField.refs.phone.getValue()
    let password = signupField.refs.password.getValue()
    let verifyPassword = signupField.refs.verifyPassword.getValue()

    // remove any non-numeric chars from phone number field
    phone = phone.replace(/\D/g, '')

    if (password !== verifyPassword) {
      passwordMatchError()
    } else if (firstName === '' || lastName === '' || email === '' ||
               phone === '' || password === '' || verifyPassword === '') {
      missingSignupFields()
    } else if (phone.length !== 10) {
      phoneNumberError()
    } else {
      signup({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password
      })

      removeAlerts()
    }
  }

  handleCancel() {
    const { showLogin, showSignup, hideLoginModal, hideSignupModal, removeAlerts } = this.props
    showLogin ? hideLoginModal() : showSignup ? hideSignupModal() : null
    this.refs.modal.dismiss()
    removeAlerts()
  }

  renderInputFields() {
    const { showLogin, showSignup, showPlaid, authenticate, getKey, publicKey } = this.props
    return showLogin ? <LoginField ref="loginField"/> :
           showSignup ? <SignupField ref="signupField"/> :
           showPlaid ? <PlaidButton accountModal={this.refs.modal} authenticate={authenticate} getKey={getKey} publicKey={publicKey} /> : null
  }

  renderTitle() {
    const { showLogin, showSignup, showPlaid } = this.props
    return showLogin ? 'Log in to Your Account' :
           showSignup ? 'Sign up for an Account' :
           showPlaid ? 'Authenticate your Bank Account' : ''
  }

  render() {
    const { userExists, invalidBank, invalidEmail, invalidPassword, invalidPhone, passwordErr, missingFields, errorText } = this.props
    let errorMessage = userExists ? errorText : invalidPassword ? errorText : passwordErr ? errorText : invalidPhone ? errorText :
                       missingFields ? errorText : invalidEmail ? errorText : invalidBank ? errorText : false

    console.log('ERROR TEXT', errorText)
    let modalActions = [
      <FlatButton
        key={0}
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel.bind(this)}
        style={{border: '2px solid #c4c4c4', marginRight: '4px'}}
      />,
      <FlatButton
        key={1}
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)}
        style={{border: '2px solid #c4c4c4'}}
      />
    ]
    return (
      <Dialog
        ref="modal"
        title={this.renderTitle()}
        actions={modalActions}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        modal={true}
        contentStyle={{maxWidth: '500px'}}
        titleStyle={{color: '#666', textAlign: 'center', paddingTop: '10px'}}
      >
        <div>

          { this.renderInputFields() }

          { errorText ? <div className="error-text animated fadeInUp">{errorMessage}</div> : null }

        </div>
      </Dialog>
    )
  }
}

AccountModal.propTypes = {
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  showLogin: PropTypes.bool.isRequired,
  showSignup: PropTypes.bool.isRequired,
  hideLoginModal: PropTypes.func.isRequired,
  hideSignupModal: PropTypes.func.isRequired,
  showSignupModal: PropTypes.func.isRequired,
  showLoginModal: PropTypes.func.isRequired
}

AccountModal.childContextTypes = {
  muiTheme: PropTypes.object
}

export default AccountModal

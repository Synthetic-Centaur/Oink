import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'
import { Link } from 'react-router'
import LoginField from './LoginField'
import SignupField from './SignupField'

class AccountModal extends Component {
  componentDidUpdate() {
    if (this.props.showLogin || this.props.showSignup) {
      this.refs.modal.show()
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { showLogin, showSignup } = this.props    
    showLogin ? this.handleLogin() : showSignup ? this.handleSignup() : null
  }

  handleLogin() {
    const { loginField } = this.refs
    let email = loginField.refs.email.getValue()
    let password = loginField.refs.password.getValue()

    this.props.login({
      email: email,
      password: password
    })
  }

  handleSignup() {
    const { signupField } = this.refs
    let firstName = signupField.refs.firstName.getValue()
    let lastName = signupField.refs.lastName.getValue()
    let email = signupField.refs.email.getValue()
    let phone = signupField.refs.phone.getValue()
    let password = signupField.refs.password.getValue()

    this.props.signup({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password
    })
  }

  handleCancel(e) {
    e.preventDefault()
    const { showLogin, showSignup, hideLoginModal, hideSignupModal } = this.props
    showLogin ? hideLoginModal() : showSignup ? hideSignupModal() : null
    this.refs.modal.dismiss()
  }

  renderInputFields() {
    const { showLogin, showSignup } = this.props
    return showLogin ? <LoginField ref="loginField"/> :
           showSignup ? <SignupField ref="signupField"/> : null
  }

  renderTitle() {
    const { showLogin, showSignup } = this.props
    return showLogin ? 'Log in to Your Account' :
           showSignup ? 'Sign up for an Account' : ''
  }

  render() {
    let modalActions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleCancel.bind(this)}
      />,
      <FlatButton
        key={1}
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />
    ];

    return (
      <Dialog
        ref="modal"
        title={this.renderTitle()}
        actions={modalActions}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        modal={true}
      >
        <div className="modal-content">

          { this.renderInputFields() }
          
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

export default AccountModal

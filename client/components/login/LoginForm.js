import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'
import { Link } from 'react-router'

class Login extends Component {
  componentDidUpdate() {
    if (this.props.showLogin) {
      this.refs.modal.show()
    }
  }
  handleLogin(e) {
    e.preventDefault()
    
    let email = this.refs.email.getValue();
    let password = this.refs.password.getValue();
    this.props.login({
      email: email,
      password: password
    })
  }
  handleCancel(e) {
    e.preventDefault()
    this.props.hideLoginModal()
    this.refs.modal.dismiss()
  }
  render() {
    let modalActions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleCancel.bind(this)} />,
      <FlatButton
        key={1}
        label="Submit"
        primary={true}
        onTouchTap={this.handleLogin.bind(this)} />
    ];

    return (
      <Dialog
        ref="modal"
        title="Sign into Your Account"
        actions={modalActions}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        modal={true}
      >
        <div className="signup-content">
          <form>
            <div className="row">
              <TextField ref="email" hintText="email"/>
            </div>
            <div className="row">
              <TextField ref="password" type="password" hintText="password"/>
            </div>
            <div className="row">
              <Link to='/signup'>
                <p>or sign up</p>
              </Link>
            </div>
          </form>
        </div>
      </Dialog>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  showLogin: PropTypes.bool.isRequired,
  hideLoginModal: PropTypes.func
}

export default Login

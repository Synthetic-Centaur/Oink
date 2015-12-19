import React, { Component, PropTypes } from 'react'
import { RaisedButton, TextField } from 'material-ui'

class SecuritySettingsField extends React.Component {

  handleEditStart(key) {
    this.props.editStart(key)
  }

  handleEditFinish(key) {
    this.props.editFinish(key)
  }

  handleDeleteAccount() {
    this.props.deleteAccount()
  }

  updateSecuritySettings () {
    let newPassword = this.refs.newPassword ? this.refs.newPassword.getValue() : ""
    let passwordCheck = this.refs.passwordCheck ? this.refs.passwordCheck.getValue() : ""

    let error = newPassword === passwordCheck ? "" : "Password Fields Must Match"

    this.props.updateSecuritySettings({ newPassword: newPassword, passwordCheck: passwordCheck, errorText: error})
  }

  renderPrimary () {
    if (this.props.editingDeleteAccount) {
      return this.renderDeleteAccount()
    } else if (this.props.editingPassword) {
      return this.renderEditPassword()
    }
    else {    
      return (
        <form>
          <div className="offset-by-five">
            <RaisedButton label="Change Password" onTouchTap={this.handleEditStart.bind(this, 'PASSWORD')} />
          </div>
          <div className="offset-by-five">
            <RaisedButton label="Delete Account" onTouchTap={this.handleEditStart.bind(this, 'DELETE_ACCOUNT')} />
          </div>
        </form>
      )
    }
  }

  renderEditPassword () {
    return (
      <div>
        <h4>Update Password</h4>
        <div>
          <TextField
            ref='newPassword'
            hintText='Please enter new password'
            type='password'
          />
        </div>
        <div>
          <TextField
            ref='passwordCheck'
            hintText='Please re-enter new password'
            type='password'
            errorText={this.props.securityData.errorText}
            onChange={this.updateSecuritySettings.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderDeleteAccount () {
    return (
      <div>
        <h4>Are You Sure?</h4>
        <h6>If you delete your account you cannot get it back</h6>
          <RaisedButton label="No, Take me back to settings" priary={true} onTouchTap={this.handleEditFinish.bind(this, 'DELETE_ACCOUNT')}/>
          <RaisedButton label="Yes, Please Delete My Account" onTouchTap={this.handleDeleteAccount.bind(this)} />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderPrimary()}
      </div>
    )
  }
}

export default SecuritySettingsField

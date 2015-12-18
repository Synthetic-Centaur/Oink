import React, { Component, PropTypes } from 'react'
import { RaisedButton, TextField } from 'material-ui'

class SecuritySettingsField extends React.Component {
  renderPrimary () {
    // if editingPassword
      // return renderEditPassword()
    // else if deletingAccount
      // return renderDeleteAccount()
    // else
    return (
      <form>
        <div className="offset-by-five">
          <RaisedButton label="Change Password" />
        </div>
        <div className="offset-by-five">
          <RaisedButton label="Delete Account" />
        </div>
      </form>
    )
  }
  renderEditPassword () {
    return (
      <div>
        <h4>Update Password</h4>
        <div className="offset-by-four">
          <TextField
            ref='newPassword'
            hintText='Please enter new password'
            type='password'
          />
        </div>
        <div className="offset-by-four">
          <TextField
            ref='passwordCheck'
            hintText='Please re-enter new password'
            type='password'
          />
        </div>
      </div>
    )
  }

  renderDeleteAccont () {
    return (
      <div>
        <h4>Are You Sure?</h4>
        <h6>If you delete your account you cannot get it back</h6>
          <RaisedButton label="No, Take me back to settings" priary={true}/>
          <RaisedButton label="Yes, Please Delete My Account" />
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

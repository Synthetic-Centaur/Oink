import React, { Component, PropTypes } from 'react'
import { RaisedButton, FlatButton, TextField, FontIcon } from 'material-ui'

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

  updateSecuritySettings() {
    let newPassword = this.refs.newPassword ? this.refs.newPassword.getValue() : ''
    let passwordCheck = this.refs.passwordCheck ? this.refs.passwordCheck.getValue() : ''

    let error = newPassword === passwordCheck ? '' : 'Password fields do not match'

    this.props.updateSecuritySettings({ newPassword: newPassword, passwordCheck: passwordCheck, errorText: error})
  }

  renderPrimary() {
    if (this.props.editingDeleteAccount) {
      return this.renderDeleteAccount()
    } else if (this.props.editingPassword) {
      return this.renderEditPassword()
    } else {
      return (
        <form style={{padding: '24px 50px 24px 24px'}}>
          <div className='row'>
            <div className='two columns offset-by-two'>
              <RaisedButton label="Change Password" primary={true} onTouchTap={this.handleEditStart.bind(this, 'PASSWORD')} />
            </div>
            <div className="two columns offset-by-three">
              <RaisedButton label="Delete Account" secondary={true} labelPosition="before" onTouchTap={this.handleEditStart.bind(this, 'DELETE_ACCOUNT')} />
            </div>
          </div>
        </form>
      )
    }
  }

  renderEditPassword() {
    return (
      <div style={{padding: '24px', color: '#4B4B4B'}}>
        <h4>Update Password</h4>
        <div>
          <TextField
            ref="newPassword"
            hintText="Please enter new password"
            hintStyle={{color: '#4B4B4B'}}
            type="password"
            underlineStyle={{borderColor: '#4B4B4B'}}
          />
        </div>
        <div>
          <TextField
            ref="passwordCheck"
            hintText="Please re-enter new password"
            hintStyle={{color: '#4B4B4B'}}
            type="password"
            underlineStyle={{borderColor: '#4B4B4B'}}
            errorText={this.props.securityData.errorText}
            onChange={this.updateSecuritySettings.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderDeleteAccount() {
    return (
      <div style={{padding: '24px', color: '#222'}}>
        <h4>Are You Sure?</h4>
        <h6>If you delete your account you cannot get it back</h6>
        <div className="row">
          <div className="four columns offset-by-two">
            <RaisedButton label="Yes, Please Delete My Account" primary={true} onTouchTap={this.handleDeleteAccount.bind(this)} />
          </div>
          <div className="four columns offset-by-one">
            <RaisedButton label="No, Take me back to settings" secondary={true} onTouchTap={this.handleEditFinish.bind(this, 'DELETE_ACCOUNT')}/>
          </div>
        </div>
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

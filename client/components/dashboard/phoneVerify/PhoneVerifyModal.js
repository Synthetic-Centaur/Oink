import React, { Component, PropTypes } from 'react'
import { Dialog, FlatButton, TextField, RaisedButton } from 'material-ui'
import { Link } from 'react-router'

class PhoneVerifyModal extends Component {


  componentDidUpdate() {
    if (this.props.showVerify) {
      this.refs.phoneVerify.show()
    }
  }

  handleSubmit() {
    let code = this.refs.phoneVerifyCode.getValue()
    this.props.checkPhoneVerification(code)
  }

  handleCancel() {
    const { hidePhoneVerify } = this.props
    this.props.showVerify ? this.props.hidePhoneVerify() : null
    this.refs.phoneVerify.dismiss()
  }

  sendCode() {
    this.props.sendPhoneVerification()
  }

  render() {

    let modalActions = [
      <FlatButton
        key={0}
        label='Send Code'
        primary={false}
        onTouchTap={this.sendCode.bind(this)} />,
      <FlatButton
        key={1}
        label='Submit'
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)} />
    ]

    return (
      <Dialog
        title='Oink Oink! Looks like you still need to verify your phone number'
        ref='phoneVerify'
        actions={modalActions}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        open={this.props.showVerify}
        onRequestClose={this.handleCancel.bind(this)}
      >
        <h4>Please Enter Code:</h4>
        <TextField
          ref='phoneVerifyCode'
          type='text'
        />
      </Dialog>
    )
  }
}

export default PhoneVerifyModal

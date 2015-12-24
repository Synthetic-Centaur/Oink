import React, { Component, PropTypes } from 'react'
import { Dialog, FlatButton, TextField, RaisedButton, FontIcon } from 'material-ui'
import { Link } from 'react-router'

class PhoneVerifyModal extends Component {

  componentDidUpdate() {
    if (this.props.showVerify) {
      this.refs.phoneVerify.show()
    } else {
      this.refs.phoneVerify.dismiss()
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

  render

  render() {

    const { errorText, verifySuccess } = this.props
    const titleText = verifySuccess ? 'Your phone has been verified! Welcome to Oink!!' : 'Oink Oink! Looks like you still need to verify your phone number'
   
    const modalActions = [
      <FlatButton
        key={1}
        label='Submit'
        primary={true}
        style={{fontSize: '20px'}}
        onTouchTap={this.handleSubmit.bind(this)} />
    ]

    return (
      <Dialog
        title={titleText}
        className="container"
        ref='phoneVerify'
        actions={modalActions}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        open={this.props.showVerify}
        onRequestClose={this.handleCancel.bind(this)}
      >
        <div className='row'>
          <div className='send-code-btn u-pull-left' style={{paddingTop:'30px', paddingLeft:'30px'}}>
            <FlatButton
              key={0}
              label='Text My Code'
              primary={false}
              style={{fontSize: '30px'}}
              onTouchTap={this.sendCode.bind(this)}>
            </FlatButton>
          </div>
          <div className='enter-code-field u-pull-right' style={{paddingRight:'80px'}}>
            <h4>Please Enter Code:</h4>
            <TextField
              ref='phoneVerifyCode'
              type='text'
            />
            <div>
              { errorText ? <span className="error-text animated fadeInUp">{errorText}</span> : null }
            </div>
          </div>
        </div>
        <div className='submit-phoneVerify four columns offset-by-four'>
        </div>
      </Dialog>
    )
  }
}

export default PhoneVerifyModal

import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/lib/raised-button'
import authKeys from '../../config/authKeys'

class PlaidButton extends Component {
  handlePlaid(e) {
    e.preventDefault()
    
    const { authenticate } = this.props

    let sandboxHandler = Plaid.create({
      env: 'tartan',
      clientName: 'Oink',
      key: authKeys.plaid.public_key,
      product: 'connect',
      onSuccess(public_token) {
        authenticate(public_token)
      },
    });

    sandboxHandler.open()
  }
  render() {
    return (
      <RaisedButton
        label="Link your Bank Account"
        onClick={this.handlePlaid.bind(this)} />
    )
  }
}

PlaidButton.propTypes = {
  authenticate: PropTypes.func.isRequired
}

export default PlaidButton

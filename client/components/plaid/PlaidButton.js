import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/lib/raised-button'

class PlaidButton extends Component {

  componentDidMount() {
    this.props.getKey()
  }

  handlePlaid(e) {
    e.preventDefault()

    console.log('PROPS', this.props)
    
    const { authenticate, publicKey } = this.props

    // COMMENT IN BELOW FOR SANDBOX ENV
    // let sandboxHandler = Plaid.create({
    //   env: 'tartan',
    //   clientName: 'Oink',
    //   key: 'test_key',
    //   product: 'connect',
    //   onSuccess(public_token) {
    //     authenticate(public_token)
    //   },
    // })

    // COMMENT IN BELOW FOR DEV USING ACTUAL ACCOUNTS
    let sandboxHandler = Plaid.create({
      env: 'tartan',
      clientName: 'Oink',
      key: publicKey,
      product: 'connect',
      onSuccess(public_token) {
        authenticate(public_token)
      },
    })

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

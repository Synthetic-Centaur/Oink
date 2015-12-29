import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/lib/raised-button'

class PlaidButton extends Component {
  componentDidMount() {
    this.props.getKey()
  }

  handlePlaid(e) {
    e.preventDefault()

    const { authenticate, publicKey, accountModal } = this.props

    accountModal.dismiss()

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
      <div className="row" style={{padding: '24px'}}>
        <RaisedButton
          label="Link your Bank Account"
          onClick={this.handlePlaid.bind(this)}
        />
      </div>
    )
  }
}

PlaidButton.propTypes = {
  authenticate: PropTypes.func.isRequired
}

export default PlaidButton

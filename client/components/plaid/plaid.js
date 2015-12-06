import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/lib/raised-button'
import axios from 'axios'

class Login extends Component {
  handlePlaid() {
    var sandboxHandler = Plaid.create({
      env: 'tartan',
      clientName: 'Client Name',
      key: 'test_key',
      product: 'connect',
      onSuccess: function(public_token) {
        //send this public token to the server
        console.log(public_token);
      },
    });

    sandboxHandler.open()
  }
  render() {
    return (
        <div className="container">
          <div className="row">
            <RaisedButton
              label="Link your Bank Account"
              onClick={this.handlePlaid}
            />
          </div>
        </div>
    )
  }
}

Login.propTypes = {

}

export default Login

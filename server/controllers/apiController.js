import User from '../db/models/user'
import Users from '../db/collections/users'

// private environmental variables
import config from '../env/envConfig'

// twilio
const accountSid = config.twilio_private.accountSid
const authToken = config.twilio_private.authToken
const twilioPhone = config.twilio_private.twilioPhone

console.log('SID', accountSid)
console.log('authToken', authToken)

const client = require('twilio')(accountSid, authToken)

// plaid
const clientId = config.plaid_private.clientId
const secret = config.plaid_private.secret

import plaid from 'plaid'
import bluebird from 'bluebird'
bluebird.promisifyAll(plaid)

let plaidClient = new plaid.Client(clientId, secret, plaid.environments.tartan)
//let plaidClient = new plaid.Client('test_id', 'test_secret', plaid.environments.tartan)



let apiController = {

  tradeToken(public_token) {
    return plaidClient.exchangeTokenAsync(public_token)
  },
  getTransactions(plaid_token) {
    plaidClient.getConnectUser(plaid_token,
    {
      gte: '30 days ago',
      // TODO: update webhook
      webhook: 'http://a2ec5c23.ngrok.io'
    },
    function (err, response) {
      if (err) {
        console.log('ERROR', err);
      } else {
        console.log('You have ' + response.transactions.length +' transactions from the last thirty days.');
        // TODO: need to make async and move this logic to controller to send back
        //res.send(response.transactions);
      }
    })
  },
  sendMessage(text, phone) {
    // send twilio message
    client.messages.create({ 
      to: phone, 
      from: twilioPhone, 
      body: text,   
    }, function(err, message) {
      if (err) {
        console.log(err)
        return err
      } else {
        console.log(message.sid)
        return message.sid
      }
    });
  }
} 

export default apiController

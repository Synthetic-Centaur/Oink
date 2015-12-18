import Category from '../db/models/category'
import budgetController from './budgetController'

// private environmental variables
import config from '../env/envConfig'

// twilio
const accountSid = config.twilio_private.accountSid
const authToken = config.twilio_private.authToken
const twilioPhone = config.twilio_private.twilioPhone

const client = require('twilio')(accountSid, authToken)

// plaid
const clientId = config.plaid_private.clientId
const secret = config.plaid_private.secret

import request from 'request'
import plaid from 'plaid'
import bluebird from 'bluebird'
bluebird.promisifyAll(plaid)

let plaidClient = new plaid.Client(clientId, secret, plaid.environments.tartan)

//let plaidClient = new plaid.Client('test_id', 'test_secret', plaid.environments.tartan)

let apiController = {

  tradeToken(public_token) {
    return plaidClient.exchangeTokenAsync(public_token)
  },

  setWebhook(plaid_token) {
    plaidClient.patchConnectUser(plaid_token,
    {},
    {
      webhook: 'http://28b2127e.ngrok.io/webhook'
    },
    (err, mfaResponse, response) => {
      // The webhook URI should receive a code 4 "webhook acknowledged" webhook
      console.log('ERROR', err)
      console.log('MFA', mfaResponse)

      // this will get initial state. All accounts and transactions
      //console.log('RESPONSE', response)
      console.log('User has been patched, webhook should receive a code 4 "webhook acknowledged" webhook')
    })
  },

  retrieveTransactions(plaid_token, userid) {
    // TODO: this logic should be reorganized -- > need to add update budget method on budget controller to simplify
    return plaidClient.getConnectUser(plaid_token,
    {
      // TODO: update webhook
      webhook: 'http://28b2127e.ngrok.io/webhook'
    },
    (err, response) => {
      if (err) {
        console.log('ERROR', err)
      } else {
        //TODO: need to make async and move this logic to controller to send back
        budgetController.updateTransactions(response.transactions, userid).then((response) => {
          // check to see if new transactions were updated
          if (response.length > 0) {
            
            // sum user's budget
            budgetController.updateBudget(userid)
          }
        })
      }
    })
  },

  updateTransactions(plaid_token, userid) {

    // TODO: update transactions and get transactions are basically the same call -- the only dif is that update transactions
    // only is pulling trans from the last month to keep pulls smaller -- should reorganize this for more code reuse
    // TODO: this logic should be reorganized -- > need to add update budget method on budget controller to simplify
    return plaidClient.getConnectUser(plaid_token,
    {
      gte: '30 days ago',

      // TODO: update webhook
      webhook: 'http://28b2127e.ngrok.io/webhook'
    },
    (err, response) => {
      if (err) {
        console.log('ERROR', err)
      } else {
        console.log('Transactions (first 4): ', response.transactions.slice(0, 4))

        console.log('You have ' + response.transactions.length + ' transactions')

        //TODO: need to make async and move this logic to controller to send back
        budgetController.updateTransactions(response.transactions, userid).then((response) => {

          console.log('response from update transactions -- inside api controller', response)

          // check to see if new transactions were updated
          // TODO: FIX THIS!!!! response always coming back populated so check doesn't work
          //if (response.length > 0) {
          // TODO: this inner logic should be modularized
          // sum user's budget
          budgetController.updateBudget(userid)

          //}
        })
      }
    })
  },

  sendMessage(text, phone) {
    // send twilio message
    client.messages.create({
      to: phone,
      from: twilioPhone,
      body: text,
    }, (err, message) => {
      if (err) {
        console.log(err)
        return err
      } else {
        console.log(message.sid)
        return message.sid
      }
    })
  },

  getCategories() {
    // Get request for all plaid categories
    request('https://tartan.plaid.com/categories', (error, response, body) => {
      // If successful call
      if (!error && response.statusCode === 200) {
        // Parse body object
        let arr = JSON.parse(body)

        // Remove duplicates
        arr = arr.reduce((acc, item) => {
          if (acc.indexOf(item.hierarchy[0]) === -1) {
            acc.push(item.hierarchy[0])
          }

          return acc
        }, [])

        // Iterate over array
        bluebird.map(arr, (item) => {
          // Establish search criteria
          let searchCat = new Category({ description: item })

          // Query category table
          return searchCat.fetch().then((cat) => {
            // If category is not on list
            if (!cat) {
              // Add category to db
              return searchCat.save().then((newCat) => {
                // Return new category
                return newCat
              })

            // If category is in table
            } else {
              //Do nothing
              return
            }
          })
        })
      }
    })
  }
}

export default apiController

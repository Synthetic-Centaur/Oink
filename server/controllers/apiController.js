import User from '../db/models/user'
import Users from '../db/collections/users'
import Category from '../db/models/category'
import Categories from '../db/collections/categories'
import budgetController from './budgetController'
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

import request from 'request'
import _ from 'underscore'
import plaid from 'plaid'
import bluebird from 'bluebird'
bluebird.promisifyAll(plaid)

let plaidClient = new plaid.Client(clientId, secret, plaid.environments.tartan)
// let plaidClient = new plaid.Client('test_id', 'test_secret', plaid.environments.tartan)



let apiController = {

  tradeToken(public_token) {
    return plaidClient.exchangeTokenAsync(public_token)
  },
  getTransactions(plaid_token, userid) {
    console.log('palid_token: ', plaid_token)
    return plaidClient.getConnectUser('test_wells',
    {
      gte: '360 days ago',
      // TODO: update webhook
      webhook: 'http://a2ec5c23.ngrok.io'
    },
    function (err, response) {
      if (err) {
        console.log('ERROR', err);
      } else {
        /////////////////////For testing purposes, please remove///////////////////

        const transactions = [{
          "_account": "XARE85EJqKsjxLp6XR8ocg8VakrkXpTXmRdOo",
          "_id": "0AZ0De04KqsreDgVwM1RSRYjyd8yXxSDQ8Zxn",
          "amount": 200,
          "date": "2014-07-21",
          "name": "ATM Withdrawal",
          "meta": {
            "location": {
              "city": "San Francisco",
              "state": "CA"
            }
          },
          "pending": false,
          "type": {
            "primary": "special"
          },
          "category": [
            "Transfer",
            "Withdrawal",
            "ATM"
          ],
          "category_id": "21012002",
          "score": {
            "location": {
              "city": 1,
              "state": 1
            },
            "name": 1
          }
        },
        {
          "_account": "XARE85EJqKsjxLp6XR8ocg8VakrkXpTXmRdOo",
          "_id": "3mg4qV4JZycjewvKEzrLTYMzdr1MmvcO4Z3zX",
          "amount": 240,
          "date": "2014-07-24",
          "name": "Online Transfer from External Sav ...3092",
          "meta": {
            "location": {}
          },
          "pending": false,
          "type": {
            "primary": "special"
          },
          "category": [
            "Transfer",
            "Account Transfer"
          ],
          "category_id": "21001000",
          "score": {
            "location": {},
            "name": 1
          }
        }]


        ///////////////////////////////////////////////
        console.log("transactions: ", transactions)
        // console.log('Transactions: ', response.transactions);
        // console.log('You have ' + response.transactions.length +' transactions from the last 400 days.');
        // TODO: need to make async and move this logic to controller to send back
        budgetController.saveTransactions(transactions, userid)
        //res.send(response.transactions);
        //call saveTransactions controller to save transactions into database: budgetController.saveTransactions(transactions)
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
  },
  getCategories(){
    // Get request for all plaid categories
    request('https://tartan.plaid.com/categories', (error, response, body) => {
      // If successful call
      if( !error && response.statusCode === 200 ) {
        // Parse body object
        let arr = JSON.parse(body)
        // Remove duplicates
        arr = arr.reduce( (acc, item) => {
          if(acc.indexOf(item.hierarchy[0]) === -1) {
            acc.push(item.hierarchy[0])
          }
          return acc
        }, [])
        // Iterate over array
        bluebird.map(arr, (item) => {
          // Establish search criteria
          let searchCat = new Category({ description: item })
          // Query category table
          return searchCat.fetch().then( (cat) => {
            // If category is not on list
            if ( !cat ) {
              // Add category to db
              return searchCat.save().then( (newCat) => {
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

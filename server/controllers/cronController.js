//Node scheduler for cron jobs
import schedule from 'node-schedule'
//private environmental variables
import config from '../env/envConfig'
//twilio account credentials
const accountSid = config.twilio_private.accountSid
const authToken = config.twilio_private.authToken
const twilioPhone = config.twilio_private.twilioPhone
//twilio client with credential input
const client = require('twilio')(accountSid, authToken)

import db from '../db/dbConfig.js'

import authController from './authController'
import Promise from 'bluebird'

let cronController = {
  findUsersByMail() {
    console.log("in find users by mail")
    return db.knex.select().table('users').where({receive_mail: true})
      .then((users) => {
        if (users) {
          return users
        } else {
          return null
        }
      })
  },

  cancelEmail(user, callback) {

    user.attributes.receive_mail = false
    return user.save().then((user) => {
      if (user) {
        callback(null, 'success')
      }
    })
    
  },

  userTransactions(userId) {
    let categories = {}
    db.knex
      .select()
      .table('transactions')
      .where({user_id: userId})
      .then((transactions) => {
        Promise.map(transactions, (transaction) => {
          if (transaction.date >= new Date.getWeek() - 1) {
            if (transaction.category_id in categories) {
              categories[transaction.category_id] += transaction.amount
            } else {
              categories[transaction.category_id] = transaction.amount
            }
          }
        })
          .then(() => {
            return categories
          })
      })
  }
}

export default cronController
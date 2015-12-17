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
    return db.knex
      .select()
      .table('transactions')
      .where({user_id: userId})
      .then((transactions) => {
        return Promise.map(transactions, (transaction) => {
          let date = new Date()
          date.setDate(date.getDate() - 7)
          if (transaction.date >= date) {
            return db.knex.select().table('categories').where({id: transaction.category_id})
              .then((category) => {

                if (category.description in categories) {
                  categories[category.description] += transaction.amount
                } else {
                  categories[category.description] = transaction.amount
                }

              })
          }
        })
          .then(() => {
            return categories
          })
      })
  }
}

export default cronController
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

/////////////////////////////Modules for creating highchart serverside///////////////////////
import system from 'system'
let page = require('webpage').create()
page.injectJs("js/jquery.min.js");
page.injectJs("js/highcharts/highcharts.js");
page.injectJs("js/highcharts/exporting.js");
//////////////////////////////////////////////////////////////////////////////////////////////

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
  },

  makeEmailChart(transactions) {
    let args = {
      width: 600,
      height: 500
    }

    let svg = page.evaluate((opt) => {
      $('body').prepend('<div id="container"></div>')
      var chart = new Highcharts.Chart({
        chart: {
          renderTo: 'container',
          width: opt.width,
          height: opt.height
        },
        exporting: {
          enabled: false
        },
        title: {
          text: 'Combination chart'
        },
        xAxis: {
          categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
        },
        yAxis: {
          title: {
              text: 'Y-values'
          }
        },
        labels: {
          items: [{
            html: 'Total fruit consumption',
            style: {
              left: '40px',
              top: '8px',
              color: 'black'
            }
          }]
        },
        plotOptions: {
          line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
          },
          series: {
            enableMouseTracking: false, 
            shadow: false, 
            animation: false
          }
        },
        series: [{
          type: 'column',
          name: 'Andrii',
          data: [3, 2, 1, 3, 4]
        }, {
          type: 'column',
          name: 'Fabian',
          data: [2, 3, 5, 7, 6]
        }, {
          type: 'column',
          name: 'Joan',
          data: [4, 3, 3, 9, 0]
        }, {
          type: 'spline',
          name: 'Average',
          data: [3, 2.67, 3, 6.33, 3.33],
          marker: {
            lineWidth: 2,
            lineColor: 'white'
          }
        }, {
            type: 'pie',
            name: 'Total consumption',
            data: [{
                name: 'Andrii',
                y: 13,
                color: '#4572A7'
            }, {
                name: 'Fabian',
                y: 23,
                color: '#AA4643'
            }, {
                name: 'Joan',
                y: 19,
                color: '#89A54E'
            }],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
      })  

      return chart.getSVG()
    }, args)
  }
}

export default cronController
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

import highcharts from 'highcharts'
import jsdom from 'jsdom'
import fs from 'fs'
import svg2png from 'svg2png'

const writeFile = Promise.promisify(fs.writeFile)

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

  makeEmailChart(sums) {
    //create document and window for highchart
    var doc = jsdom.jsdom('<!doctype html><html><body><div id="container"></div></body></html>'),
    win = doc.defaultView;
    doc.createElementNS = function (ns, tagName) {
        var elem = doc.createElement(tagName);

        // Set private namespace to satisfy jsdom's getter
        elem._namespaceURI = ns; // eslint-disable-line no-underscore-dangle

        elem.createSVGRect = function () {};

        elem.getBBox = function () {
            var lineWidth = 0,
                width = 0,
                height = 0;

            [].forEach.call(elem.children.length ? elem.children : [elem], function (child) {
                var fontSize = child.style.fontSize || elem.style.fontSize,
                    lineHeight,
                    textLength;

                // The font size and lineHeight is based on empirical values, copied from
                // the SVGRenderer.fontMetrics function in Highcharts.
                if (/px/.test(fontSize)) {
                    fontSize = parseInt(fontSize, 10);
                } else {
                    fontSize = /em/.test(fontSize) ? parseFloat(fontSize) * 12 : 12;
                }
                lineHeight = fontSize < 24 ? fontSize + 3 : Math.round(fontSize * 1.2);
                textLength = child.textContent.length * fontSize * 0.55;

                // Tspans on the same line
                if (child.getAttribute('dx') !== '0') {
                    height += lineHeight;
                }

                // New line
                if (child.getAttribute('dy') !== null) {
                    lineWidth = 0;
                }

                lineWidth += textLength;
                width = Math.max(width, lineWidth);

            });

            return {
                x: 0,
                y: 0,
                width: width,
                height: height
            };
        };
        return elem;
    };

    const Highcharts = highcharts(win)

    Highcharts.setOptions({
      plotOptions: {
        series: {
          animation: false,
          dataLabels: {
            defer: false
          }
        }
      }
    })
    // Generate the chart into the container
    Highcharts.chart('container', chartConfig());

    //get svg and remove div container surrounding it
    var svg = win.document.getElementById('container').innerHTML.slice(178)
    svg = svg.slice(0, -6)

    //write svg file and convert it to png
    writeFile(__dirname + "/../staticUserCharts/chart.svg", svg).then(() => {
      svg2png(__dirname + "/../staticUserCharts/chart.svg", __dirname + "/../staticUserCharts/chart.png", (err) => {
        if (err) {
          console.log(err)
          return 'err'
        } else {
          return 'great success!'
        }
      })
    })

  }
}

function chartConfig(data) {


  //convert sums to datapoints for highchart
  let userCategories = []
  let dataPoints = []
  for (var key in data) {
    userCategories.push(key)
    dataPoints.push({y: data[key]})
  }

  return {
    chart: {
        type: 'column',
        width: 600,
        height: 400
    },
    title: {
        text: 'Your Weekly Transactions'
    },
    xAxis: {
        //switch out hardcoded categories with user categories
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    yAxis: {
        title: {
            text: 'Rainfall / mm'
        }
    },

    plotOptions: {
        series: {
            dataLabels: {
                shape: 'callout',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                style: {
                    color: '#FFFFFF',
                    textShadow: 'none'
                }
            }
        }
    },

    series: [{
        //switch out hardCoded data with user data points
        name: 'Monthly rainfall',
        data: [{
            y: 29.9,
        }, {
            y: 71.5
        }, {
            y: 106.4
        }, {
            y: 129.2
        }, {
            y: 144.0
        }, {
            y: 176.0
        }, {
            y: 135.6
        }, {
            y: 148.5
        }, {
            y: 216.4,
        }, {
            y: 194.1
        }, {
            y: 95.6
        }, {
            y: 54.4
        }]
    }]
  }
}

export default cronController
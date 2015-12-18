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

const writeFile = Promise.promisify(fs.writeFile)

const doc = jsdom.jsdom('<!doctype html><html><body><div id="container"></div></body></html>')
const win = doc.defaultView
doc.createElementNS = function (ns, tagName) {
  var elem = doc.createElement(tagName);

  // Set private namespace to satisfy jsdom's getter
  elem._namespaceURI = ns; // eslint-disable-line no-underscore-dangle
  /**
   * Pass Highcharts' test for SVG capabilities
   * @returns {undefined}
   */
  elem.createSVGRect = function () {};
  /**
   * jsdom doesn't compute layout (see https://github.com/tmpvar/jsdom/issues/135).
   * This getBBox implementation provides just enough information to get Highcharts
   * to render text boxes correctly, and is not intended to work like a general
   * getBBox implementation. The height of the boxes are computed from the sum of
   * tspans and their font sizes. The width is based on an average width for each glyph.
   * It could easily be improved to take font-weight into account.
   * For a more exact result we could to create a map over glyph widths for several
   * fonts and sizes, but it may not be necessary for the purpose.
   * @returns {Object} The bounding box
   */
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
    Highcharts.chart('container', chartConfig())
    let svg = win.document.getElementById('container').innerHTML
    writeFile('chart.svg', svg).then(() => {
      return 'success!!'
    })
  }
}

function chartConfig() {
  return {
    chart: {
        type: 'column',
        width: 600,
        height: 400
    },
    title: {
        text: 'Highcharts and jsdom'
    },
    subtitle: {
        text: 'This chart is generated <em>without</em> a browser'
    },
    xAxis: {
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
        name: 'Monthly rainfall',
        data: [{
            y: 29.9,
            dataLabels: {
                enabled: true,
                format: 'January<br><span style="font-size: 1.3em">Dryest</span>',
                // format: 'Dryest',
                verticalAlign: 'bottom',
                y: -10
            }
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
            dataLabels: {
                enabled: true,
                format: 'September<br><span style="font-size: 1.3em">Wettest</span>',
                // format: 'Wettest',
                align: 'right',
                verticalAlign: 'middle',
                x: -35
            }
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
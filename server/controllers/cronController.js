import schedule from 'node-schedule'
import Promise from 'bluebird'
import highcharts from 'highcharts'
import jsdom from 'jsdom'
import fs from 'fs'
import svg2png from 'svg2png'
import db from '../db/dbConfig.js'
import authController from './authController'

const writeFile = Promise.promisify(fs.writeFile)

let cronController = {

  // Find all users who have not opted out of email
  findUsersByMail() {
    return db.knex.select().table('users').where({email_updates: true})
      .then((users) => {
        if (users) {
          return users
        } else {
          return null
        }
      })
  },

  // Cancel email for user who has opted outs
  cancelEmail(user, callback) {

    user.attributes.email_updates = false
    return user.save().then((user) => {
      if (user) {
        callback(null, 'success')
      }
    })
    
  },

  // Retrieve transactions for user from past week
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
                console.log(category)
                let type = category[0].description
                let amount = transaction.amount
                if (!(type in categories)) {
                  categories[type] = amount
                } else {
                  categories[type] += amount
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
    // Create mock document and window for highchart
    let doc = jsdom.jsdom('<!doctype html><html><body><div id="container"></div></body></html>')
    let win = doc.defaultView
    doc.createElementNS = (ns, tagName) => {
      let elem = doc.createElement(tagName)

      elem._namespaceURI = ns

      elem.createSVGRect = function() {}

      elem.getBBox = function() {
        let lineWidth = 0
        let width = 0
        let height = 0

        Array.prototype.forEach.call(elem.children.length ? elem.children : [elem], (child) => {
          let fontSize = child.style.fontSize || elem.style.fontSize
          let lineHeight
          let textLength

          // The font size and lineHeight is based on empirical values, copied from
          // the SVGRenderer.fontMetrics function in Highcharts.
          if (/px/.test(fontSize)) {
            fontSize = parseInt(fontSize, 10)
          } else {
            fontSize = /em/.test(fontSize) ? parseFloat(fontSize) * 12 : 12
          }

          lineHeight = fontSize < 24 ? fontSize + 3 : Math.round(fontSize * 1.2)
          textLength = child.textContent.length * fontSize * 0.55

          // Tspans on the same line
          if (child.getAttribute('dx') !== '0') {
            height += lineHeight
          }

          if (child.getAttribute('dy') !== null) {
            lineWidth = 0
          }

          lineWidth += textLength
          width = Math.max(width, lineWidth)

        })

        return {
          x: 0,
          y: 0,
          width: width,
          height: height
        }
      }

      return elem
    }

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
    Highcharts.chart('container', chartConfig(sums))

    // Get svg and remove div container surrounding it
    let svg = win.document.getElementById('container').innerHTML.slice(178)
    svg = svg.slice(0, -6)

    // Write svg file and convert it to png
    writeFile(__dirname + '/../staticUserCharts/chart.svg', svg).then(() => {
      svg2png(__dirname + '/../staticUserCharts/chart.svg', __dirname + '/../staticUserCharts/chart.png', (err) => {
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

  // Convert sums to datapoints for highchart
  let userCategories = []
  let dataPoints = []
  for (var key in data) {
    userCategories.push(key)
    dataPoints.push({y: data[key]})
  }

  // Return custom high chart data
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
      categories: userCategories
    },

    yAxis: {
      title: {
        text: 'Dollars / week'
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
      name: 'Categories',
      data: dataPoints
    }]
  }
}

export default cronController

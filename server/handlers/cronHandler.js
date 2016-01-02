import cronController from '../controllers/cronController'
import authController from '../controllers/authController'
import Promise from 'bluebird'
import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport()
const makeChart = Promise.promisify(cronController.makeEmailChart)

let cronHandler = {

  // Sends email to each user in database
  sendMail: function() {
    // Get all users by mailBoolean
    cronController.findUsersByMail()
      .then((users) => {
        if (users) {
          Promise.each(users, (user) => {
            // Get user's transactions/actual for week
            cronController.userTransactions(user.id)
              .then((sums) => {

                // Create highcharts png with transaction data
                cronController.makeEmailChart(sums)

                // Create email with png attachment
                let mailOptions = {
                  from: 'aaronbackerman@gmail.com',
                  to: user.email,
                  subject: 'Your weekend summary',
                  text: 'Dear ' + user.first_name + ',\n\nHere is your financial data for the week of ' + ('' + new Date()).slice(0, 15) + '\n\nSincerely,\nOinkFinancial',
                  attachments: [{
                    filename: 'chart.png',
                    path: __dirname + '/../staticUserCharts/chart.png'
                  }]
                }

                // Send out email
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    return console.log(error)
                  }
                })
              })
          })
        }
      })
  },

  // Cancels email job for specific user
  cancelEmail: function(req, res) {
    authController.findUserByToken(req)
      .then((user) => {
        cronController.cancelEmail(user, (err, result) => {
          if (result) {
            res.status(200)
            res.json({success: true})
          } else {
            res.state(400)
          }
        })
      })
  }

}

export default cronHandler

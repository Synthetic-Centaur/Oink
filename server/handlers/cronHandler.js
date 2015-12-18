import cronController from '../controllers/cronController'
import authController from '../controllers/authController'
import Promise from 'bluebird'
import nodemailer from 'nodemailer'

var transporter = nodemailer.createTransport();
const makeChart = Promise.promisify(cronController.makeEmailChart)

import phantom from 'node-phantom'

let cronHandler = {

  sendMail: function() {
    //get all users by mailBoolean
    cronController.findUsersByMail()
      .then((users) => {
        if (users) {
          Promise.each(users, (user) => {
            //get users transactions/actul for week
            cronController.userTransactions(user.id)
              .then((sums) => {

                cronController.makeEmailChart(sums)

                let mailOptions = {
                  from: 'aaronbackerman@gmail.com',
                  to: user.email,
                  subject: 'Your weekend summary',
                  text: 'Dear ' + user.first_name + ',\n\nHere is your financial data for the week of ' + (""+ new Date()).slice(0,15) + '\n\nSincerely,\nOinkFinancial',
                  attachments: [{
                    filename: 'chart.png',
                    path: __dirname + "/../staticUserCharts/chart.png"
                  }]
                }

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

  cancelEmail: function(req, res) {
    authController.findUserByToken(req)
      .then((user) => {
        cronController.cancelEmail(user, function(err, result) {
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
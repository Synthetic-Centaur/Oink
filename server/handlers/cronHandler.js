import cronController from '../controllers/cronController'
import authController from '../controllers/authController'
import Promise from 'bluebird'
import nodemailer from 'nodemailer'

var transporter = nodemailer.createTransport();

let cronHandler = {

  sendMail: function() {
    //get all users by mailBoolean
    cronController.findUsersByMail()
      .then((users) => {
        if (users) {
          Promise.each(users, (user) => {
            //get users transactions by week
            //get users budget for week
            //get users actual for week
            //send email
            let mailOptions = {
              from: 'aaronbackerman@gmail.com',
              to: user.email,
              subject: 'Your weekend summary',
              text: 'Hello from Oink Financial!!',
              html: '<b>Hello World</b>'
            }

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error)
              }
            })

          })

        } 

      })
  },
  removeUser: function(req, res) {

  }

}

export default cronHandler
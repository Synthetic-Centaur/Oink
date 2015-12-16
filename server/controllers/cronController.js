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

import authController from './authController'

let cronController = {
  addText(user, callback) {

    let phone = user.phone_number
    let id = user.id
    let email = user.email

    let job = schedule.scheduleJob('job_sms_1', '*/1 * * * *', function () {
      //trigger twillio text
      client.messages.create({
        to: '5152919699',
        from: twilioPhone,
        body: "your cron job says hello!!"
      }, (err, message) => {
        if (err) {
          console.log(err)
          return err
        } else {
          console.log(message.sid)
          return message.sid
        }
      })

    })

    console.log("Here's your new job-------->", job)

    callback(null, "it worked")

  },
  cancelText(user, callback) {

    let id = user.id
    
    let allJobs = schedule.scheduledJobs
    let job = allJobs['job_sms_1']

    console.log("Here's your old job---------->",job)

    job.cancel()

    console.log("your job should be cancelled!")

    callback(null, "it worked")
  }
}

export default cronController
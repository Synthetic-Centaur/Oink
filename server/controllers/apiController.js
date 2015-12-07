import User from '../db/models/user'
import Users from '../db/collections/users'
import twilio_private from '../env/envConfig'

const accountSid = twilio_private.accountSid
const authToken = twilio_private.authToken

console.log('SID', accountSid)
console.log('authToken', authToken)

const client = require('twilio')(accountSid, authToken)

let apiController = {

  sendMessage(text, phone) {
    // send twilio message
    client.messages.create({ 
      to: phone, 
      from: '+14243534735', 
      body: text,   
    }, function(err, message) {
      if (err) {
        console.log(err)
        return err
      } else {
        console.log(message.sid)
        return message.sid
      }
    });
  }
} 

export default apiController

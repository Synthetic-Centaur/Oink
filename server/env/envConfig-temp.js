/******************************************************
TODO:
1) Create a new file called envConfig.js in this folder
2) Copy this file into envConfig.js, and replace the
   the necessary keys

Note: envConfig.js will always be git ignored
******************************************************/

// Twilio Account information
const twilio_private = {
  accountSid: 'TWILIO_ACCOUNT_SID',
  authToken: 'TWILIO_AUTH_TOKEN',
  twilioPhone:'TWILIO_PHONE_NUMBER'
}

// plaid account information
const plaid_private = {
  clientId: 'PLAID_CLIENT_ID',
  secret: 'PLAID_CLIENT_SECRET',
  publicKey: 'PLAID_PUBLIC_KEY'
}

// jwt secret
const jwt_private = {
  secret: 'JWT_SECRET'
}

const config = {
  twilio_private: twilio_private,
  plaid_private: plaid_private,
  jwt_private: jwt_private
}

export default config

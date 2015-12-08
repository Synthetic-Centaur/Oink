// Twilio Account information
const twilio_private = {
  accountSid: 'AC804a5a4ef06f716564a1cabbdd115b15',
  authToken: 'd855f7bd1cd12a9fa785fcdeeebc02cf',
  twilioPhone: '+14243534735'
}

// plaid account information
const plaid_private = {
  clientId: '565f91cb3f6cefeb78df5293',
  secret: 'bcccf16a262026994461b7385d906c',
  publicKey: '169aae4a4d073c7dbf4962ba6c95e6'
}

const config = {
  twilio_private: twilio_private,
  plaid_private: plaid_private
}

export default config

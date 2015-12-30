/******************************************************
TODO:
1) Create a new file called envConfig.js in this folder
2) Copy this file into envConfig.js, and replace the
   the necessary keys

Note: envConfig.js will always be git ignored
******************************************************/

// Twilio Account information
let twilio_private

// plaid account information
let plaid_private

// jwt secret
let jwt_private

//Database connection settings
let db_connection

// Leaflet/Mapbox access token
let mapbox_private

// Dev enviroment
if (process.env.NODE_ENV === 'dev') {

  twilio_private = {
    accountSid: 'PRIVATE_KEY',
    authToken: 'AUTH_TOKEN',
    twilioPhone: 'PHONE_NUMBER'
  }

  plaid_private = {
    clientId: 'test_id',
    secret: 'test_secret',
    publicKey: 'test_key'
  }

  jwt_private = {
    secret: 'JWT_SECRET'
  }

  db_connection = {
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'admin',
    database: 'oink',
    charset: 'UTF8_GENERAL_CI'
  }

  mapbox_private = {
    accessToken: 'ACCESS_TOKEN'
  } 

// Test Enviroment
} else if (process.env.NODE_ENV === 'test') {

  twilio_private = {
    accountSid: 'PRIVATE_KEY',
    authToken: 'AUTH_TOKEN',
    twilioPhone: 'PHONE_NUMBER'
  }

  plaid_private = {
    clientId: 'test_id',
    secret: 'test_secret',
    publicKey: 'test_key'
  }

  jwt_private = {
    secret: 'JWT_SECRET'
  }

  db_connection = {
    host: 'localhost',
    port: 5432,
    user: 'ubuntu',
    database: 'circle_test',
  }

  mapbox_private = {
    accessToken: 'ACCESS_TOKEN'
  }

// Production enviroment
} else {

  twilio_private = {
    accountSid: process.env.twilio_accountSID,
    authToken: process.env.twilio_authToken,
    twilioPhone: process.env.twilio_phone
  }

  plaid_private = {
    clientId: process.env.plaid_clientID,
    secret: process.env.plaid_secret,
    publicKey: process.env.plaid_publicKey
  }

  jwt_private = {
    secret: process.env.jwt_secret
  }

  db_connection = {
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME
  }

  mapbox_private = {
    accessToken: process.env.mapbox_accessToken
  }
}

const config = {
  twilio_private: twilio_private,
  plaid_private: plaid_private,
  jwt_private: jwt_private,
  db_connection: db_connection,
  mapbox_private: mapbox_private
}

export default config

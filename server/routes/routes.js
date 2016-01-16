// ## Server Routing
import path from 'path'
import app from '../server'

import authHandler from '../handlers/authHandler'
import apiHandler from '../handlers/apiHandler'
import cronHandler from '../handlers/cronHandler'

// #### Authentication Routes
// verifies that user's password is valid and assigns session token
app.post('/auth/login', authHandler.login)

// verifies that email is not already in database then adds user to database and assigns session token
app.post('/auth/signup', authHandler.signup)

// sends public token issued by Plaid Link on successful signup
app.get('/auth/plaid', authHandler.getPlaid)

// exchanges public Plaid Link token for private Plaid token which can be used to receive user transactions
app.post('/auth/plaid', authHandler.plaid)

// sends 7 digit randomized code to user's phone number
app.get('/auth/phoneVerification/send', authHandler.sendVerificationCode)

// checks the code the user entered against code in database to verify user's phone number
app.put('/auth/phoneVerification/check', authHandler.checkVerificationCode)


// #### API Routes
// gets state for entire application
app.get('/api/initialState', apiHandler.initialState)

// handles additions and updates to user budget
app.post('/api/budget/category/:id', apiHandler.addOrUpdateBudget)

// deletes a user's budget
app.delete('/api/budget/category/:id', apiHandler.deleteBudget)

// sets a new goal for user
app.post('/api/goals', apiHandler.createGoal)

// deletes user's goal
app.delete('/api/goals/:id', apiHandler.deleteGoal)

// updates a user's goal to a new value
app.put('/api/goals/:id', apiHandler.updateGoal)

// gets all transactions for given user
app.get('/api/transactions', apiHandler.getTransactions)

// gets transactions for user after specified year and month
app.get('/api/transactions/:year/:month', apiHandler.getTransactions)

// updates settings for user, all settings passed in body of request will be updated
app.post('/api/settings', apiHandler.settings)

// deletes user's account and removes user from all tables in database
app.delete('/api/deleteAccount', apiHandler.deleteAccount)


// #### Documentation Routes
// directs user to project documentation
app.get('/documentation', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../docs/tableofcontents.js.html'))
})


// #### Webhook Routes
// sets webhook with the Plaid API on inital transaction pull
app.get('/setWebhook', apiHandler.setWebhook)

// recieves webhook updates from Plaid when users transactions are updated
app.post('/webhook', (req, res) => {
  
  if (req.body.code === 2) {
    apiHandler.usersDailyTransactions()
  }
})


// #### Demo route to show transaction updates
// when called this route will mimic the daily transaction pull and updte transactions for all users in database
app.get('/transactions', (req, res) => {
  apiHandler.usersDailyTransactions().then((response) => {
    res.sendStatus(200)
  })
})

import app from '../server'
import path from 'path'

import authHandler from '../handlers/authHandler'
import apiHandler from '../handlers/apiHandler'

//Model dependencies for search
import authController from '../controllers/authController' 


app.post('/auth/login', authHandler.login)

app.get('/auth/logout', function(req, res) {

})

app.post('/auth/signup', authHandler.signup)

// authHandler.isLoggedIn middleware will verify if JWT is valid
app.get('/test', authHandler.isLoggedIn, function(req, res) {
  // Get the token from the req's headers
  // Can verify in postman by send GET req to localhost:3000/test
  // with headers of key: authorization and value: 'Bearer ' + token
  var token = req.headers.authorization.split(' ')[1]
  res.send('yay it worked! here is your token: ' + token)
})

app.get('/auth/authenticate', authHandler.authenticate)

app.post('/auth/plaid', authHandler.plaid)

app.get('/api/intitialState', apiHandler.intitialState)

app.post('/api/budget/category/:id', apiHandler.budget)

app.get('/message', apiHandler.message)

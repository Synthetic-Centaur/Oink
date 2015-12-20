import authController from '../controllers/authController'
import apiController from '../controllers/apiController'
import budgetController from '../controllers/budgetController'
import jwt from 'jsonwebtoken'

// shhhhh secrets
import config from '../env/envConfig'

const jwt_secret = config.jwt_private.secret

let authHandler = {
  isLoggedIn(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(403).json({
        success: false,
        message: 'No token provided.'
      })
    }

    // check header or url parameters or post parameters for token
    var token = req.headers.authorization.split(' ')[1]

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' })
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded
          next()
        }
      })

    } else {
      // if there is no token
      // return an error
      return res.status(403).json({
        success: false,
        message: 'No token provided.'
      })
      
    }
  },

  login(req, res, next) {

    // Finds the user with provided email
    authController.findUser({email: req.body.email}).then((user) => {
      if (!user) {
        res.status(403)
        res.json({ success: false, message: 'Invalid Email' })
        
      // Check if the user has authenticated their bank with Plaid
      } else if (!user.attributes.token_plaid) {
        res.status(403)
        res.json({success: false, message: 'Invalid Bank'})
      } else {
        // Checks if provided password is valid
        if (!user.validPassword(req.body.password)) {
          res.status(403)
          res.json({success: false, message: 'Invalid Password'})
        }

        // if user is found and password is right
        // create a token
        let token = jwt.sign(user.attributes.email, jwt_secret, {
          expiresIn: 604800 // expires in 24 hours
        })

        authController.saveAuthToken(token, user.attributes.id).then((user) => {
          // return the information including token as JSON
          res.status(200)
          res.json({
            success: true,
            message: 'Enjoy your token!',
            jwt_token: token,
            expiresIn: 604800
          })
        })
      }
    })
  },

  signup(req, res, next) {
    // Finds the user with provided email
    authController.findUser({email: req.body.email}).then((user) => {
      if (!user) {

        //If user is not in database, create user
        authController.addUser(req.body).then((newUser) => {
          let token = jwt.sign(newUser.attributes.email, jwt_secret, {
            expiresIn: 604800 // expires in 24 hours
          })

          // save auth token to DB
          authController.saveAuthToken(token, newUser.attributes.id).then((user) => {

            // send the token back to the user
            res.json({
              success: true,
              message: 'Enjoy your token!',
              jwt_token: token,
              expiresIn: 604800
            })
          })
        })
      }

      // If user found, cannot signup
      else {
        res.status(403)
        res.json({ success: false, message: 'User Exists' })
      }
    })
  },

  plaid(req, res) {
    // Get user token from header
    let token_auth = req.headers.authorization.split(' ')[1]
    let public_token = req.body.public_token

    // Swap public token for private token
    apiController.tradeToken(public_token)
    .then((response) => {
      if (response.statusCode === 200) {

        // request was successful --> we now have private access token as response.access_token
        authController.savePlaidToken(response.access_token, token_auth)
        .then((user) => {

          // if token attribute is not null the request was successful
          if (user.attributes.token_plaid) {
            let name = user.attributes.first_name
            let number = user.attributes.phone_number

            // get transactions from plaid
            apiController.retrieveTransactions(user.attributes.token_plaid, user.id)
            
            // .then( (transactions) => {
            //   budgetController.saveTransactions(transactions, userid)
            // })

            // set webhook for new user
            apiController.setWebhook(user.attributes.token_plaid)

            // send welcome message
            //apiController.sendMessage('Hello ' + name + '! Welcome to Oink, Lets Budget Together!!', number)

            res.sendStatus(201)
          } else {
            res.sendStatus(500)
          }
        })
      } else {
        // error handle
        res.sendStatus(500)
      }
    })
  },

  getPlaid(req, res) {
    res.json(config.plaid_private.publicKey)
  }
}

export default authHandler

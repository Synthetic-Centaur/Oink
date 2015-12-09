import authController from '../controllers/authController'
import apiController from '../controllers/apiController'
import jwt from 'jsonwebtoken'

let authHandler = {
  isLoggedIn(req, res, next) {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$ req headers', req.headers)

    // check header or url parameters or post parameters for token
    // var token = req.body.accessToken || req.query.token || req.headers['jwt-token'];
    var token = req.headers.authorization.split(' ')[1];

    console.log('TOKEN', tokenr)

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, 'kittyCat', function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });   
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next()
        }
      })

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      })
      
    }
  },
  login(req, res, next) {
    console.log('inside auth handler log in')
    // Finds the user with provided email
    authController.findUser({email: req.body.email}).then( (user) => {
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' })
      }
      // Checks if provided password is valid
      if (!user.validPassword(req.body.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' })
      }
      // if user is found and password is right
      // create a token
      let token = jwt.sign(user, 'kittyCat', {
        expiresIn: 604800 // expires in 24 hours
      })

      authController.saveAuthToken(token, newUser.attributes.id).then( (user) => {    
        // return the information including token as JSON
        res.status(200)
        res.json({
          success: true,
          message: 'Enjoy your token!',
          jwt_token: token
        })
      })
    })
    // passport.authenticate('local-login', (err, user, info) => {
    //   if (err) {
    //     res.sendStatus(500)
    //   } else if (!user) {
    //     res.sendStatus(409)
    //   } else {
    //     console.log(req.user)
    //     if (err) { return next(err); }
    //     return res.sendStatus(200)
    //   }
    // })(req, res)
  },
  logout(req, res) {
    //Deserializes user and destroys session
    req.logout();
    //Redirects to root
    res.redirect('/');
  },
  signup(req, res, next) {
    // Finds the user with provided email
    authController.findUser({email: req.body.email}).then( (user) => {
      if (!user) {

        //If user is not in database, create user
        authController.addUser(req.body).then( (newUser) => {

          console.log('NEW USER', newUser);

          let token = jwt.sign(newUser, 'kittyCat', {
            expiresIn: 604800 // expires in 24 hours
          });
          console.log('%%%%%%%%%%%%%', token)
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ABOUT TO SAVE $$$$$$$$$$$$$$$$$$$$$$$$$$$')
          console.log('user id getting passed', newUser.attributes.id)
          console.log('token getting passed', token)

          // save auth token to DB
          authController.saveAuthToken(token, newUser.attributes.id).then( (user) => {
            console.log('user after save token', user)

            // send the token back to the user
            res.json({
              success: true,
              message: 'Enjoy your token!',
              jwt_token: token
            });
          })
        })
      }
      // If user found, cannot signup 
      else {
        res.json({ success: false, message: 'Failed, user already exists.' })
      }
    })
  },
  authenticate(req, res) {
    console.log("inside authenticate handler")
    let user = req.body
    // will need passport for this to work --> for now assuming if user is in db this is successful
    authController.findUser.then( (result) => {
      if (result) {
        // user was found in db
        res.send(user)
      } else {
        // user was not found
        res.sendStatus(404)
      }
    })
  }, 
  plaid(req, res) {
    console.log('inside auth handler plaid')
    let token_auth = req.headers.authorization.split(' ')[1]
    console.log('AUTH TOKEN:', token_auth)
    let public_token = req.body.public_token
    apiController.tradeToken(public_token)
    .then( (response) => {
      if (response.statusCode === 200) {
        // request was successful --> we now have private access token as response.access_token
        // TODO update 1 to req.user
        console.log('saving auth token')
        authController.savePlaidToken(response.access_token, token_auth)
        .then( (user) => {
          console.log('RESPONSE IS:', user)
          // if token attribute is not null the request was successful
          if (user.attributes.token_plaid) {
            let name = user.attributes.first_name
            let number = user.attributes.phone_number
            ///// TODO move this logic to getInitialState route once that is set up front end /////
            // get transactions from plaid
            apiController.getTransactions(user.attributes.token_plaid)
            //////////////////////////////////////////////////////////////////////////////////////

            // send welcome message
            apiController.sendMessage('Hello ' + name + '! Welcome to Oink, Lets Budget Together!!', number)

            res.sendStatus(201)
          } else {
            res.sendStatus(500)
          }
        })
      } else {
        // error handle
        console.log(response)
        res.sendStatus(500)
      }
    })
  }
}

export default authHandler
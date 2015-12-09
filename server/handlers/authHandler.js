import authController from '../controllers/authController'
import apiController from '../controllers/apiController'
import passport from '../middleware'

let authHandler = {
  login(req, res, next) {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        res.sendStatus(500)
      } else if (!user) {
        res.sendStatus(409)
      } else {
        console.log(req.user)
        if (err) { return next(err); }
        return res.sendStatus(200)
      }
    })(req, res)
  },
  logout(req, res) {
    //Deserializes user and destroys session
    req.logout();
    //Redirects to root
    res.redirect('/');
  },
  signup(req, res, next) {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        res.status(500).send('Server Error')
      } else if (user) {
        console.log(req.user)
        if (err) { return next(err); }
        return res.sendStatus(200)
      } else {
        res.status(409).send('Invalid Email')
      }
    })(req, res)
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
    console.log('$$$$$$$$$$$$$$$$$', req.user)
    let public_token = req.body.public_token
    apiController.tradeToken(public_token)
    .then( (response) => {
      if (response.statusCode === 200) {
        // request was successful --> we now have private access token as response.access_token
        // TODO update 1 to req.user
        console.log('saving auth token')
        authController.saveToken(response.access_token, 1)
        .then( (response) => {
          // if token attribute is not null the request was successful
          if (response.attributes.token) {
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

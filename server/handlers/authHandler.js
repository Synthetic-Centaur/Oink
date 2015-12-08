import authController from '../controllers/authController'
import passport from 'passport'

let authHandler = {
  login(req, res) {
    passport.authenticate('local-login', (err, user, next) => {
      if (err) {
        res.sendStatus(500)
      } else if (!user) {
        res.sendStatus(409)
      } else {
        res.sendStatus(200)
      }
    })(req, res)
  },
  logout(req, res) {
    //Deserializes user and destroys session
    req.logout();
    //Redirects to root
    res.redirect('/');
  },
  signup(req, res) {
    passport.authenticate('local-signup', (err, user, next) => {
      if (err) {
        res.status(500).send('Server Error')
      } else if (user) {
        res.status(200).send('User Created')
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
  }
}

export default authHandler

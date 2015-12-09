import app from '../server'
import path from 'path'

import authHandler from '../handlers/authHandler'
import apiHandler from '../handlers/apiHandler'
// import passport from '../middleware'

//Model dependencies for search
import authController from '../controllers/authController'

import { Strategy as LocalStrategy } from 'passport-local'


// //Inject auth middleware
// app.use(session({ 
//   secret: 'kittyCat',
//   resave: true,
//   saveUninitialized: true
//    }))
// app.use(passport.initialize())
// app.use(passport.session()) 
// app.use(flash()) 

//Configure passport
passport.serializeUser( (user, done) => {
  console.log('Serializing')
  done(null, user.id)
})

passport.deserializeUser( (id, done) => {
  authController.findUser({id: id}).then( (user) => {
    done(null, user)
  })
})

// Strategy for login
passport.use('local-login', new LocalStrategy({
  //configuring for our request signature
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
(req, email, password, done) => {
  // Finds the user with provided email
  authController.findUser({email: email}).then( (user) => {
    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No user found.'))
    }
    // Checks if provided password is valid
    if (!user.validPassword(password)) {
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
    }
    // If all good, pass it as success
    return done(null, user)
  })
}
))

passport.use('local-signup', new LocalStrategy({
  //configuring for our request signature
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
(req, email, password, done) => {
  process.nextTick(function() {

    // Finds the user with provided email
    authController.findUser({email: req.body.email}).then( (user) => {
      if (!user) {
        //If user is not in database, create user
        authController.addUser(req.body).then( (newUser) => {
          return done(null, newUser)
        })
      }
      // If user found, cannot signup 
      else {
        return done(null, false, req.flash('loginMessage', 'User already exists'))
      }
    })

  })
}
))

app.post('/auth/login', authHandler.login)
// app.post('/auth/login', passport.authenticate('local-login', {
//   successRedirect: '/',
//   failureRedirect: '/',
//   failureFlash: true
// }))

app.get('/auth/logout', authHandler.logout)

app.post('/auth/signup', authHandler.signup)
// app.post('/auth/signup', passport.authenticate('local-signup', {
//   successRedirect: '/',
//   failureRedirect: '/',
//   failureFlash: true
// }))

app.get('/hello', function(req, res) {
  console.log('req has user?:', req.user)
  console.log('is req authed?:', req.isAuthenticated())
  res.send(200)
})

app.get('/auth/authenticate', authHandler.authenticate)

app.post('/auth/plaid', authHandler.plaid)

app.get('/api/intitialState', apiHandler.intitialState)

app.post('/api/budget/category/:id', apiHandler.budget)

app.get('/message', apiHandler.message)

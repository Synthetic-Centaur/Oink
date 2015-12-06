//Auth required dependencies
import passport from 'passport'
import session from 'express-session'
import flash from 'connect-flash'

//Model dependencies for search
import authController from './controllers/authController'

import { Strategy as LocalStrategy } from 'passport-local'

import app from './server'

//Inject auth middleware
app.use(session({ 
  secret: 'kittyCat',
  resave: true,
  saveUninitialized: true
   }))
app.use(passport.initialize())
app.use(passport.session()) 
app.use(flash()) 

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
passport.use('local', new LocalStrategy({
  //configuring for our request signature
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  // Finds the user with provided email
  authController.findUser({email: email}).then( (err, user) => {
    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No User Found'))
    }
    // Checks if provided password is valid
    if (!user.validPassword(password)) {
      return done(null, false, req.flash('loginMessage', 'Incorrect Password'))
    }
    // If all good, pass it as success
    return done(null, user)
  })
}
))
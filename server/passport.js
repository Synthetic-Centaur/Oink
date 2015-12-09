//Auth required dependencies
import passport from './middleware'
// import session from 'express-session'
// import flash from 'connect-flash'

//Model dependencies for search
import authController from './controllers/authController'

import { Strategy as LocalStrategy } from 'passport-local'

// import app from './server'

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

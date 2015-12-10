import path from 'path'
import Express from 'express'
import morgan from 'morgan'

// import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import session from 'express-session'

// Webpack dependencies
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'


import db from './db/dbConfig.js'
import app from './server'


// ToDo need to configure load order other than using index.js
//import routes from './routes/routes' --> moved to index.js

if (process.env.NODE_ENV === 'dev') {
  // Use this middleware to set up hot module reloading via webpack.
  const compiler = webpack(webpackConfig)
  // Webpack compiling for hot reloads
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

//Dev logging
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

//Inject auth middleware
// app.use(session({ 
//   secret: 'kittyCat',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 604800 // one week
//   },
//   name: 'helloworld'
// }))
// app.use(passport.initialize())
// app.use(passport.session()) 
// app.use(flash())


//Static serving of client files
app.use(Express.static(__dirname + '/../public'))




// import path from 'path'

import authHandler from './handlers/authHandler'
import apiHandler from './handlers/apiHandler'
// import passport from '../middleware'

//Model dependencies for search
import authController from './controllers/authController'


// app.post('/auth/login', function(req, res) {
//   // Finds the user with provided email
//   authController.findUser({email: req.body.email}).then( (user) => {
//     if (!user) {
//       res.json({ success: false, message: 'Authentication failed. User not found.' })
//     }
//     // Checks if provided password is valid
//     if (!user.validPassword(req.body.password)) {
//       res.json({ success: false, message: 'Authentication failed. Wrong password.' })
//     }
//     // if user is found and password is right
//     // create a token
//     var token = jwt.sign(user, 'kittyCat', {
//       expiresIn: 604800 // expires in 24 hours
//     });

//     // Save token in database with the user

//     // return the information including token as JSON
//     res.json({
//       success: true,
//       message: 'Enjoy your token!',
//       jwt_token: token
//     });
    
//   })
// })

// let isLoggedIn = function(req, res, next) {

// // check header or url parameters or post parameters for token
// var token = req.body.token || req.query.token || req.headers['x-access-token'];

// // decode token
// if (token) {

//   // verifies secret and checks exp
//   jwt.verify(token, 'kittyCat', function(err, decoded) {      
//     if (err) {
//       return res.json({ success: false, message: 'Failed to authenticate token.' });   
//     } else {
//       // if everything is good, save to request for use in other routes
//       req.decoded = decoded;    
//       next()
//     }
//   })

// } else {

//   // if there is no token
//   // return an error
//   return res.status(403).send({ 
//       success: false, 
//       message: 'No token provided.' 
//   })
  
// }

// app.get('/test', function(req, res, next) {
//   console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$ req body', req.body)
//   console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$ req headers', req.headers)
//   console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$ req query', req.query)
//   console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$ req session', req.session)

// // check header or url parameters or post parameters for token
// // var token = req.body.accessToken || req.query.token || req.headers['jwt-token'];
// var token = req.headers.authorization.split(' ')[1];

// // decode token
// if (token) {

//   // verifies secret and checks exp
//   jwt.verify(token, 'kittyCat', function(err, decoded) {      
//     if (err) {
//       return res.json({ success: false, message: 'Failed to authenticate token.' });   
//     } else {
//       // if everything is good, save to request for use in other routes
//       req.decoded = decoded;    
//       next()
//     }
//   })

// } else {

//   // if there is no token
//   // return an error
//   return res.status(403).send({ 
//       success: false, 
//       message: 'No token provided.' 
//   })
  
// }
// }, function(req, res) {
//   var token = req.headers.authorization.split(' ')[1];
//   console.log('&&&&&&&&&&&&&&&&&&&&&&&&& TOKEN', token)
//   res.send('yay it worked!')
// })









// import { Strategy as LocalStrategy } from 'passport-local'

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
// passport.serializeUser( (user, done) => {
//   console.log('Serializing')
//   done(null, user.id)
// })

// passport.deserializeUser( (id, done) => {
//   authController.findUser({id: id}).then( (user) => {
//     done(null, user)
//   })
// })

// // Strategy for login
// passport.use('local-login', new LocalStrategy({
//   //configuring for our request signature
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// },
// (req, email, password, done) => {
//   process.nextTick(function() {

//     // Finds the user with provided email
//     authController.findUser({email: email}).then( (user) => {
//       if (!user) {
//         return done(null, false, req.flash('loginMessage', 'No user found.'))
//       }
//       // Checks if provided password is valid
//       if (!user.validPassword(password)) {
//         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
//       }
//       // If all good, pass it as success
//       return done(null, user)
//     })
    
//   })
// }
// ))

// passport.use('local-signup', new LocalStrategy({
//   //configuring for our request signature
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// },
// (req, email, password, done) => {
//   process.nextTick(function() {

//     // Finds the user with provided email
//     authController.findUser({email: req.body.email}).then( (user) => {
//       if (!user) {
//         //If user is not in database, create user
//         authController.addUser(req.body).then( (newUser) => {
//           return done(null, newUser)
//         })
//       }
//       // If user found, cannot signup 
//       else {
//         return done(null, false, req.flash('loginMessage', 'User already exists'))
//       }
//     })

//   })
// }
// ))

// // app.post('/auth/login', authHandler.login)
// app.post('/auth/login', passport.authenticate('local-login', {
//   successRedirect: '/',
//   failureRedirect: '/',
//   failureFlash: true
// }))

// // app.get('/auth/logout', authHandler.logout)

// // app.post('/auth/signup', authHandler.signup)
// app.post('/auth/signup', passport.authenticate('local-signup', {
//   successRedirect: '/',
//   failureRedirect: '/',
//   failureFlash: true
// }))

// app.get('/hello', function(req, res) {
//   console.log('req has user?:', req.user)
//   console.log('is req authed?:', req.isAuthenticated())
//   res.send(200)
// })

// app.get('/auth/authenticate', authHandler.authenticate)

// app.post('/auth/plaid', authHandler.plaid)

// app.get('/api/intitialState', apiHandler.intitialState)

// app.post('/api/budget/category/:id', apiHandler.budget)


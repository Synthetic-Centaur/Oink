import User from '../db/models/user'
import Users from '../db/collections/users'
import db from '../db/dbConfig'
import bcrypt from 'bcrypt'

let authController = {

  addUser(user) {

    // User should be object of the following format:
    // ***{"first_name": "John", "last_name": "Smith", "email": "JohnSmith@example.com", , "phone_number": 8085551234, "password": "ExamplePass"}
    let newUser = new User(user)

    // Hashes user's password prior to saving
    newUser.hashPassword(user.password)

    // Saves user to database
    return newUser.save().then((user) => {
      return user
    })
  },

  findUser(user) {
    let newUser = new User({email: user.email})

    // Search database for user based on email
    return newUser.fetch().then((user) => {

      // If user was found
      if (user) {

        // Return the user
        return user
      } else {

        // Otherwise, if email is not listed for any user in database, return null
        return null
      }
    })
  },

  findUserByToken(req, secure) {

    // Checks to see if request was specefied as secure
    secure = secure || false

    // Fields to return on a non-secure request
    let select = ['first_name', 'last_name', 'email', 'phone_number', 'id', 'text_over_budget', 'text_recs', 'email_updates', 'text_over_total', 'phone_verified']

    // Fields to return on a secure request
    if (secure) {
      select = ['first_name', 'last_name', 'email', 'phone_number', 'id', 'token_plaid', 'password', 'text_over_budget', 'text_recs', 'email_updates', 'text_over_total', 'phone_verified', 'phone_verify_code']
    }

    // Checks request for JWT session token
    if (!req.headers.authorization) {
      return null
    }

    // Retrieve token from auth headers
    let token = req.headers.authorization.split(' ')[1]

    // Generate search querey
    return db.knex('users')
    .where('token_auth', token)
    .select(select)
    .then((user) => {

      // If user is found, return the fields specified by select
      if (user) {
        return user[0]
      } else {
        return null
      }
    })
  },

  saveAuthToken(token, userID) {

    // Save JWT token to database for given user
    return db.knex('users').where({id: userID}).update({token_auth: token}).returning('*').then((user) => {

      // If user was located return the user with updated authorization token
      if (user.length > 0) {
        return user[0]
      } else {

        // Log error
        console.error('Error: USER not foud')
      }
    })
  },

  savePlaidToken(tokenPlaid, tokenAuth) {

    // Find user based on JWT auth token and save or update their token_plaid property
    return db.knex('users').where({token_auth: tokenAuth}).update({token_plaid: tokenPlaid}).returning('*').then((user) => {
      if (user.length > 0) {

        // Return the user on successful token save
        return user[0]
      } else {

        // Log error if user could not be located in database
        console.error('Error: USER not foud')
      }
    })
  },

  updateUser(user, properties) {

    // If user is updating thier password -- need to encrypt the new password before saving it
    if (properties.password) {
      properties.password = bcrypt.hashSync(properties.password, bcrypt.genSaltSync(8), null)
    }
    
    // Update all properties that were passed in for specific user
    return db.knex('users').where(user).update(properties).returning('id').then((user) => {
      return user
    })
  },

  deleteAccount(user) {

    // If user deletes their account we need to delete them from each table in the database
    return db.knex('users').where(user).del().then((userRows) => {
      return db.knex('transactions').where({user_id: user.id}).del().then((transRows) => {
        return db.knex('budgets').where({user_id: user.id}).del().then((budgetRows) => {
          return db.knex('goals').where({user_id: user.id}).del().then((goalsRows) => {
            return {userRows: userRows, transRows: transRows, budgetRows: budgetRows, goalsRows: goalsRows}
          })
        })
      })
    })
  },


  generateVerificationCode(user) {

    // Generate random number between 0 and 9
    let codeStr = Math.floor(Math.random() * 10).toString()

    // Continue adding randomized digits to result code until result code is 7 digits long
    while (codeStr.length < 7) {
      codeStr += Math.floor(Math.random() * 10).toString()
    }

    // Save code string to database async and return the code when finished
    return db.knex('users').where(user).update({phone_verify_code: codeStr}).then(() => {
      return codeStr
    })
  },

  checkVerificationCode(user, code) {

    // Find user in database
    return db.knex('users').where(user).select('phone_verify_code').then((userCode) => {

      // Compare the phone verification code saved for the specified user with the code passed in the request
      if (userCode[0].phone_verify_code === code) {

        // If the codes are the same, update the database with verified status
        return db.knex('users').where(user).update({phone_verified: true}).then((result) => {
          return true
        })
      } else {
        return false
      }
    })
  },
  
  allUsers() {

    // Select all users from the database -- this is used in daily transaction updates and weekly emails
    return db.knex('users')
      .select('*')
  }
}

export default authController

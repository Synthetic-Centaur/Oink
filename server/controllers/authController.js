import User from '../db/models/user'
import Users from '../db/collections/users'
import db from '../db/dbConfig'
import bcrypt from 'bcrypt'

let authController = {

  addUser(user) {
    // user should be object of the following format:
    // {"first_name": "John", "last_name": "Smith", "email": "JohnSmith@example.com", , "phone_number": 8085551234, "password": "ExamplePass"}
    let newUser = new User(user)

    // hashes user's password prior to saving
    newUser.hashPassword(user.password)

    // saves user to db
    return newUser.save().then((user) => {
      return user
    })
  },

  findUser(user) {
    let newUser = new User({email: user.email})
    return newUser.fetch().then((user) => {
      if (user) {
        return user
      } else {
        return null
      }
    })
  },

  findUserByToken(req, secure) {
    secure = secure || false
    let select = ['first_name', 'last_name', 'email', 'phone_number', 'id', 'text_over_budget', 'text_recs', 'email_updates', 'text_over_total', 'phone_verified']

    if (secure) {
      select = ['first_name', 'last_name', 'email', 'phone_number', 'id', 'token_plaid', 'password', 'text_over_budget', 'text_recs', 'email_updates', 'text_over_total', 'phone_verified']
    }

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
      //If user is found, return user
      if (user) {
        return user[0]
      } else {
        //Else return null
        return null
      }
    })
  },

  savePlaidToken(tokenPlaid, tokenAuth) {
    let newUser = new User({token_auth: tokenAuth})
    return newUser.fetch().then((user) => {
      if (user) {
        user.attributes.token_plaid = tokenPlaid
        return user.save().then((user) => {
          return user
        })
      } else {
        // user was not found
        console.error('Error: USER not found')
      }
    })
  },

  updateUser(user, properties) {
    // if user is updating thier password we need to encrypt it before we save
    if (properties.password) {
      properties.password = bcrypt.hashSync(properties.password, bcrypt.genSaltSync(8), null)
    }
    
    return db.knex('users').where(user).update(properties).returning('id').then((user) => {
      return user
    })
  },

  deleteAccount(user) {
    return db.knex('users').where(user).del().then((userRows) => {
      return db.knex('transactions').where({user_id: user.id}).del().then((transRows) => {
        return db.knex('budgets').where({user_id: user.id}).del().then((budgetRows) => {
          return {userRows: userRows, transRows: transRows, budgetRows: budgetRows}
        })
      })
    })
  },

  saveAuthToken(token, userID) {
    let newUser = new User({id: userID})
    return newUser.fetch().then((user) => {
      if (user) {
        user.attributes.token_auth = token
        return user.save().then((user) => {
          return user
        })
      } else {
        // user was not found
        console.error('Error: USER not found')
      }
    })
  }
}

export default authController

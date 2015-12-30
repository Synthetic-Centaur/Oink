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
    // user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null)
    // return db.knex('users').insert(user).returning('*').then((user) => {
    //   console.log('inside addUser returned user is', user)
    //   return user[0]
    // })
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
    // return db.knex('users').where({email: user.email}).select().then((user) => {
    //   if (user.length > 0) {
    //     console.log('inside findUser user was found to be', user)
    //     return user[0]
    //   } else {
    //     return null
    //   }
    // }) 
  },

  findUserByToken(req, secure) {
    secure = secure || false
    let select = ['first_name', 'last_name', 'email', 'phone_number', 'id', 'text_over_budget', 'text_recs', 'email_updates', 'text_over_total', 'phone_verified']

    if (secure) {
      select = ['first_name', 'last_name', 'email', 'phone_number', 'id', 'token_plaid', 'password', 'text_over_budget', 'text_recs', 'email_updates', 'text_over_total', 'phone_verified', 'phone_verify_code']
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
    // let newUser = new User({token_auth: tokenAuth})
    // return newUser.fetch().then((user) => {
    //   if (user) {
    //     user.attributes.token_plaid = tokenPlaid
    //     return user.save().then((user) => {
    //       return user
    //     })
    //   } else {
    //     // user was not found
    //     console.error('Error: USER not found')
    //   }
    // })
    return db.knex('users').where({token_auth: tokenAuth}).update({token_plaid: tokenPlaid}).returning('*').then((user) => {
      if (user.length > 0) {
        console.log('inside save plaid token returning user', user)
        return user[0]
      } else {
        console.error('Error: USER not foud')
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
    // let newUser = new User({id: userID})
    // return newUser.fetch().then((user) => {
    //   if (user) {
    //     user.attributes.token_auth = token
    //     return user.save().then((user) => {
    //       return user
    //     })
    //   } else {
    //     // user was not found
    //     console.error('Error: USER not found')
    //   }
    // })
    return db.knex('users').where({id: userID}).update({token_auth: token}).returning('*').then((user) => {
      if (user.length > 0) {
        console.log('inside save auth token returning user', user)
        return user[0]
      } else {
        // user was not found
        console.error('Error: USER not foud')
      }
    })
  },

  generateVerificationCode(user) {
    // generate random number between 0 and 9
    let codeStr = Math.floor(Math.random() * 10).toString()
    while (codeStr.length < 7) {
      codeStr += Math.floor(Math.random() * 10).toString()
    }

    // save code string to database async and return the code when finished
    return db.knex('users').where(user).update({phone_verify_code: codeStr}).then(() => {
      return codeStr
    })
  },

  checkVerificationCode(user, code) {
    return db.knex('users').where(user).select('phone_verify_code').then((userCode) => {
      if (userCode[0].phone_verify_code === code) {
        return db.knex('users').where(user).update({phone_verified: true}).then((result) => {
          return true
        })
      } else {
        return false
      }
    })
  }
}

export default authController

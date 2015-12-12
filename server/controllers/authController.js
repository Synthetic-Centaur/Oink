import User from '../db/models/user'
import Users from '../db/collections/users'

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
    console.log('new user:', newUser)
    return newUser.fetch().then((user) => {
      if (user) {
        return user;
      } else {
        return null;
      }
    })
  },
  findUserByToken(req) {
    console.log('AUTH',req.headers.authorization)
    if( !req.headers.authorization) {
      return null
    }
    // Retrieve token from auth headers
    let token = req.headers.authorization.split(' ')[1]
    // Generate search querey
    let searchUser = new User({token_auth: token})
    return searchUser.fetch().then((user) => {
      //If user is found, return user
      if (user) {
        return user
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
        console.log('USER', user)
        return user.save().then((user) => {
          return user
        })
      } else {
        // user was not found
        console.log('Error: USER not found')
      }
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
        console.log('Error: USER not found')
      }
    })
  }
} 

export default authController

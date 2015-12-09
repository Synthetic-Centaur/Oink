import User from '../db/models/user'
import Users from '../db/collections/users'

let authController = {

  addUser(user) {
    // add user to database
    // user should be object of the following format: 
    // {"first_name": "Lucilla", "email": "ScrumLord@gmail.com", "last_name": "Chalmer", "phone_number": 7344749351, "uuid": "abc123", "password": "KittyKat"}
    let newUser = new User(user)
    // hashes user's password prior to saving 
    newUser.hashPassword(user.password)
    return newUser.save().then((user) => {
      console.log('user has been created')
      return user
    })
  },
  findUser(user) {  
    let newUser = new User({email: user.email})
    console.log('new user:', newUser)
    return newUser.fetch().then((user) => {
      console.log('USER POST FETCH: ',user)
      if (user) {
        console.log('user found')
        return user;
      } else {
        console.log('user not found')
        return null;
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
        console.log('USER ---------> INSIDE saveAuthToken | authController', user)
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

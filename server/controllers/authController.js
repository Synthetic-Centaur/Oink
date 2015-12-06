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
    let newUser = new User(user)
    return newUser.fetch().then((user) => {
      if (user) {
        console.log('user found')
        return user;
      } else {
        console.log('user not found')
        return null;
      }
    })
  }
} 

export default authController

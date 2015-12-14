import db from '../dbConfig'
import Transaction from './transaction'
import Category from './category'
import Budget from './budget'
import bcrypt from 'bcrypt'

export default class User extends db.Model {
  constructor(attributes) {
    super()
    this.tableName = 'users'
    this.attributes = attributes
  }

  transactions() {
    return this.hasMany(Transaction)
  }

  categories() {
    return this.hasMany(Category).through(Budget)
  }

  validPassword(userPassword) {
    //compare provide password with stored, returns boolean
    return bcrypt.compareSync(userPassword, this.attributes.password)
  }

  hashPassword(password) {
    //generates a hash with provided cleartext password, assigns it to model
    this.attributes.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    return this.attributes.password
  }

  initialize(obj) {
    
  }
}

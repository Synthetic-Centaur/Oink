import db from '../dbConfig'
import Transaction from './transaction'
import Budget from './budget'
import User from './user'

export default class Category extends db.Model {
  constructor(attributes) {
    super()
    this.tableName = 'categories'
    this.attributes = attributes
  }

  transactions() {
    return this.belongsToMany(Transaction)
  }
  
  users() {
    return this.belongsToMany(User).through(Budget)
  }

  initialize(obj) {

  }
}

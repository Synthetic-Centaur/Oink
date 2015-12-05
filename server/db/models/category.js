import db from '../dbConfig'
import Transaction from './transaction'
import Budget from './budget'
import User from './user'

export class Category extends db.Model {
  tableName: 'categories',

  transactions(){
    return this.belongsToMany(Transaction)
  },
  users(){
    return this.belongsToMany(User).through(Budget)
  }

  initialize(obj){

  }
}
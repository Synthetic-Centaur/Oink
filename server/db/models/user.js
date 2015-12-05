import db from '../dbConfig'
import Transaction from './transaction'
import Category from './category'
import Budget from './budget'

export default class User extends db.Model {
  constructor(attributes){
    super()
    this.tableName = 'users'
    this.attributes = attributes
  }

  transactions(){
    return this.hasMany(Transaction)
  }
  categories(){
    return this.hasMany(Category).through(Budget)
  }
  initialize(obj){

  }
}
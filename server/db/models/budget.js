import db from '../dbConfig'
import Transaction from './transaction'
import Category from './category'

export default class Budget extends db.Model {
  constructor(attributes){
    super()
    this.tableName = 'budgets'
    this.attributes = attributes
  }
  initialize(obj){
  }
}
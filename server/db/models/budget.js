import db from '../dbConfig'
import Transaction from './transaction'
import Category from './category'
import Budget from './budget'

export class Budget extends db.Model {
  tableName: 'budgets',
  initialize(obj){

  }
}
import db from '../dbConfig'
import User from './user'
import Category from './category'


export default class Transaction extends db.Model {
  tableName: 'transactions',

  categories(){
    return this.hasMany(Category, 'id_Category')
  },
  user(){
    return this.belongsTo(User, 'id_User')
  },
  initialize(obj){

  }
}
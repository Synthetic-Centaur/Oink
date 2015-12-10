import Budget from '../db/models/budget'
import Category from '../db/models/category'
import Budgets from '../db/collections/budgets'
import db from '../db/dbConfig.js'

let budgetController = {
  createBudget(category, userId, amount){
    // Search for category and retrieve category id
    let searchCat = new Category({ description: category })
    return searchCat.fetch().then( (cat) => {
      let newBudget = {
        target: amount,
        category_id: cat.id,
        user_id: userId
      }
      //sum all transactions, set to variable actual
      let actual = 0
      newBudget.actual = actual
      //save to table
      newBudget = new Budget(newBudget)
      return newBudget.save().then((budget) => {
        if(budget){
          return budget
        } else {
          return null
        }
      })
    })
    //return budget
  },
  updateBudget(){

  },
  deleteBudget(){

  },
  getBudgets(userId){

    return db.knex('budgets').from('budgets')
    .innerJoin('categories', 'budgets.category_id', 'categories.id')
    .innerJoin('users', 'budgets.user_id', 'users.id')
    .select('first_name', 'last_name', 'description', 'target', 'actual', 'phone_number', 'email')
    .where('user_id', userId).then( (budgets) => {
      if ( budgets ) {
        return budgets
      } else {
        return null
      }
    })
  }
}

export default budgetController
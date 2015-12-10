import Budget from '../db/models/budget'
import Category from '../db/models/category'

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
  sendBudget(){

  }
}

export default budgetController
import Budget from '../db/models/budget'

let budgetController = {
  createBudget(categoryId, userId, amount){
    let newBudget = {
      amount,
      category_id: categoryId,
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
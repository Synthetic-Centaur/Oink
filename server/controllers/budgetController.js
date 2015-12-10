import Budget from '../db/models/budget'
import Category from '../db/models/category'
import Budgets from '../db/collections/budgets'
import db from '../db/dbConfig.js'
import Transaction from '../db/models/transaction'
import Promise from 'bluebird'

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
  },
  saveTransactions(transactions, user_id) {
    console.log('in budget controller')
    // loop over transactions array
    return Promise.map(transactions, (item) => {
      
      const category = item.category[0]
      let newCat = new Category ({description: category})
      return newCat.fetch().then((category) => {
        if (category) {
          //if category already exists, save in database setting all of transaction data plus user_id and category id
          const category_id = category.id
          console.log('catid: ', category_id);
          // console.log(index, 'Transaction: ', item, "userid: ", user_id, "cat_id", category_id)
          return saveTransaction(item, user_id, category_id)
        } else {
          //create a new category
          return newCat.save().then((category) => {
            return saveTransaction(item, user_id, category.id)
          })
        }
      })
    })
    // for (var index = 0; index < transactions.length; index++) {
    //   //plaid auth-handler already finds user, so user_id is passed in
    //   //find category id
    // }
  }
}

function saveTransaction(transaction, user_id, category_id) {
  console.log('inputs:',
    user_id,
    transaction.amount,
    category_id);
  
  let newTransaction = new Transaction({
    user_id: user_id,
    category_id: category_id,
    amount: transaction.amount,
    date: transaction.date,
    pending: transaction.pending,
    store_name: transaction.name
  });
  return newTransaction.save().then((transaction) => {
    console.log('transaction has been created')
    return transaction
  })

}

export default budgetController
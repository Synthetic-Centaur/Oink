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
      // Create response object
      let newBudget = {
        target: amount,
        category_id: cat.id,
        user_id: userId
      }
      //sum all transactions, set to response as actual
      return budgetController.sumTransactionByCategory(cat.id).then((sum)=>{
        newBudget.actual = sum
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
    })
  },
  getAllCategories(){
    // Return all categories in table
    return db.knex('categories').select('description').then((categories) => {
      if(categories) {
        // Convert to an array of descriptions
        return categories.map( (category) => {
          return category.description
        })
      } else {
        return null
      }
    })
  },
  sumTransactionByCategory(categoryId){
    // Return the sum of all transactions in a provided category
    return db.knex('transactions').sum('amount').where('category_id', categoryId).then((sum)=> {
      if(sum){
        // Type conversion to number
        return +sum[0].sum
      } else {
        return 0
      }
    })
  },
  getBudgets(userId){
    // Query budgets table
    return db.knex('budgets').from('budgets')
    // Joins to get category descriptions
    .innerJoin('categories', 'budgets.category_id', 'categories.id')
    // Joins to get user data
    .innerJoin('users', 'budgets.user_id', 'users.id')
    // Only returns certain columns
    .select('first_name', 'last_name', 'description', 'target', 'actual', 'phone_number', 'email')
    // Only gets budgets from specified user
    .where('user_id', userId).then( (budgets) => {
      if ( budgets ) {
        return budgets
      } else {
        return null
      }
    })
  },
  saveTransactions(transactions, user_id) {
    // loop over transactions array
    return Promise.map(transactions, (item) => {
      // We are only concerned with first category

      if (item.category) {
        const category = item.category[0]
        let newCat = new Category ({description: category})
        return newCat.fetch().then((category) => {
          if (category) {
            //if category already exists, save in database setting all of transaction data plus user_id and category id
            const category_id = category.id
            return saveTransaction(item, user_id, category_id)
          } else {
            //create a new category
            return newCat.save().then((category) => {
              return saveTransaction(item, user_id, category.id)
            })
          }
        })
      }
    })
  }
}

function saveTransaction(transaction, user_id, category_id) {
  // Creates new transaction object
  let newTransaction = new Transaction({
    user_id: user_id,
    category_id: category_id,
    amount: transaction.amount,
    date: transaction.date,
    pending: transaction.pending,
    store_name: transaction.name
  })
  // Saves to db
  return newTransaction.save().then((transaction) => {
    return transaction
  })

}

export default budgetController

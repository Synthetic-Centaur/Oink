import Budget from '../db/models/budget'
import Category from '../db/models/category'
import Budgets from '../db/collections/budgets'
import db from '../db/dbConfig.js'
import Transaction from '../db/models/transaction'
import Promise from 'bluebird'

// import apiController for message sending on budget update
import apiController from './apiController'

let budgetController = {
  findUserByID(userId) {
    return db.knex('users').where({id: userId}).select().then((user) => {
      return user
    })
  },

  getCategoryName(categoryId) {
    return db.knex('categories').where({id: categoryId}).select('description').then((description) => {
      return description
    })
  },

  createBudget(category, userId, amount) {
    // Search for category and retrieve category id
    return db.knex('categories').where({description: category}).select().then((category) => {
      let categoryId = category[0].id
      return db.knex('budgets').where({category_id: categoryId, user_id: userId}).then((result) => {
        if (result.length > 0) {
          return db.knex('budgets').where(result[0]).update({target: amount}).then((budget) => {
            budgetController.updateBudget(userId).then((description) => {
              return budget
            })
          })
        } else {
          let newBudget = {category_id: categoryId, user_id: userId, target: amount}
          return db.knex('budgets').insert(newBudget).then((budget) => {
            budgetController.updateBudget(userId).then((description) => {
              return budget
            })
          })
        }
      })
        
    })
  },

  getAllCategories() {
    // Return all categories in table
    return db.knex('categories').select('description').then((categories) => {
      if (categories) {
        // Convert to an array of descriptions
        return categories.map((category) => {
          return category.description
        })
      } else {
        return null
      }
    })
  },

  sumTransactionByCategory(categoryId) {
    // Return the sum of all transactions in a provided category
    return db.knex('transactions').sum('amount').where('category_id', categoryId).then((sum)=> {
      if (sum) {
        // Type conversion to number
        return +sum[0].sum
      } else {
        return 0
      }
    })
  },

  sumTransactionByCategoryMonthly(categoryId) {
    // Return the sum of all transactions in a provided category
    //return db.knex('transactions').sum('amount').where({'category_id': categoryId}).whereBetween('date', [new Date().getMonth()-1, new Date()]).then((sum)=> {
    return db.knex('transactions').where({category_id: categoryId}).select().then((transactions)=> {
      let sum = 0
      return Promise.map(transactions, (transaction) => {
        if (transaction.date >= (new Date().getMonth() - 1)) {
          sum += transaction.amount
        }
      }).then(() => {
        return sum
      })
    })
  },

  getBudgets(userId) {
    // Query budgets table
    return db.knex('budgets').from('budgets')

    // Joins to get category descriptions
    .innerJoin('categories', 'budgets.category_id', 'categories.id')

    // Only returns certain columns
    .select('description', 'target', 'actual')

    // Only gets budgets from specified user
    .where('user_id', userId).then((budgets) => {
      if (budgets) {
        return budgets
      } else {
        return null
      }
    })
  },

  updateBudget(userId) {
    // get budget for text
    // for <user_ID>
    return db.knex('budgets').where({user_id: userId}).select().then((budget) => {
      // loop through categories in budget
      return Promise.map(budget, (item) => {
        // sum transactions for user in each category
        return budgetController.sumTransactionByCategoryMonthly(item.category_id).then((sum) => {
          // if sum of transactions in a given category does not match actual
          // TODO: May want to add in if statement so only updating if actual has changed but need to add in logic to whipe actual each month first
          //if (sum !== item.actual) {
          // update actual
          return db.knex('budgets').where({user_id: userId, category_id: item.category_id}).update({actual: sum}).then((response) => {
            // if actual is over target in any category
            if (item.actual > item.target) {
              // send text letting user know that they have exceeded their budget for that category
              // get user for text
              return budgetController.findUserByID(userId).then((user) => {
                // get category name for text
                //console.log('USER', user)
                return budgetController.getCategoryName(item.category_id).then((description) => {
                  apiController.sendMessage('Oink Oink!! \n\nHey ' + user[0].first_name + ' looks like you have gone over your '
                  + description[0].description + ' budget for this month! \n \n Budget: $' + item.target + ' \n Actual: $' + item.actual, user[0].phone_number)
                  return description
                })
              })
            }
          })
        })
      })
    })
  },

  // TODO: Update Transactions is currently being used for both update and save. May be possible to remove save transactions
  saveTransactions(transactions, user_id) {
    // loop over transactions array
    return Promise.map(transactions, (item) => {
      // this breaks if transaction doesn't have a category so check if category is definied first
      if (item.category) {
        // We are only concerned with first category
        const category = item.category[0]

        let newCat = new Category({description: category})

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
  },

  updateTransactions(transactions, user_id) {
    //console.log('NOW INSIDE BUDGET CONTROLLER UPDATE TRANSACTIONS')
    
    // TODO: Fix promise
    // pull previous transactions for user out of database
    return db.knex('transactions').where({user_id: user_id}).select('transaction_id').then((oldTransactions) => {
      // transform OldTransactions into an array of their transaction_Ids
      oldTransactions = oldTransactions.map((trans) => {
        return trans.transaction_id
      })

      // Find positon where new transactions start given that incoming transactions are in the same order each time
      let pos = 0
      while (transactions[pos] && !oldTransactions.includes(transactions[pos]._id)) {
        pos++
      }

      // update transaction array to only keep the transactions that have not already been added to database
      transactions = transactions.slice(0, pos)

      return Promise.map(transactions, (transaction) => {
        // If transaction is not assigned categories --> assign 'Other' to category
        if (!transaction.category) {
          transaction.category = ['Other']
        }

        // We are only concerned with the first category listed
        let category = transaction.category[0]

        //console.log('CATEGORY', category)

        return db.knex('categories').where({description: category}).select().then((result) => {
          //console.log('result', result)
          //console.log('USER ID', user_id)
          if (result.length > 0) {
            let category_id = result[0].id
            return saveTransaction(transaction, user_id, category_id)
          } else {
            return db.knex('categories').insert({description: category}).returning('id').then((result) => {

              let category_id = result[0].id
              return saveTransaction(transaction, user_id, category_id)
            })
          }
        })
      })
    })
  }
}

function saveTransaction(transaction, user_id, category_id) {
  // Creates new transaction object
  let newTransaction = new Transaction({
    user_id: user_id,
    category_id: category_id,
    transaction_id: transaction._id,

    // this was erroring out so added a check
    amount: transaction.amount,
    date: new Date(transaction.date),
    pending: transaction.pending,
    store_name: transaction.name
  })

  // Saves to db
  return newTransaction.save().then((transaction) => {
    return transaction
  })

}

export default budgetController

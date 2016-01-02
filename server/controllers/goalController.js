import db from '../db/dbConfig'
import moment from 'moment'
import Promise from 'bluebird'

let goalController = {
  createGoal(userId, goal) {
    //build goal object
    let newGoal = {
      description: goal.description,
      amount: goal.amount,
      user_id: userId,
      goalBy: goal.goalBy,
      goalStarted: new Date().toISOString()
    }

    //insert goal into goals table
    return db.knex('goals').insert(newGoal).then(() => {

      //strip user_id from goal
      delete newGoal.user_id

      //return goal as created
      return newGoal
    }).catch((err) => {
      console.error(err)
    })
  },

  deleteGoal(userId, goalId) {
    return db.knex('goals').where({
      user_id: userId,
      id: goalId
    }).select('description', 'amount', 'goalBy', 'goalStarted', 'id').del().then((oldGoal) => {
      return oldGoal || null
    }).catch((err) => {
      console.error(err)
    })
  },
  
  updateGoal(userId, goalId, body) {
    return db.knex('goals').where({
      user_id: userId,
      id: goalId
    }).update(body).then((response) => {
      return response
    }).catch((err) => {
      console.error(err)
    })
  },

  getGoalsById(userId) {

    // Search goals table
    return db.knex('goals')

    // Only returns certain columns
    .select('description', 'goalBy', 'goalStarted', 'amount', 'id')

    // Only gets goals from specified user
    .where('user_id', userId).then((goals) => {
      return goals
    })
  },

  getMonthlySavings(userId, start) {
    let sum = 0
    start = moment().subtract(start, 'months').startOf('month')
    let end =  moment().startOf('month')
    console.log('The difference is: ', start.diff(end, 'days'))
    return db.knex('transactions')
    .where('user_id', userId)
    .then((transactions) => {
      transactions.forEach((transaction) => {
        if (transaction.date >= start && transaction.date <= end) {
          sum += transaction.amount
        }
      })
      return sum
    })
  },

  generateReport(userId) {
    // Sets months for us to check averages
    let months = [1, 3, 6, 12]
    let result = Promise.map(months, (start) => {
      return goalController.getMonthlySavings(userId, start)
    })

    // Formats return object
    return result.reduce((acc, item, index) => {
      acc.lastMonth = index === 0 ? item : acc.lastMonth
      acc.lastThree = index === 1 ? (item / 3) : acc.lastThree
      acc.lastSix = index === 2 ? (item / 6) : acc.lastSix
      acc.lastYear = index === 3 ? (item / 12) : acc.lastYear
      return acc
    }, {})
  }
}

export default goalController
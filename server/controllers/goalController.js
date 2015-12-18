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

  getMonthlySavings(userId, start, end) {
    let sum = 0
    start = moment().subtract(start, 'days').startOf('month')
    end =  moment().subtract(end, 'days').startOf('month')
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
    var lastYear = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360]
    let end = 0
    let result = Promise.map(lastYear, (start, index) => {
      if (lastYear[index - 1] === undefined) {
        end = 0
      } else {
        end = lastYear[index - 1]
      }

      return goalController.getMonthlySavings(userId, start, end)
    })
    var resultObj = {
      lastMonth: result[0],
      lastThree: null,
      lastSix: null,
      lastYear: null
    }
    return result
    .reduce((acc, item, index) => {
      if (index === 0) {
        acc.lastMonth = item
        acc.lastThree += item
        acc.lastSix += item
        acc.lastYear += item
      } else if (index < 3) {
        acc.lastThree += item
        acc.lastSix += item
        acc.lastYear += item
      } else if (index < 6) {
        acc.lastSix += item
        acc.lastYear += item
      } else if (index < 11) {
        acc.lastYear += item
      } else if (index === 11) {
        acc.lastYear += item
        acc.lastYear /= 12
        acc.lastSix /= 6
        acc.lastThree /= 3
      }

      return acc
    }, resultObj)
  }
}

export default goalController
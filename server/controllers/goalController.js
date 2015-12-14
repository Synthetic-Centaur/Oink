import db from '../db/dbConfig'

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

  getGoalsById(userId) {

    // Search goals table
    return db.knex('goals')

    // Only returns certain columns
    .select('description', 'goalBy', 'goalStarted', 'amount')

    // Only gets goals from specified user
    .where('user_id', userId).then((goals) => {
      if (goals) {
        return goals
      } else {
        return null
      }
    })
  }
}

export default goalController
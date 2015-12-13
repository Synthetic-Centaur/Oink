import db from '../db/dbConfig'

let goalController = {
  createGoal(userId, goal) {
    let newGoal = {
      description: goal.description,
      amount: goal.amount,
      user_id: userId,
      goalBy: goal.goalBy
    }
    return db.knex('goals').insert(newGoal).then(() => {
      delete newGoal.user_id
      return newGoal
    })
  },
  getGoalById(userId) {}
}

export default goalController
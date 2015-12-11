import apiController from '../controllers/apiController'
import budgetController from '../controllers/budgetController'
import authController from '../controllers/authController'

// Poplulate categories after server initializes
apiController.getCategories()

let apiHandler = {
  initialState(req, res) {
    // Find the user based on auth token
    authController.findUserByToken(req).then((user) => {
      // Check if user is in db
      if(user) {
        // Search for all budgets from user
        budgetController.getBudgets(user.attributes.id).then( (budgets) => {
          if(budgets){
            // Retrieve all categories from db
            budgetController.getAllCategories().then( (categories) => {
              // Build response object
              let state = {
                budgets,
                categories
              }
              // Send state
              res.json(state)
            })
          } else {
            res.json({ success: false, message: 'Failed, error reading budgets.' })
          }
        })
      } else {
        res.json({ success: false, message: 'Failed, user not found.' })
      }
    })
  },
  budget(req, res) {
     // Find the user based on auth token
    authController.findUserByToken(req).then((user) => {
      if(user) {
        // Create budget with category, amount, and userId
        console.log('inserted into the budget table: --------->', req.params.id, user.attributes.id, req.body.amount)
        budgetController.createBudget(req.params.id, user.attributes.id, req.body.amount).then( (budget) => {
          if(budget){
            // Send back the budget created
            res.json(budget)
          } else {
            res.json({ success: false, message: 'Failed, error creating budget.' })
          }
        })
      } else {
        res.sendStatus(500)
      }
    })
  }
}

export default apiHandler

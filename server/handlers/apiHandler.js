import apiController from '../controllers/apiController'
import budgetController from '../controllers/budgetController'
import authController from '../controllers/authController'
import goalController from '../controllers/goalController'

// Poplulate categories after server initializes
apiController.getCategories()

let apiHandler = {
  getTransactions(req, res) {
    // TODO: Add Token Plaid logic
    authController.findUserByToken(req).then((user) => {
      apiController.getTransactions(user.attributes.token_plaid, user.attributes.id)
    })
  },

  setWebhook(req, res) {
    // get user from database using token
    authController.findUserByToken(req).then((user) => {
      console.log('inside WEBHOOK SETUP handler. User is :', user)
      if (user.attributes.token_plaid) {
        apiController.setWebhook(user.attributes.token_plaid)
        res.sendStatus(200)
      } else {
        res.sendStatus(500)
      }
    })
  },

  initialState(req, res) {

    // Find the user based on auth token
    if (!req.headers.authorization) {
      res.status(403)
      res.json({ success: false, message: 'Failed, user is not authenticated'})
    } else {
      authController.findUserByToken(req).then((user) => {

        // Check if user is in db
        if (user) {

          // Search for all budgets from user
          budgetController.getBudgets(user.id).then((budgets) => {
            if (budgets) {

              // Retrieve all categories from db
              budgetController.getAllCategories().then((categories) => {
                if (categories) {

                  // Retrieve all goals from user
                  goalController.getGoalsById(user.id).then((goals) => {
                    goalController.generateReport(user.id).then((avgNet) => {

                      // Build response object
                      let state = {
                        user,
                        budgets,
                        categories,
                        goals,
                        avgNet
                      }
                      res.json(state)
                    })
                  })
                } else {
                  res.json({ success: false, message: 'Failed, error reading cateogries'})
                }
              })
            } else {
              res.json({ success: false, message: 'Failed, error reading budgets.' })
            }
          })
        } else {
          res.json({ success: false, message: 'Failed, user not found.' })
        }
      })
    }
  },

  addOrUpdateBudget(req, res) {
    if (!req.headers.authorization) {
      res.status(403)
      res.json({ success: false, message: 'Failed, user is not authenticated'})
    } else {
      // Find the user based on auth token
      authController.findUserByToken(req).then((user) => {
        if (user) {
          // Create budget with category, amount, and userId
          budgetController.createBudget(req.params.id, user.id, req.body.amount).then((budget) => {
            if (budget) {
              // Send back the budget created
              // res.json(budget)
              res.send(200)
            } else {
              res.json({ success: false, message: 'Failed, error creating budget.' })
            }
          })
        } else {
          res.sendStatus(500)
        }
      })
    }
  },

  deleteBudget(req, res) {
    if (!req.headers.authorization) {
      res.status(403)
      res.json({ success: false, message: 'Failed, user is not authenticated'})
    } else {
      // Find the user based on auth token
      authController.findUserByToken(req).then((user) => {
        if (user) {
          // Create budget with category, amount, and userId
          budgetController.deleteBudget(req.params.id, user.id).then((result) => {
            if (result) {
              // Send back the budget created
              // res.json(budget)
              res.send(200)
            } else {
              res.json({ success: false, message: 'Failed, error deleting budget.' })
            }
          })
        } else {
          res.sendStatus(500)
        }
      })
    }
  },

  goals(req, res) {
    if (!req.headers.authorization) {
      res.status(403)
      res.json({ success: false, message: 'Failed, user is not authenticated'})
    } else {
      authController.findUserByToken(req).then((user) => {
        goalController.createGoal(user.id, req.body).then((goal) => {
          res.status(201)
          res.json(goal)
        })
      })
    }
  }
}

export default apiHandler

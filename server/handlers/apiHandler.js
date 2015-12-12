import apiController from '../controllers/apiController'
import budgetController from '../controllers/budgetController'
import authController from '../controllers/authController'
import {populateTables} from '../db/dbConfig'

// Poplulate categories after server initializes
apiController.getCategories()

let apiHandler = {
  getTransactions(req, res) {
    apiController.getTransactions('fd1490b523950d093684941d6bf1a7ad1c497f8ffe6035bbea7326528a5b263b02beb2ad7a019e508755c96d50d0222e6b5fa58d3174a4b9b5d1bfeca48c7c6c7cf1b3cf514df3e7e318b14aef638c2c', 3)
  },
  setWebhook(req, res) {
    // get user from database using token
    authController.findUserByToken(req).then((user) => {    
      console.log("inside WEBHOOK SETUP handler. User is :", user)
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
    }
  },
  budget(req, res) {
    if (!req.headers.authorization) {
      res.status(403)
      res.json({ success: false, message: 'Failed, user is not authenticated'})
    } else {
     // Find the user based on auth token
      authController.findUserByToken(req).then((user) => {
        if(user) {
          // Create budget with category, amount, and userId
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
}

export default apiHandler

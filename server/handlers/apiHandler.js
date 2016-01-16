import apiController from '../controllers/apiController'
import budgetController from '../controllers/budgetController'
import authController from '../controllers/authController'
import goalController from '../controllers/goalController'
import transactionController from '../controllers/transactionController'
import Promise from 'bluebird'
import { mapbox_private } from '../env/envConfig'

// Poplulate categories after server initializes
apiController.getCategories()

let apiHandler = {

  // #### Transaction Handlers
  retrieveTransactions(req, res) {

    // Find the user based on jwt auth token 
    authController.findUserByToken(req, true).then((user) => {

      // Retrieves all transactions for given user
      apiController.retrieveTransactions(user.token_plaid, user.id)
    })
  },

  getTransactions(req, res) {
    
    // Find the user based on jwt auth token
    if (!req.headers.authorization) {
      // If no token is present send back error message to let client know that user is not authenticated
      res.status(403)
      res.json({ success: false, message: 'Failed, user is not authenticated'})
    } else {

      authController.findUserByToken(req).then((user) => {

        // if year and month params were given, we want to only return transactions for specified time period
        if (req.params.year && req.params.month) {
          transactionController.getTransactionsByTime(user.id, req.params.month, req.params.year)
          .then((transactions) => {
            if (transactions) {
              res.json(transactions)
            } else {
              res.json({success: false, message: 'Error retrieving transactions'})
            }
          })
        } else {
          transactionController.getTransactionsByTime(user.id)
          .then((transactions) => {
            if (transactions) {
              res.json(transactions)
            } else {
              res.json({success: false, message: 'Error retrieving transactions'})
            }
          })
        }
      })
    }
  },

  // #### Webhook Handlers
  setWebhook(req, res) {
    // Get user from database using token
    authController.findUserByToken(req).then((user) => {
      if (user.attributes.token_plaid) {

        // Set up webhook with Plaid API
        apiController.setWebhook(user.attributes.token_plaid)
        res.sendStatus(200)

      } else {
        res.sendStatus(500)
      }
    })
  },

  // #### State Handlers
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
                      transactionController.getTransactionsByTime(user.id).then((transactions) => {
                        // Build response object
                        let mapbox = {accessToken: mapbox_private.accessToken}
                        let state = {
                          transactions,
                          user,
                          budgets,
                          categories,
                          goals,
                          avgNet,
                          mapbox
                        }
                        res.json(state)
                      })
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

  // #### Budget Handlers
  addOrUpdateBudget(req, res) {

    // Check incomming request for jwt session token 
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

              // Send success code after successful budget creation
              res.send(200)
            } else {
              res.json({ success: false, message: 'Failed, error creating budget.' })
            }
          })
        } else {

          // Send error code of budget could not be created or updated
          res.sendStatus(500)
        }
      })
    }
  },

  deleteBudget(req, res) {

    // Check incomming request for jwt session token
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

              // Send success code after budget has been deleted
              res.send(200)
            } else {

              // Send error if budget could not be deleted
              res.json({ success: false, message: 'Failed, error deleting budget.' })
            }
          })
        } else {

          // Send back server error if user could not be located in database
          res.sendStatus(500)
        }
      })
    }
  },

  // #### Goal Handlers
  createGoal(req, res) {

    // Check incomming request for jwt session token
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
  },

  deleteGoal(req, res) {

    // Check incomming request for jwt session token
    if (!req.headers.authorization) {
      res.status(403)
      res.json({ success: false, message: 'Failed, user is not authenticated'})
    } else {
      authController.findUserByToken(req).then((user) => {

        // Delete goal for specified user
        goalController.deleteGoal(user.id, req.params.id).then((goal) => {
          if (goal) {

            // Send success code on successful goal deletion
            res.sendStatus(200)
          } else {

            // Send error message if goal could not be deleted
            res.json({success: false, message: 'Failed, error deleting goal'})
          }
        })
      })
    }
  },

  updateGoal(req, res) {

    // Check incomming request for jwt session token
    if (!req.headers.authorization) {
      res.status(403)
      res.json({ success: false, message: 'Failed, user is not authenticated'})
    } else {
      authController.findUserByToken(req).then((user) => {

        // update goal with params passed in req.body
        goalController.updateGoal(user.id, req.params.id, req.body).then((goal) => {
          if (goal) {

            // Send success code on goal update completion
            res.status(201)
            res.json(goal)
          } else {

            // Send error message if goal failed to update
            res.json({success: false, message: 'Failed, error updating goal'})
          }
        })
      })
    }
  },
  
  // #### Settings Handlers
  settings(req, res) {

    // Check incomming request for jwt session token
    if (!req.headers.authorization) {
      res.status(403)
      res.json({success: false, message: 'Failed, user is not authenticated'})
    } else {
      authController.findUserByToken(req).then((user) => {

        // Update all fields included in req.body in user table
        authController.updateUser(user, req.body).then((user) => {
          if (user) {

            // Send success code on completeion
            res.status(201)
            res.json(user)
          } else {

            // Send error code in user could not be updated
            res.sendStatus(500)
          }
        })
      })
    }
  },

  deleteAccount(req, res) {

    // Check incomming request for jwt session token
    if (!req.headers.authorization) {
      res.status(403)
      res.json({success: false, message: 'Failed, user is not authenticated'})
    } else {
      authController.findUserByToken(req).then((user) => {
        authController.deleteAccount(user).then((rowsDeleted) => {

          // Verifies that user has been deleted, if so send success response
          if (rowsDeleted.userRows > 0) {
            res.status(204)
            res.json(user)
          } else {
            res.sendStatus(500)
          }
        })
      })
    }
  },

  // #### Daily Transaction Pull
  //Job for retrieving every users new transactions
  usersDailyTransactions() {
    //Retrieve all users
    authController.allUsers()
      .then((users) => {
        Promise.each(users, (user) => {
          //Call controller for each user to make a call to Plaid
          apiController.updateTransactions(user.token_plaid, user.id)
        })
      })
  }
}

export default apiHandler

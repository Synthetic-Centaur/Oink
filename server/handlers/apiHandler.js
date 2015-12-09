import apiController from '../controllers/apiController'
import budgetController from '../controllers/budgetController'
import authController form '../controllers/authController'

let apiHandler = {
  intitialState(req, res) {
    console.log("inside intitialState handler");
    res.send(req);
  },
  budget(req, res) {
    console.log("inside budget handler");
    authController(req).then((user) => {
      if(user) {
        budgetController.createBudget(req.params.id, user.attributes.id, req.body.amount).then( (budget) => {
          if(budget){
            res.json(budget)
          } else {
            res.sendStatus(500)
          }
        })
      } else {
        res.sendStatus(500)
      }
    })
    res.send(req);
  },
  message(req, res) {
    apiController.sendMessage('I can\'t feel my face when i\'m with you', 7344749351)
  }
}

export default apiHandler

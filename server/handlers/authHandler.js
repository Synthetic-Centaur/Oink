import authController from '../controllers/authController'

let authHandler = {
  login(req, res) {
    console.log("inside login handler")

    let user = req.body
    console.log(user);

    // will need passport for this to work --> for now assuming if user is in db this is successful
    authController.findUser(user)
    .then((result) => {
      if (result) {
        // user was found in db
        res.send(user)
      } else {
        // user was not found
        res.sendStatus(404)
      }
    })
  },
  logout(req, res) {
    console.log("inside logout handler")
    let user = req.body
    // will need passport for this to work --> for now assuming if user is in db this is successful
    authController.findUser(user)
    .then( (result) => {
      if (result) {
        // user was found in db
        res.send(user)
      } else {
        // user was not found
        res.sendStatus(404)
      }
    })
  },
  signup(req, res) {
    console.log("inside signup handler")
    // assuming user passed as obj in req.body
    let user = req.body
    
    authController.findUser(user)
    .then((result) => {
      if (!result) {
        // if user is not in db add the user
        authController.addUser(user).then( (newUser) => {
          if (newUser) {
            // ToDo: need to log newUser in --> call login controller
            res.json(newUser)
          } else {
            res.sendStatus(500)
          }
        })
      } else {
        // user is already in database
        res.sendStatus(409)
      }
    })
  },
  authenticate(req, res) {
    console.log("inside authenticate handler")
    let user = req.body
    // will need passport for this to work --> for now assuming if user is in db this is successful
    authController.findUser.then( (result) => {
      if (result) {
        // user was found in db
        res.send(user)
      } else {
        // user was not found
        res.sendStatus(404)
      }
    })
  }
}

export default authHandler

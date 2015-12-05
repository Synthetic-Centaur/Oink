import authController from '../controllers/authController'

let authHandler = {
  login(req, res) {
    console.log("inside login handler")
    res.send()
  },
  logout(req, res) {
    console.log("inside logout handler")
    res.send()
  },
  signup(req, res) {
    console.log("inside signup handler")
    // assuming user passed as obj in req.body
    let user = req.body
    console.log(user)
    authController.findUser(user)
    .then((result) => {
      if (!result) {
        // if user is not in db add the user
        authController.addUser(user).then ((newUser) => {
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
    res.send()
  }
}

export default authHandler

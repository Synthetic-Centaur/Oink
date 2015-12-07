import apiController from '../controllers/apiController'

let apiHandler = {
  intitialState(req, res) {
    console.log("inside intitialState handler");
    res.send(req);
  },
  budget(req, res) {
    console.log("inside budget handler");
    res.send(req);
  },
  message(req, res) {
    apiController.sendMessage('I can\'t feel my face when i\'m with you', 7344749351)
  }
}

export default apiHandler

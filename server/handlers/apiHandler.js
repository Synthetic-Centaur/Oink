let apiHandler = {
  intitialState(req, res) {
    console.log("inside intitialState handler");
    res.send(req);
  },
  budget(req, res) {
    console.log("inside budget handler");
    res.send(req);
  }
}

export default apiHandler

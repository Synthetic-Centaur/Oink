let authHandler = {
  login(req, res) {
    console.log("inside login handler");
    res.send();
  },
  logout(req, res) {
    console.log("inside logout handler");
    res.send("Success");
  },
  signup(req, res) {
    console.log("inside signup handler");
    res.send();
  },
  authenticate(req, res) {
    console.log("inside authenticate handler");
    res.send();
  }
}

export default authHandler

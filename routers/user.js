// import the Router class from express
const { Router } = require("express");
// import the corresponding model
const User = require("../models").user;
// instantiate a router
const router = new Router();

// register a GET / route that makes a test
// TEST: http GET :4000/users/testest
router.get("/testest", (req, res) => {
  res.send("Testest..");
});

// export the router
module.exports = router;

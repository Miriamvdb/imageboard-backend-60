// import the Router class from express
const { Router } = require("express");
// import the corresponding model
const Image = require("../models").image;
// instantiate a router
const router = new Router();

// register a GET / route that makes a test
// TEST: http GET :4000/images/testestest
router.get("/testestest", (req, res) => {
  res.send("Testestest..");
});

// export the router
module.exports = router;

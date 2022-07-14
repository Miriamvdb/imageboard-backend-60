const { Router } = require("express");
const User = require("../models").user;
const { toJWT, toData } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");

const router = new Router();

// 1a. LOGIN ROUTE (other version in user.js)
// http POST :4000/auth/login email="k@k.com" password="k"
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // when the email and password are empty, we should return an
      // HTTP 400 Bad Request with a descriptive message
      return res
        .status(400)
        .send({ message: "Please supply a valid email and password" });
    }
    // If some email and password are given, we should respond with
    // a JWT with a hard-coded userId (because this is a tutorial)
    res.send({
      jwt: toJWT({ userId: 1 }),
    });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// First, log in:
// http POST :4000/auth/login email="k@k.com" password="k"
// Second, use the provided token:
// http GET :4000/auth/testauth Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1NzgyODM1MiwiZXhwIjoxNjU3ODM1NTUyfQ.zswEMipabAH2VnUC2NZS67MEoHQHNssU6wptuoAk1Pk"
router.get("/testauth", authMiddleware, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}!`,
  });
});

module.exports = router;

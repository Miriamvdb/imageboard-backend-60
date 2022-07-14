// import the Router class from express
const { Router } = require("express");
// import the corresponding model
const User = require("../models").user;
// instantiate a router
const router = new Router();

const bcrypt = require("bcrypt");
const { toJWT, toData } = require("../auth/jwt");

// 0. TEST: http GET :4000/users/testest
router.get("/testest", (req, res) => {
  res.send("Testest..");
});

// 1. CREATE A NEW USER
// http POST :4000/users email="m@m.com" password="m" fullName="Mirrie"
router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("Must provide an email, password and fullname");
    } else {
      const newUser = await User.create({
        email,
        // Here, when handing down the password to the create method we hash it.
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

// 1b. LOGIN ROUTE (other version in auth.js)
// http POST :4000/users/login email="a@a.com" password="a"
// http POST :4000/users/login email="w@w.com" password="w"
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please supply a valid email and password" });
    } else {
      // 1. find user based on email address
      const user = await User.findOne({
        where: { email: email },
      });
      if (!user) {
        res
          .status(400)
          .send({ message: "User with this email address doesn't exist." });

        // 2. use bcrypt.compareSync to check the received password against the stored hash
      } else if (bcrypt.compareSync(password, user.password)) {
        // 3. if the password is correct, return with the userId of the user (user.id)
        const jwt = toJWT({ userId: user.id });
        res.send({ jwt });
      } else {
        res.status(400).send({ message: "Credentials are incorrect!" });
      }
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// export the router
module.exports = router;

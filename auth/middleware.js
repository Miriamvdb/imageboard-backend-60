const User = require("../models").user;
const { toData } = require("./jwt");

const authMiddleware = async (req, res, next) => {
  // 1. Check for authorization header and split it.
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");

  // 2a. If authorization header is there, auth type is Bearer and we have something at auth[1] we proceed to check the token.
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // 2. Remember to try/catch the call to "toData()".
    try {
      // 3. Use the value returned from "toData()" to look for that user in your database with User.findByPk.
      const data = toData(auth[1]);
      const user = await User.findByPk(data.userId);

      // 4. If not found, set status to 404 "No user found"
      if (!user) {
        res.status(404).send({ message: "No user found!" });

        // 5. If user is found, set it to req.user = user and call next()
      } else {
        req.user = user;
        next();
      }
    } catch (e) {
      res.status(400).send({ message: "Error" });
    }

    // 2b. If not we return a 401 status and the message: "Please supply some valid credentials".
  } else {
    res.status(401).send({ message: "Please supply some valid credentials" });
  }
};

module.exports = authMiddleware;

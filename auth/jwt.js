const jwt = require("jsonwebtoken");

// 1. We require the module and define a secret key for our JWT. Secret keys should
// be not go into Github, so that why we first set it to be equal to an "env" variable
// we could configure in the hosting of our server, so it's not exposed to the public.
const secret =
  process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m";

// 2. The two functions make use of the library's methods. The

// 2a. This function creates a JWT token combining the data we hand it, (in this
// case it's going the be to our userId) and sets its expiration time.
const toJWT = (data) => {
  return jwt.sign(data, secret, { expiresIn: "2h" });
};

// 2b. This function verifies token are valid.
const toData = (token) => {
  return jwt.verify(token, secret);
};

// 3. Finally we exports both functions so we can use them in our routes (or middleware)
module.exports = { toJWT, toData };

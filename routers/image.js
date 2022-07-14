// import the Router class from express
const { Router } = require("express");
// import the corresponding model
const Image = require("../models").image;
// instantiate a router
const router = new Router();

const { toData } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");

// 0. TEST: http GET :4000/images/testestest
router.get("/testestest", (req, res) => {
  res.send("Testestest..");
});

// 1. CREATE A NEW IMAGE
// http POST :4000/images title="Grumpy cat" url="https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/https://voordeklas.com/wp-content/uploads/2021/05/The-first-documented-LOLcat-of-Grumpy-Cat.jpg"
router.post("/", async (req, res, next) => {
  try {
    const newImage = await Image.create(req.body);
    res.send(newImage);
  } catch (e) {
    next(e);
  }
});

// 2. READ ONE IMAGE
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const oneImage = await Image.findByPk(id);
    if (!oneImage) {
      res.status(404).send({ message: "Image not found!" });
    } else {
      res.send(oneImage);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// 3. READ ALL IMAGES
// http GET :4000/images
// router.get("/", async (req, res, next) => {
//   try {
//     const allImages = await Image.findAll();
//     res.send(allImages);
//   } catch (e) {
//     console.log(e.message);
//     next(e);
//   }
// });

// 4. READ ALL IMAGES + PROTECTION
// http GET :4000/images/auth/messy Authorization:"Bearer <token>"
router.get("/auth/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const allImages = await Image.findAll();
      res.json(allImages);
    } catch (e) {
      res.status(400).send({ message: "Invalid JWT token" });
    }
  } else {
    res
      .status(401)
      .send({ message: "Please supply some invalid credentials!" });
  }
});

// 5. READ ALL IMAGES + MIDDLEWARE
// http GET :4000/images Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1NzgyODM1MiwiZXhwIjoxNjU3ODM1NTUyfQ.zswEMipabAH2VnUC2NZS67MEoHQHNssU6wptuoAk1Pk"
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const allImages = await Image.findAll();
    res.send(allImages);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// export the router
module.exports = router;

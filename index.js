const express = require("express");

const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");

const app = express();
const PORT = 4000;

// Setup parser middleware
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/images", imageRouter);

app.listen(PORT, () => console.log(`Listening on PORT :${PORT}`));

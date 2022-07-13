const express = require("express");

const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/users", userRouter);
app.use("/images", imageRouter);

app.listen(PORT, () => console.log(`Listening on PORT :${PORT}`));

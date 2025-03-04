const express = require("express");
const authRouter = require("./controllers/authControllers");
const userRouter = require("./controllers/userController");
const app = express();

// authController router
app.use(express.json());
app.use("/api/auth/", authRouter);

//userController router
app.use("/api/user/", userRouter);

module.exports = app;

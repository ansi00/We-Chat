const express = require("express");
const authRouter = require("./controllers/authControllers");
const userRouter = require("./controllers/userController");
const chatRouter = require("./controllers/chatController");
const app = express();

// authController router
app.use(express.json());
app.use("/api/auth/", authRouter);

//userController router
app.use("/api/user/", userRouter);

//chatController router
app.use("/api/chat", chatRouter);

module.exports = app;

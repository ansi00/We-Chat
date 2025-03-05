const express = require("express");
const authRouter = require("./controllers/authControllers");
const userRouter = require("./controllers/userController");
const chatRouter = require("./controllers/chatController");
const messageRouter = require("./controllers/messageController");
const app = express();

// authController router
app.use(express.json());
app.use("/api/auth/", authRouter);

//userController router
app.use("/api/user/", userRouter);

//chatController router
app.use("/api/chat", chatRouter);

//messageController router
app.use("/api/message", messageRouter);

module.exports = app;

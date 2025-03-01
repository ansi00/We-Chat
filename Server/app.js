const express = require("express");
const authRouter = require("./controllers/authControllers");
const app = express();

// authController router
app.use(express.json());
app.use("/api/auth/", authRouter);

module.exports = app;

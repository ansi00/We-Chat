const express = require("express");
const authRouter = require("./controllers/authControllers");
const userRouter = require("./controllers/userController");
const chatRouter = require("./controllers/chatController");
const messageRouter = require("./controllers/messageController");
const app = express();

// authController router
app.use(express.json());
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

app.use("/api/auth/", authRouter);

//userController router
app.use("/api/user/", userRouter);

//chatController router
app.use("/api/chat", chatRouter);

//messageController router
app.use("/api/message", messageRouter);


// Socket implementation
io.on("connection", (socket) => {
  socket.on("join-room", (userid) => {
    socket.join(userid);
  });

  socket.on("send-message", (message) => {
    io.to(message.members[0])
      .to(message.members[1])
      .emit("receive-message", message);
  });
});

module.exports = server;

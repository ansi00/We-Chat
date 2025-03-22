const express = require("express");
const authRouter = require("./controllers/authControllers");
const userRouter = require("./controllers/userController");
const chatRouter = require("./controllers/chatController");
const messageRouter = require("./controllers/messageController");
const app = express();

// authController router
app.use(express.json({ limit: "50mb" }));
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

const onlineUsers = [];

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

  socket.on("clear-unread-messages", (data) => {
    io.to(data.members[0])
      .to(data.members[1])
      .emit("message-count-cleared", data);
  });

  socket.on("user-typing", (data) => {
    io.to(data.members[0]).to(data.members[1]).emit("started-typing", data);
  });

  socket.on("user-login", (userid) => {
    if (!onlineUsers.includes(userid)) {
      onlineUsers.push(userid);
    }
    socket.emit("online-users", onlineUsers);
  });

  socket.on("user-logout", (userid) => {
    onlineUsers.splice(onlineUsers.indexOf(userid), 1);
    io.emit("online-users-updated", onlineUsers);
  });
});

module.exports = server;

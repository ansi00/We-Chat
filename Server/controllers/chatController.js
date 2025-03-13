const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Chat = require("../models/chat.js");
const Message = require("../models/message.js");

router.post("/create-new-chat", authMiddleware, async (req, res) => {
  try {
    const chat = new Chat(req.body);
    const savedChat = await chat.save();
    res.status(201).send({
      message: "Chat created successfully",
      success: true,
      data: savedChat,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-all-chats", authMiddleware, async (req, res) => {
  try {
    const allChats = await Chat.find({ members: { $in: req.body.userId } })
      .populate("members")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.status(200).send({
      message: "Chat fetched successfully",
      success: true,
      data: allChats,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/clear-unread-message", authMiddleware, async (req, res) => {
  try {
    const chatId = req.body.chatId;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.send({
        message: "No Chat found with given Chat Id ",
        success: false,
      });
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { unreadMessageCount: 0 },
      { new: true }
    )
      .populate("members")
      .populate("lastMessage");

    await Message.updateMany({ chatId: chatId, read: false }, { read: true });
    res.send({
      message: "Unread messages cleared successfully",
      success: true,
      data: updatedChat,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;

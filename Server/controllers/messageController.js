const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Message = require("../models/message.js");
const Chat = require("../models/chat.js");

router.post("/send-message", authMiddleware, async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    const currentChat = await Chat.findOneAndUpdate(
      {
        _id: req.body.chatId,
      },
      {
        lastMessage: savedMessage._id,
        $inc: { unreadMessageCount: 1 },
      },
      { new: true }
    );
    res.status(201).send({
      message: "Message sent successfully",
      success: true,
      data: savedMessage,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-all-messages/:chatId", authMiddleware, async (req, res) => {
  try {
    const allMsgs = await Message.find({ chatId: req.params.chatId }).sort({
      createdAt: 1,
    });
    res.send({
      message: "Messages fetched successfully",
      success: true,
      data: allMsgs,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;

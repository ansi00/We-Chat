const router = require("express").Router();
const User = require("../models/user.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.get("/get-logged-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    res.send({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const allUsers = await User.find({ _id: { $ne: userId } });
    res.send({
      message: " All Users fetched successfully",
      success: true,
      data: allUsers,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;

const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getChats,
  createPrivateChat,
  createGroupChat,
} = require("../controllers/chatController");

router.get("/", auth, getChats);
router.post("/", auth, createPrivateChat);
router.post("/group", auth, createGroupChat);

module.exports = router;

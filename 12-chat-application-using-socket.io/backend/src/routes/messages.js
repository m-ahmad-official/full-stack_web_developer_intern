const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getMessages,
  sendMessage,
} = require("../controllers/messageController");

router.get("/:chatId", auth, getMessages);
router.post("/", auth, sendMessage);

module.exports = router;

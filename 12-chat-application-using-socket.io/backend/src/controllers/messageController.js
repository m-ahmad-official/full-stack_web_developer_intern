const Message = require("../models/Message");
const Chat = require("../models/Chat");

exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOne({ _id: chatId, members: req.user._id });
    if (!chat) return res.status(403).json({ error: "Access denied" });
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 })
      .limit(100);
    res.json(messages);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;
    if (!chatId || !content?.trim())
      return res.status(400).json({ error: "chatId and content required" });
    const chat = await Chat.findOne({ _id: chatId, members: req.user._id });
    if (!chat) return res.status(403).json({ error: "Access denied" });
    const msg = await Message.create({
      chat: chatId,
      sender: req.user._id,
      content: content.trim(),
      readBy: [req.user._id],
    });
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: msg._id,
      updatedAt: new Date(),
    });
    const populated = await Message.findById(msg._id).populate(
      "sender",
      "name avatar",
    );
    res.status(201).json(populated);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.user._id })
      .populate("members", "name email avatar isOnline lastSeen")
      .populate({
        path: "lastMessage",
        populate: { path: "sender", select: "name" },
      })
      .sort({ updatedAt: -1 });
    res.json(chats);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createPrivateChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const existing = await Chat.findOne({
      isGroup: false,
      members: { $all: [req.user._id, userId], $size: 2 },
    }).populate("members", "name email avatar isOnline lastSeen");
    if (existing) return res.json(existing);
    const chat = await Chat.create({
      isGroup: false,
      members: [req.user._id, userId],
    });
    const populated = await Chat.findById(chat._id).populate(
      "members",
      "name email avatar isOnline lastSeen",
    );
    res.status(201).json(populated);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createGroupChat = async (req, res) => {
  try {
    const { name, members } = req.body;
    if (!name?.trim() || !members?.length || members.length < 2)
      return res
        .status(400)
        .json({ error: "Group name and at least 2 members required" });
    const allMembers = [...new Set([req.user._id.toString(), ...members])];
    const chat = await Chat.create({
      name: name.trim(),
      isGroup: true,
      members: allMembers,
      admin: req.user._id,
    });
    const populated = await Chat.findById(chat._id).populate(
      "members",
      "name email avatar isOnline lastSeen",
    );

    // System message
    await Message.create({
      chat: chat._id,
      sender: req.user._id,
      content: `${req.user.name} created group "${name}"`,
      type: "system",
    });
    res.status(201).json(populated);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select("name email avatar isOnline lastSeen")
      .sort({ isOnline: -1, name: 1 });
    res.json(users);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

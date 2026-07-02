const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ name: 1 });
    res.json(users);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

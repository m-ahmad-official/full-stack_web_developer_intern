const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields required" });
    if (password.length < 6)
      return res.status(400).json({ error: "Password min 6 characters" });
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists)
      return res.status(409).json({ error: "Email already registered" });
    const user = await User.create({
      name: name.trim(),
      email,
      password,
      role: role ?? "member",
    });
    const token = signToken(user._id);
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });
    const valid = await user.comparePassword(password);
    if (!valid)
      return res.status(401).json({ error: "Invalid email or password" });
    const token = signToken(user._id);
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.me = async (req, res) => {
  res.json(req.user);
};

const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    })
      .populate("owner", "name email role")
      .populate("members", "name email role")
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description, color } = req.body;
    if (!name?.trim())
      return res.status(400).json({ error: "Project name required" });
    const project = await Project.create({
      name: name.trim(),
      description: description?.trim() ?? "",
      color: color ?? "#8b5cf6",
      owner: req.user._id,
      members: [req.user._id],
    });
    const populated = await Project.findById(project._id)
      .populate("owner", "name email role")
      .populate("members", "name email role");
    res.status(201).json(populated);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true },
    )
      .populate("owner", "name email role")
      .populate("members", "name email role");
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { $addToSet: { members: userId } },
      { new: true },
    ).populate("members", "name email role");
    res.json(project);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

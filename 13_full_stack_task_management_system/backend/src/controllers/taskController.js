const Task = require("../models/Task");
const Project = require("../models/Project");

const populateTask = (q) =>
  q
    .populate("assignee", "name email avatar")
    .populate("reporter", "name email avatar");

exports.getTasks = async (req, res) => {
  try {
    const { project, status, priority, assignee } = req.query;
    const query = {};
    if (project) query.project = project;
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignee) query.assignee = assignee;
    // Only tasks in projects user belongs to
    const userProjects = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    }).select("_id");
    query.project = { $in: userProjects.map((p) => p._id) };
    if (project) query.project = project;

    const tasks = await populateTask(
      Task.find(query).sort({ order: 1, createdAt: -1 }),
    );
    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      assignee,
      project,
      dueDate,
      tags,
    } = req.body;
    if (!title?.trim() || !project)
      return res.status(400).json({ error: "Title and project required" });
    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() ?? "",
      status: status ?? "todo",
      priority: priority ?? "medium",
      assignee: assignee?._id || assignee || null,
      reporter: req.user._id,
      project,
      dueDate: dueDate ? new Date(dueDate) : null,
      tags: tags ?? [],
    });
    const populated = await populateTask(Task.findById(task._id));
    res.status(201).json(populated);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { assignee, ...rest } = req.body;
    const update = { ...rest };
    if (assignee !== undefined)
      update.assignee = assignee?._id || assignee || null;
    if (rest.dueDate) update.dueDate = new Date(rest.dueDate);
    const task = await populateTask(
      Task.findByIdAndUpdate(req.params.id, update, { new: true }),
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

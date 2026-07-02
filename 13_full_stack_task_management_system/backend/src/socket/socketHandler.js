const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (io) => {
  // Auth middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Unauthorized"));
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return next(new Error("User not found"));
      socket.user = user;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    // Join a project room for real-time updates
    socket.on("join_project", (projectId) => {
      socket.join(`project:${projectId}`);
    });

    socket.on("leave_project", (projectId) => {
      socket.leave(`project:${projectId}`);
    });

    // Broadcast task events to project room
    socket.on("task_created", (data) => {
      if (data?.projectId) {
        socket.to(`project:${data.projectId}`).emit("task_created", data);
      }
    });

    socket.on("task_updated", (data) => {
      if (data?.projectId) {
        socket.to(`project:${data.projectId}`).emit("task_updated", data);
      }
    });

    socket.on("task_deleted", (data) => {
      if (data?.projectId) {
        socket.to(`project:${data.projectId}`).emit("task_deleted", data.id);
      }
    });

    socket.on("disconnect", () => {});
  });
};

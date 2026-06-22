const jwt = require("jsonwebtoken");
const User = require("../models/User");

const onlineUsers = new Map(); // userId -> socketId

module.exports = (io) => {
  // Auth middleware for socket
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

  io.on("connection", async (socket) => {
    const userId = socket.user._id.toString();

    // Mark online
    onlineUsers.set(userId, socket.id);
    await User.findByIdAndUpdate(userId, { isOnline: true });
    io.emit("online_users", Array.from(onlineUsers.keys()));

    // Join all user's chats
    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
    });

    // Real-time message broadcast
    socket.on("send_message", (msg) => {
      const chatId = msg.chatId;
      if (chatId) {
        socket.to(chatId).emit("receive_message", msg);
      }
    });

    // Typing indicator
    socket.on("typing", ({ chatId }) => {
      socket.to(chatId).emit("typing", {
        chatId,
        userName: socket.user.name,
      });
    });

    // Disconnect
    socket.on("disconnect", async () => {
      onlineUsers.delete(userId);
      await User.findByIdAndUpdate(userId, {
        isOnline: false,
        lastSeen: new Date(),
      });
      io.emit("online_users", Array.from(onlineUsers.keys()));
    });
  });
};

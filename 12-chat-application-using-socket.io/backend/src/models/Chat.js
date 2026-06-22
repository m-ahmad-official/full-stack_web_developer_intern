const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    isGroup: { type: Boolean, default: false },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

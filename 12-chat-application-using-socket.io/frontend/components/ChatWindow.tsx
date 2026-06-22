"use client";
import { useState, useEffect, useRef } from "react";
import { User, Chat, Message } from "@/types";
import styles from "./ChatWindow.module.css";

interface Props {
  me: User;
  chat: Chat;
  messages: Message[];
  onlineUsers: string[];
  typing: string | null;
  loading: boolean;
  onSend: (content: string) => void;
  onTyping: () => void;
}

export default function ChatWindow({
  me,
  chat,
  messages,
  onlineUsers,
  typing,
  loading,
  onSend,
  onTyping,
}: Props) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const other = !chat.isGroup
    ? chat.members.find((m) => m._id !== me._id)
    : null;
  const chatName = chat.isGroup ? chat.name : (other?.name ?? "Unknown");
  const isOtherOnline = other ? onlineUsers.includes(other._id) : false;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [chat]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else onTyping();
  };

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("en", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const formatDate = (date: string) => {
    const d = new Date(date),
      now = new Date();
    if (d.toDateString() === now.toDateString()) return "Today";
    const y = new Date(now);
    y.setDate(y.getDate() - 1);
    if (d.toDateString() === y.toDateString()) return "Yesterday";
    return d.toLocaleDateString("en", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  let lastDate = "";

  return (
    <div className={styles.window}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.avatarWrap}>
            <div
              className={`${styles.avatar} ${chat.isGroup ? styles.groupAvatar : ""}`}
            >
              {chat.isGroup ? "👥" : chatName[0]?.toUpperCase()}
            </div>
            {!chat.isGroup && isOtherOnline && (
              <span className={styles.onlineDot} />
            )}
          </div>
          <div>
            <div className={styles.chatName}>{chatName}</div>
            <div className={styles.chatStatus}>
              {chat.isGroup
                ? `${chat.members.length} members`
                : isOtherOnline
                  ? "🟢 Online"
                  : "⚫ Offline"}
            </div>
          </div>
        </div>
        {chat.isGroup && (
          <div className={styles.groupMembers}>
            {chat.members.slice(0, 4).map((m) => (
              <div
                key={m._id}
                className={`${styles.memberDot} ${onlineUsers.includes(m._id) ? styles.memberOnline : ""}`}
                title={m.name}
              >
                {m.name[0].toUpperCase()}
              </div>
            ))}
            {chat.members.length > 4 && (
              <div className={styles.memberDot}>+{chat.members.length - 4}</div>
            )}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className={styles.messages}>
        {loading ? (
          <div className={styles.loadingWrap}>
            <div className={styles.spinner} />
          </div>
        ) : messages.length === 0 ? (
          <div className={styles.emptyMsg}>
            <div className={styles.emptyIcon}>👋</div>
            <p>Say hello to {chatName}!</p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isOwn = msg.sender._id === me._id;
            const msgDate = formatDate(msg.createdAt);
            const showDate = msgDate !== lastDate;
            if (showDate) lastDate = msgDate;

            const showAvatar =
              !isOwn &&
              (i === 0 || messages[i - 1].sender._id !== msg.sender._id);
            const showName = chat.isGroup && !isOwn && showAvatar;

            return (
              <div key={msg._id}>
                {showDate && (
                  <div className={styles.dateDivider}>
                    <span>{msgDate}</span>
                  </div>
                )}
                <div
                  className={`${styles.msgRow} ${isOwn ? styles.msgRowOwn : ""}`}
                >
                  {!isOwn && (
                    <div
                      className={`${styles.msgAvatar} ${showAvatar ? "" : styles.msgAvatarHidden}`}
                    >
                      {showAvatar ? msg.sender.name[0].toUpperCase() : ""}
                    </div>
                  )}
                  <div className={styles.msgContent}>
                    {showName && (
                      <div className={styles.senderName}>{msg.sender.name}</div>
                    )}
                    <div
                      className={`${styles.bubble} ${isOwn ? styles.bubbleOwn : styles.bubbleOther}`}
                    >
                      {msg.content}
                      <span className={styles.msgTime}>
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        {typing && (
          <div className={styles.msgRow}>
            <div className={styles.msgAvatar}>?</div>
            <div className={styles.typingBubble}>
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className={styles.inputBar}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder={`Message ${chatName}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={!input.trim()}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

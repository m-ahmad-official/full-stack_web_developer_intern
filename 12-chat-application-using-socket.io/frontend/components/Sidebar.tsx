"use client";
import { useState, useEffect } from "react";
import { User, Chat } from "@/types";
import { apiFetch } from "@/lib/api";
import styles from "./Sidebar.module.css";

interface Props {
  me: User;
  chats: Chat[];
  activeChat: Chat | null;
  onlineUsers: string[];
  open: boolean;
  onSelectChat: (c: Chat) => void;
  onCreateChat: (userId: string) => void;
  onCreateGroup: (name: string, memberIds: string[]) => void;
  onLogout: () => void;
}

export default function Sidebar({
  me,
  chats,
  activeChat,
  onlineUsers,
  open,
  onSelectChat,
  onCreateChat,
  onCreateGroup,
  onLogout,
}: Props) {
  const [tab, setTab] = useState<"chats" | "users">("chats");
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [showGroup, setShowGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (tab === "users")
      apiFetch("/api/users")
        .then(setUsers)
        .catch(() => {});
  }, [tab]);

  const filteredChats = chats.filter((c) => {
    const name = c.isGroup
      ? c.name
      : (c.members.find((m) => m._id !== me._id)?.name ?? "");
    return name.toLowerCase().includes(search.toLowerCase());
  });

  const filteredUsers = users.filter(
    (u) =>
      u._id !== me._id && u.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCreateGroup = () => {
    if (!groupName.trim() || selected.length < 2) return;
    onCreateGroup(groupName, selected);
    setShowGroup(false);
    setGroupName("");
    setSelected([]);
  };

  const formatTime = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    if (d.toDateString() === now.toDateString())
      return d.toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    return d.toLocaleDateString("en", { month: "short", day: "numeric" });
  };

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>💬</span>
          <span className={styles.brandName}>ChatFlow</span>
        </div>
        <div className={styles.headerRight}>
          <button
            className={styles.iconBtn}
            title="New Group"
            onClick={() => setShowGroup(true)}
          >
            👥
          </button>
          <button
            className={styles.iconBtn}
            title="Sign out"
            onClick={onLogout}
          >
            ⏏
          </button>
        </div>
      </div>

      {/* Me */}
      <div className={styles.meRow}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>{me.name[0].toUpperCase()}</div>
          <span className={styles.onlineDot} />
        </div>
        <div className={styles.meInfo}>
          <div className={styles.meName}>{me.name}</div>
          <div className={styles.meStatus}>🟢 Online</div>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === "chats" ? styles.tabActive : ""}`}
          onClick={() => setTab("chats")}
        >
          Chats
        </button>
        <button
          className={`${styles.tab} ${tab === "users" ? styles.tabActive : ""}`}
          onClick={() => setTab("users")}
        >
          People
        </button>
      </div>

      {/* Group modal */}
      {showGroup && (
        <div className={styles.groupModal}>
          <p className={styles.groupTitle}>New Group Chat</p>
          <input
            className={styles.groupInput}
            type="text"
            placeholder="Group name..."
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <p className={styles.groupSub}>Select members (min 2):</p>
          <div className={styles.groupUsers}>
            {users
              .filter((u) => u._id !== me._id)
              .map((u) => (
                <button
                  key={u._id}
                  className={`${styles.groupUser} ${selected.includes(u._id) ? styles.groupUserSelected : ""}`}
                  onClick={() =>
                    setSelected((prev) =>
                      prev.includes(u._id)
                        ? prev.filter((id) => id !== u._id)
                        : [...prev, u._id],
                    )
                  }
                >
                  <div className={styles.miniAvatar}>{u.name[0]}</div>
                  {u.name}
                  {selected.includes(u._id) && (
                    <span className={styles.checkMark}>✓</span>
                  )}
                </button>
              ))}
          </div>
          <div className={styles.groupActions}>
            <button
              className={styles.cancelBtn}
              onClick={() => setShowGroup(false)}
            >
              Cancel
            </button>
            <button
              className={styles.createBtn}
              onClick={handleCreateGroup}
              disabled={!groupName.trim() || selected.length < 2}
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className={styles.list}>
        {tab === "chats" &&
          filteredChats.map((chat) => {
            const other = chat.members.find((m) => m._id !== me._id);
            const name = chat.isGroup ? chat.name : (other?.name ?? "Unknown");
            const isOnline =
              !chat.isGroup && other && onlineUsers.includes(other._id);
            const isActive = activeChat?._id === chat._id;
            return (
              <button
                key={chat._id}
                className={`${styles.chatItem} ${isActive ? styles.chatActive : ""}`}
                onClick={() => onSelectChat(chat)}
              >
                <div className={styles.avatarWrap}>
                  <div
                    className={`${styles.chatAvatar} ${chat.isGroup ? styles.groupAvatar : ""}`}
                  >
                    {chat.isGroup ? "👥" : name[0].toUpperCase()}
                  </div>
                  {isOnline && <span className={styles.onlineDot} />}
                </div>
                <div className={styles.chatInfo}>
                  <div className={styles.chatTop}>
                    <span className={styles.chatName}>{name}</span>
                    {chat.lastMessage && (
                      <span className={styles.chatTime}>
                        {formatTime(chat.updatedAt)}
                      </span>
                    )}
                  </div>
                  <div className={styles.chatLast}>
                    {chat.lastMessage?.content ? (
                      chat.lastMessage.content.slice(0, 40) +
                      (chat.lastMessage.content.length > 40 ? "..." : "")
                    ) : (
                      <span className={styles.noMsg}>Start conversation</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}

        {tab === "users" &&
          filteredUsers.map((user) => (
            <button
              key={user._id}
              className={styles.userItem}
              onClick={() => onCreateChat(user._id)}
            >
              <div className={styles.avatarWrap}>
                <div className={styles.chatAvatar}>
                  {user.name[0].toUpperCase()}
                </div>
                {onlineUsers.includes(user._id) && (
                  <span className={styles.onlineDot} />
                )}
              </div>
              <div className={styles.chatInfo}>
                <div className={styles.chatName}>{user.name}</div>
                <div className={styles.chatLast}>
                  <span
                    className={`${styles.statusDot} ${onlineUsers.includes(user._id) ? styles.online : styles.offline}`}
                  />
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}

        {tab === "chats" && filteredChats.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>💬</div>
            <p>No chats yet</p>
            <p className={styles.emptySub}>
              Go to People tab to start chatting
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

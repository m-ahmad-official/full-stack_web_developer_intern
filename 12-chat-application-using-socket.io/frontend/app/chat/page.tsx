"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { User, Chat, Message } from "@/types";
import { apiFetch, getToken } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import NoChatSelected from "@/components/NoChatSelected";
import styles from "./chat.module.css";

export default function ChatPage() {
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);
  const activeChatRef = useRef<Chat | null>(null);

  const [me, setMe] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typing, setTyping] = useState<{
    chatId: string;
    userName: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [msgLoading, setMsgLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Keep ref in sync so socket handler always has latest activeChat
  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  // Auth check
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    apiFetch("/api/auth/me")
      .then((data) => {
        setMe(data);
        setLoading(false);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  // Fetch chats
  const fetchChats = useCallback(async () => {
    try {
      const data = await apiFetch("/api/chats");
      setChats(data);
    } catch {}
  }, []);

  useEffect(() => {
    if (me) fetchChats();
  }, [me, fetchChats]);

  // Socket setup
  useEffect(() => {
    const token = getToken();
    if (!token || !me) return;

    const socket = io(
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
      {
        auth: { token },
        transports: ["websocket"],
      },
    );
    socketRef.current = socket;

    socket.on("online_users", (users: string[]) => setOnlineUsers(users));

    // ✅ Receive message from OTHER users only
    socket.on("receive_message", (msg: Message) => {
      const currentChat = activeChatRef.current;
      // Only add if belongs to active chat
      if (currentChat && (msg as any).chatId === currentChat._id) {
        setMessages((prev) => {
          if (prev.find((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      }
      // Always update sidebar last message
      setChats((prev) =>
        prev
          .map((c) =>
            c._id === (msg as any).chatId
              ? { ...c, lastMessage: msg, updatedAt: msg.createdAt }
              : c,
          )
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          ),
      );
    });

    socket.on(
      "typing",
      ({ chatId, userName }: { chatId: string; userName: string }) => {
        setTyping({ chatId, userName });
        setTimeout(() => setTyping(null), 2000);
      },
    );

    socket.on("chat_created", (chat: Chat) => {
      setChats((prev) => [chat, ...prev.filter((c) => c._id !== chat._id)]);
    });

    return () => {
      socket.disconnect();
    };
  }, [me]);

  // Join room when active chat changes
  useEffect(() => {
    if (!activeChat) return;
    setMsgLoading(true);
    setMessages([]);
    apiFetch(`/api/messages/${activeChat._id}`)
      .then((data) => {
        setMessages(data);
        setMsgLoading(false);
      })
      .catch(() => setMsgLoading(false));
    socketRef.current?.emit("join_chat", activeChat._id);
  }, [activeChat]);

  // ✅ Send message — add to own state immediately
  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeChat || !content.trim()) return;
      try {
        const msg = await apiFetch("/api/messages", {
          method: "POST",
          body: JSON.stringify({ chatId: activeChat._id, content }),
        });
        // Add own message instantly
        setMessages((prev) => {
          if (prev.find((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
        // Broadcast to room (others will receive via receive_message)
        socketRef.current?.emit("send_message", {
          ...msg,
          chatId: activeChat._id,
        });
        // Update sidebar
        setChats((prev) =>
          prev
            .map((c) =>
              c._id === activeChat._id
                ? { ...c, lastMessage: msg, updatedAt: msg.createdAt }
                : c,
            )
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
            ),
        );
      } catch {}
    },
    [activeChat],
  );

  const emitTyping = useCallback(() => {
    if (!activeChat) return;
    socketRef.current?.emit("typing", { chatId: activeChat._id });
  }, [activeChat]);

  const createChat = useCallback(async (userId: string) => {
    try {
      const chat = await apiFetch("/api/chats", {
        method: "POST",
        body: JSON.stringify({ userId }),
      });
      setChats((prev) => [chat, ...prev.filter((c) => c._id !== chat._id)]);
      setActiveChat(chat);
      setSidebarOpen(false);
    } catch {}
  }, []);

  const createGroup = useCallback(async (name: string, memberIds: string[]) => {
    try {
      const chat = await apiFetch("/api/chats/group", {
        method: "POST",
        body: JSON.stringify({ name, members: memberIds }),
      });
      setChats((prev) => [chat, ...prev.filter((c) => c._id !== chat._id)]);
      setActiveChat(chat);
      setSidebarOpen(false);
    } catch {}
  }, []);

  const handleLogout = () => {
    document.cookie = "chat_token=; path=/; max-age=0";
    socketRef.current?.disconnect();
    router.push("/login");
  };

  if (loading || !me)
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingSpinner} />
        <p>Connecting...</p>
      </div>
    );

  return (
    <div className={styles.layout}>
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        me={me}
        chats={chats}
        activeChat={activeChat}
        onlineUsers={onlineUsers}
        open={sidebarOpen}
        onSelectChat={(chat) => {
          setActiveChat(chat);
          setSidebarOpen(false);
        }}
        onCreateChat={createChat}
        onCreateGroup={createGroup}
        onLogout={handleLogout}
      />

      <div className={styles.main}>
        <div className={styles.mobileTopbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <span className={styles.mobileTitle}>
            {activeChat
              ? activeChat.isGroup
                ? activeChat.name
                : activeChat.members.find((m) => m._id !== me._id)?.name
              : "ChatFlow"}
          </span>
        </div>

        {activeChat ? (
          <ChatWindow
            me={me}
            chat={activeChat}
            messages={messages}
            onlineUsers={onlineUsers}
            typing={typing?.chatId === activeChat._id ? typing.userName : null}
            loading={msgLoading}
            onSend={sendMessage}
            onTyping={emitTyping}
          />
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  );
}

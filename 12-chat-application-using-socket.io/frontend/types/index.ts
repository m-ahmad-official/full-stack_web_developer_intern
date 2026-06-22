export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: string;
}

export interface Message {
  _id: string;
  sender: User;
  content: string;
  type: "text" | "system";
  readBy: string[];
  createdAt: string;
}

export interface Chat {
  _id: string;
  name: string;
  isGroup: boolean;
  members: User[];
  admin?: User;
  lastMessage?: Message;
  updatedAt: string;
  unreadCount?: number;
}

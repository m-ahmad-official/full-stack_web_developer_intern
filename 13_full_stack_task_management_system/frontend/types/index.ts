export type Role = "admin" | "member";
export type Priority = "low" | "medium" | "high" | "urgent";
export type Status = "todo" | "inprogress" | "review" | "done";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  createdAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee?: User;
  reporter: User;
  dueDate?: string;
  tags: string[];
  project: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  color: string;
  owner: User;
  members: User[];
  createdAt: string;
}

export interface Column {
  id: Status;
  title: string;
  tasks: Task[];
}

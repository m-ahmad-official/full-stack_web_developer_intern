import { Priority, Status } from "@/types";

export const STATUS_CONFIG: Record<
  Status,
  { label: string; color: string; bg: string; icon: string }
> = {
  todo: {
    label: "To Do",
    color: "#5c5c7a",
    bg: "rgba(92,92,122,0.15)",
    icon: "○",
  },
  inprogress: {
    label: "In Progress",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.15)",
    icon: "◑",
  },
  review: {
    label: "In Review",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.15)",
    icon: "◕",
  },
  done: {
    label: "Done",
    color: "#10b981",
    bg: "rgba(16,185,129,0.15)",
    icon: "●",
  },
};

export const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; color: string; bg: string; icon: string }
> = {
  low: {
    label: "Low",
    color: "#10b981",
    bg: "rgba(16,185,129,0.15)",
    icon: "↓",
  },
  medium: {
    label: "Medium",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.15)",
    icon: "→",
  },
  high: {
    label: "High",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.15)",
    icon: "↑",
  },
  urgent: {
    label: "Urgent",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.15)",
    icon: "⚡",
  },
};

export const PROJECT_COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#3b82f6",
  "#f97316",
];

export const STATUSES: Status[] = ["todo", "inprogress", "review", "done"];
export const PRIORITIES: Priority[] = ["low", "medium", "high", "urgent"];

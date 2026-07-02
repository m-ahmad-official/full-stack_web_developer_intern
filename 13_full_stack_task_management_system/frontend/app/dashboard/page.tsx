"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { User, Task, Project, Status } from "@/types";
import { apiFetch, getToken } from "@/lib/api";
import { STATUSES } from "@/lib/constants";
import Topbar from "@/components/ui/Topbar";
import Sidebar from "@/components/ui/Sidebar";
import KanbanBoard from "@/components/board/KanbanBoard";
import TaskModal from "@/components/modals/TaskModal";
import ProjectModal from "@/components/modals/ProjectModal";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);

  const [me, setMe] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [taskModal, setTaskModal] = useState<{
    open: boolean;
    task?: Task;
    status?: Status;
  }>({ open: false });
  const [projectModal, setProjectModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<"board" | "list">("board");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterAssignee, setFilterAssignee] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    try {
      const data = await apiFetch("/api/projects");
      setProjects(data);
      if (data.length > 0 && !activeProject) setActiveProject(data[0]);
    } catch {}
  }, [activeProject]);

  useEffect(() => {
    if (me) fetchProjects();
  }, [me]);

  // Fetch tasks for active project
  const fetchTasks = useCallback(async () => {
    if (!activeProject) return;
    try {
      const data = await apiFetch(`/api/tasks?project=${activeProject._id}`);
      setTasks(data);
    } catch {}
  }, [activeProject]);

  // Fetch members
  const fetchMembers = useCallback(async () => {
    try {
      const data = await apiFetch("/api/users");
      setMembers(data);
    } catch {}
  }, []);

  useEffect(() => {
    fetchTasks();
    fetchMembers();
  }, [activeProject]);

  // Socket
  useEffect(() => {
    const token = getToken();
    if (!token || !me) return;
    const socket = io(
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001",
      {
        auth: { token },
        transports: ["websocket"],
      },
    );
    socketRef.current = socket;
    socket.on("task_created", (task: Task) =>
      setTasks((prev) => [...prev, task]),
    );
    socket.on("task_updated", (task: Task) =>
      setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t))),
    );
    socket.on("task_deleted", (id: string) =>
      setTasks((prev) => prev.filter((t) => t._id !== id)),
    );
    return () => {
      socket.disconnect();
    };
  }, [me]);

  // Join project room when active project changes
  useEffect(() => {
    if (activeProject)
      socketRef.current?.emit("join_project", activeProject._id);
  }, [activeProject]);

  const handleCreateTask = async (data: Partial<Task>) => {
    try {
      const task = await apiFetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ ...data, project: activeProject?._id }),
      });
      setTasks((prev) => [...prev, task]);
      socketRef.current?.emit("task_created", {
        ...task,
        projectId: activeProject?._id,
      });
      setTaskModal({ open: false });
    } catch {}
  };

  const handleUpdateTask = async (id: string, data: Partial<Task>) => {
    try {
      const task = await apiFetch(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      setTasks((prev) => prev.map((t) => (t._id === id ? task : t)));
      socketRef.current?.emit("task_updated", {
        ...task,
        projectId: activeProject?._id,
      });
      setTaskModal({ open: false });
    } catch {}
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    try {
      await apiFetch(`/api/tasks/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t._id !== id));
      socketRef.current?.emit("task_deleted", {
        id,
        projectId: activeProject?._id,
      });
    } catch {}
  };

  const handleStatusChange = async (id: string, status: Status) => {
    try {
      const task = await apiFetch(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      setTasks((prev) => prev.map((t) => (t._id === id ? task : t)));
      socketRef.current?.emit("task_updated", {
        ...task,
        projectId: activeProject?._id,
      });
    } catch {}
  };

  const handleCreateProject = async (data: {
    name: string;
    description: string;
    color: string;
  }) => {
    try {
      const project = await apiFetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setProjects((prev) => [...prev, project]);
      setActiveProject(project);
      setProjectModal(false);
    } catch {}
  };

  const handleLogout = () => {
    document.cookie = "tm_token=; path=/; max-age=0";
    socketRef.current?.disconnect();
    router.push("/login");
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (filterPriority !== "all" && t.priority !== filterPriority) return false;
    if (filterAssignee !== "all" && t.assignee?._id !== filterAssignee)
      return false;
    if (
      searchQuery &&
      !t.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const tasksByStatus = STATUSES.reduce(
    (acc, s) => {
      acc[s] = filteredTasks.filter((t) => t.status === s);
      return acc;
    },
    {} as Record<Status, Task[]>,
  );

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.status === "done").length,
    inprogress: tasks.filter((t) => t.status === "inprogress").length,
    urgent: tasks.filter((t) => t.priority === "urgent").length,
  };

  if (loading || !me)
    return (
      <div className={styles.loadingPage}>
        <div className={styles.spinner} />
        <p>Loading FlowBoard...</p>
      </div>
    );

  return (
    <div className={styles.layout}>
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        me={me}
        projects={projects}
        activeProject={activeProject}
        open={sidebarOpen}
        onSelectProject={(p) => {
          setActiveProject(p);
          setSidebarOpen(false);
        }}
        onNewProject={() => setProjectModal(true)}
        onLogout={handleLogout}
      />

      <div className={styles.mainWrap}>
        <Topbar
          me={me}
          activeProject={activeProject}
          view={view}
          onViewChange={setView}
          members={members}
          filterPriority={filterPriority}
          onFilterPriority={setFilterPriority}
          filterAssignee={filterAssignee}
          onFilterAssignee={setFilterAssignee}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onMenuClick={() => setSidebarOpen(true)}
          onNewTask={() => setTaskModal({ open: true })}
        />

        <main className={styles.main}>
          {/* Stats */}
          <div className={styles.statsRow}>
            {[
              {
                label: "Total Tasks",
                value: stats.total,
                color: "#8b5cf6",
                icon: "📋",
              },
              {
                label: "In Progress",
                value: stats.inprogress,
                color: "#06b6d4",
                icon: "⚙️",
              },
              {
                label: "Completed",
                value: stats.done,
                color: "#10b981",
                icon: "✅",
              },
              {
                label: "Urgent",
                value: stats.urgent,
                color: "#ef4444",
                icon: "⚡",
              },
            ].map((s) => (
              <div key={s.label} className={styles.statCard}>
                <div className={styles.statTop}>
                  <span className={styles.statIcon}>{s.icon}</span>
                  <span className={styles.statValue} style={{ color: s.color }}>
                    {s.value}
                  </span>
                </div>
                <div className={styles.statLabel}>{s.label}</div>
                <div className={styles.statBar}>
                  <div
                    className={styles.statBarFill}
                    style={{
                      width: `${stats.total ? (s.value / stats.total) * 100 : 0}%`,
                      background: s.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Board */}
          {activeProject ? (
            <KanbanBoard
              tasksByStatus={tasksByStatus}
              me={me}
              view={view}
              onEditTask={(task) => setTaskModal({ open: true, task })}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
              onNewTask={(status) => setTaskModal({ open: true, status })}
            />
          ) : (
            <div className={styles.noProject}>
              <div className={styles.noProjectIcon}>🗂</div>
              <h2 className={styles.noProjectTitle}>No project yet</h2>
              <p className={styles.noProjectSub}>
                Create your first project to start managing tasks
              </p>
              <button
                className={styles.noProjectBtn}
                onClick={() => setProjectModal(true)}
              >
                Create Project
              </button>
            </div>
          )}
        </main>
      </div>

      {taskModal.open && (
        <TaskModal
          task={taskModal.task}
          defaultStatus={taskModal.status}
          members={members}
          me={me}
          onSave={(data) =>
            taskModal.task
              ? handleUpdateTask(taskModal.task._id, data)
              : handleCreateTask(data)
          }
          onClose={() => setTaskModal({ open: false })}
        />
      )}

      {projectModal && (
        <ProjectModal
          onSave={handleCreateProject}
          onClose={() => setProjectModal(false)}
        />
      )}
    </div>
  );
}

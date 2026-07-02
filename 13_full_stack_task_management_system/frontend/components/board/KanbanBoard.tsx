"use client";
import { User, Task, Status } from "@/types";
import { STATUSES, STATUS_CONFIG, PRIORITY_CONFIG } from "@/lib/constants";
import styles from "./KanbanBoard.module.css";

interface Props {
  tasksByStatus: Record<Status, Task[]>;
  me: User;
  view: "board" | "list";
  onEditTask: (t: Task) => void;
  onDeleteTask: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
  onNewTask: (status: Status) => void;
}

function TaskCard({
  task,
  me,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  task: Task;
  me: User;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: Status) => void;
}) {
  const pc = PRIORITY_CONFIG[task.priority];
  const sc = STATUS_CONFIG[task.status];
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "done";

  return (
    <div className={styles.card} onClick={onEdit}>
      {/* Priority bar */}
      <div className={styles.priorityBar} style={{ background: pc.color }} />

      <div className={styles.cardHeader}>
        <span
          className={styles.priorityBadge}
          style={{ background: pc.bg, color: pc.color }}
        >
          {pc.icon} {pc.label}
        </span>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          title="Delete"
        >
          ✕
        </button>
      </div>

      <h3 className={styles.cardTitle}>{task.title}</h3>
      {task.description && (
        <p className={styles.cardDesc}>
          {task.description.slice(0, 80)}
          {task.description.length > 80 ? "..." : ""}
        </p>
      )}

      {task.tags.length > 0 && (
        <div className={styles.tags}>
          {task.tags.slice(0, 3).map((t) => (
            <span key={t} className={styles.tag}>
              #{t}
            </span>
          ))}
        </div>
      )}

      <div className={styles.cardFooter}>
        <div className={styles.footerLeft}>
          {task.assignee && (
            <div className={styles.assigneeWrap} title={task.assignee.name}>
              <div className={styles.assigneeAvatar}>
                {task.assignee.name[0].toUpperCase()}
              </div>
              <span className={styles.assigneeName}>
                {task.assignee.name.split(" ")[0]}
              </span>
            </div>
          )}
          {task.dueDate && (
            <span
              className={`${styles.dueDate} ${isOverdue ? styles.overdue : ""}`}
            >
              {isOverdue ? "⚠️" : "📅"}{" "}
              {new Date(task.dueDate).toLocaleDateString("en", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        {/* Quick status change */}
        <select
          className={styles.statusSelect}
          value={task.status}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            onStatusChange(e.target.value as Status);
          }}
          style={{ color: sc.color }}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_CONFIG[s].label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function KanbanBoard({
  tasksByStatus,
  me,
  view,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onNewTask,
}: Props) {
  if (view === "list") {
    const allTasks = STATUSES.flatMap((s) => tasksByStatus[s]);
    return (
      <div className={styles.listView}>
        <div className={styles.listHeader}>
          <span className={styles.listCol}>Task</span>
          <span className={styles.listCol}>Status</span>
          <span className={styles.listCol}>Priority</span>
          <span className={styles.listCol}>Assignee</span>
          <span className={styles.listCol}>Due Date</span>
          <span className={styles.listCol}>Actions</span>
        </div>
        {allTasks.length === 0 ? (
          <div className={styles.listEmpty}>No tasks yet</div>
        ) : (
          allTasks.map((task) => {
            const sc = STATUS_CONFIG[task.status];
            const pc = PRIORITY_CONFIG[task.priority];
            return (
              <div
                key={task._id}
                className={styles.listRow}
                onClick={() => onEditTask(task)}
              >
                <span className={styles.listTitle}>{task.title}</span>
                <span
                  className={styles.listBadge}
                  style={{ background: sc.bg, color: sc.color }}
                >
                  {sc.label}
                </span>
                <span
                  className={styles.listBadge}
                  style={{ background: pc.bg, color: pc.color }}
                >
                  {pc.icon} {pc.label}
                </span>
                <span className={styles.listCell}>
                  {task.assignee?.name ?? "—"}
                </span>
                <span className={styles.listCell}>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString("en", {
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </span>
                <div
                  className={styles.listActions}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={styles.editBtn}
                    onClick={() => onEditTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.delBtn}
                    onClick={() => onDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  return (
    <div className={styles.board}>
      {STATUSES.map((status) => {
        const sc = STATUS_CONFIG[status];
        const tasks = tasksByStatus[status];
        return (
          <div key={status} className={styles.column}>
            <div className={styles.colHeader}>
              <div className={styles.colLeft}>
                <span
                  className={styles.colDot}
                  style={{ background: sc.color }}
                />
                <span className={styles.colTitle}>{sc.label}</span>
                <span className={styles.colCount}>{tasks.length}</span>
              </div>
              <button
                className={styles.colAddBtn}
                onClick={() => onNewTask(status)}
                title="Add task"
              >
                +
              </button>
            </div>

            <div className={styles.taskList}>
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  me={me}
                  onEdit={() => onEditTask(task)}
                  onDelete={() => onDeleteTask(task._id)}
                  onStatusChange={(s) => onStatusChange(task._id, s)}
                />
              ))}
              {tasks.length === 0 && (
                <div className={styles.emptyCol}>
                  <p>No tasks</p>
                </div>
              )}
              <button
                className={styles.addTaskBtn}
                onClick={() => onNewTask(status)}
              >
                + Add task
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

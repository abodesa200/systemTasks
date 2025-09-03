import { initialColumns } from "@/modules/data";
import { useMemo, useState } from "react";
import { Column, Task } from "../types";

export function useTasks() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [newTaskColumnId, setNewTaskColumnId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // map filter to column ids
  const getColumnIdFromFilter = (filter: string): string[] => {
    switch (filter) {
      case "todo":
        return ["todo"];
      case "progress":
        return ["progress"];
      case "review":
        return ["review"];
      case "completed":
        return ["completed"];
      case "all":
      default:
        return ["todo", "progress", "review", "completed"];
    }
  };

  // فلترة الأعمدة
  const filteredColumns = useMemo(() => {
    if (activeFilter === "all") return columns;
    const allowed = getColumnIdFromFilter(activeFilter);
    return columns.filter((col) => allowed.includes(col.id));
  }, [columns, activeFilter]);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("هل أنت متأكد من حذف هذه المهمة؟")) {
      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          tasks: col.tasks.filter((task) => task.id !== taskId),
        }))
      );
    }
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (editingTask) {
        // تحديث مهمة موجودة
        const res = await fetch(`/api/tasks/${editingTask.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });
        if (!res.ok) throw new Error("فشل في تحديث المهمة");
        const updatedTask = await res.json();

        setColumns((prev) =>
          prev.map((col) => ({
            ...col,
            tasks: col.tasks.map((t) =>
              t.id === editingTask.id ? { ...t, ...updatedTask } : t
            ),
          }))
        );
      } else if (newTaskColumnId) {
        // إنشاء مهمة جديدة
        const newTaskData = {
          ...(taskData as Omit<Task, "id" | "status">),
          status: newTaskColumnId,
          assignees: [],
          tags: [],
          progress: 0,
          comments: 0,
          attachments: 0,
          createdAt: new Date().toISOString().split("T")[0],
          spentHours: 0,
        };

        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTaskData),
        });
        if (!res.ok) throw new Error("فشل في إنشاء المهمة");
        const newTask = await res.json();

        setColumns((prev) =>
          prev.map((col) =>
            col.id === newTaskColumnId
              ? { ...col, tasks: [...col.tasks, newTask] }
              : col
          )
        );
      }
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  return {
    columns,
    filteredColumns,
    editingTask,
    isTaskDialogOpen,
    newTaskColumnId,
    activeFilter,
    setActiveFilter,
    setIsTaskDialogOpen,
    setEditingTask,
    setNewTaskColumnId,
    handleEditTask,
    handleDeleteTask,
    setColumns,
    handleSaveTask,
  };
}

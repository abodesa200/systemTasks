
export const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A"; 
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getDaysUntilDue = (dueDate?: string) => {
  if (!dueDate) return 0; // أو أي قيمة مناسبة
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
export const getProgressColor = (progress: number): string => {
  if (progress < 30) return "bg-red-500";
  if (progress < 70) return "bg-amber-500";
  return "bg-emerald-500";
};
export const getPriorityText = (priority?: "high" | "medium" | "low") => {
  const priorityMap = {
    high: "High",
    medium: "Medium",
    low: "Low",
  };
  return priorityMap[priority ?? "low"];
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const calculateColumnStats = (tasks: Task[]) => {
  const totalTasks = tasks.length;
  const completionRate =
    totalTasks > 0
      ? Math.round(
          tasks.reduce((sum, task) => sum + task.progress, 0) / totalTasks
        )
      : 0;
  const totalEstimatedHours = tasks.reduce(
    (sum, task) => sum + (task.estimatedHours || 0),
    0
  );
  const totalSpentHours = tasks.reduce(
    (sum, task) => sum + (task.spentHours || 0),
    0
  );

  return {
    totalTasks,
    completionRate,
    totalEstimatedHours,
    totalSpentHours,
  };
};
export const getPriorityColor = (priority: string): string => {
  const colorMap = {
    high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    medium:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    low: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  };
  return colorMap[priority as keyof typeof colorMap] || colorMap.low;
};
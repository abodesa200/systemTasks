// modules/projects/utils/projectHelpers.ts
import { Project } from "../types/categriesTypes";

export const getStatusText = (status: string): string => {
  const statusMap = {
    planning: "في التخطيط",
    active: "نشط",
    "on-hold": "معلق",
    completed: "مكتمل",
  };
  return statusMap[status as keyof typeof statusMap] || status;
};

export const getPriorityText = (priority: string): string => {
  const priorityMap = {
    high: "عالية",
    medium: "متوسطة",
    low: "منخفضة",
  };
  return priorityMap[priority as keyof typeof priorityMap] || priority;
};

export const getStatusColor = (status: string): string => {
  const statusColors = {
    planning: "bg-gray-100 text-gray-800",
    active: "bg-emerald-100 text-emerald-800",
    "on-hold": "bg-amber-100 text-amber-800",
    completed: "bg-green-100 text-green-800",
  };
  return (
    statusColors[status as keyof typeof statusColors] ||
    "bg-gray-100 text-gray-800"
  );
};

export const getPriorityColor = (priority: string): string => {
  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-blue-100 text-blue-800",
  };
  return (
    priorityColors[priority as keyof typeof priorityColors] ||
    "bg-gray-100 text-gray-800"
  );
};

export const calculateStats = (projects: Project[]) => {
  const total = projects.length;
  const active = projects.filter((p) => p.status === "active").length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const avgProgress =
    total > 0
      ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / total)
      : 0;

  return { total, active, completed, avgProgress };
};

export const filterProjects = (
  projects: Project[],
  searchTerm: string,
  filterStatus: string,
  filterPriority: string
): Project[] => {
  return projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || project.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });
};

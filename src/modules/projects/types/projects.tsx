// modules/projects/types/project.ts
export interface Project {
  id: string;
  name: string;
  description: string;
  status: "planning" | "active" | "on-hold" | "completed";
  priority: "high" | "medium" | "low";
  progress: number;
  tasksCount: number;
  completedTasks: number;
}

export type ProjectStatus = Project["status"];
export type ProjectPriority = Project["priority"];

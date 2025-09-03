export type TaskStatus = "todo" | "in_progress" | "done" | "blocked"; // مثال، عدّل حسب مشروعك

export interface Assignee {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  role?: string;
}

export interface Watcher {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Dependency {
  id: string;
  title: string;
  status: TaskStatus;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  assignee?: string;
}

export interface TimeEntry {
  id: string;
  date: string;
  hours: number;
  description: string;
  user: string;
}

export interface Budget {
  allocated: number;
  spent: number;
  currency: string;
}

export interface Risk {
  id: string;
  description: string;
  severity: "low" | "medium" | "high";
  mitigation: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignees?: Assignee[];
  watchers?: Watcher[];
  tags?: Tag[];
  progress: number;
  comments: number;
  attachments: number;
  createdAt: string;
  updatedAt?: string;
  spentHours?: number;
  dueDate?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  project?: string;
  client?: string;
  estimatedHours?: number;
  dependencies?: Dependency[];
  subtasks?: Subtask[];
  timeEntries?: TimeEntry[];
  budget?: Budget[];
  completionCriteria?: string[];
  risks?: Risk[];
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

export interface TaskCardProps {
  task: Task;
  onDragStart: (taskId: string, e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onArchive?: (taskId: string) => void;
}

export interface UseAddOrUpdateTaskProps {
  task: Task | null;
  onClose: () => void;
}
export interface TaskDialogProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

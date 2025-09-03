// modules/timesheets/types/timeEntry.ts
export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface TimeEntry {
  id: string;
  user: User;
  task: string;
  project: string;
  startTime: string;
  endTime: string;
  date: string;
  type: "Timer Tracked" | "Added Manually";
  invoiced: boolean;
  totalHours: number;
  status: "active" | "completed" | "paused";
}

export type EntryType = TimeEntry["type"];
export type EntryStatus = TimeEntry["status"];

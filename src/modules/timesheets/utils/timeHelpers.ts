// modules/timesheets/utils/timeHelpers.ts
import { TimeEntry } from "../types/timeEntry";

export const formatTime = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

export const calculateStats = (entries: TimeEntry[]) => {
  const totalHours = entries.reduce((sum, entry) => sum + entry.totalHours, 0);
  const invoicedHours = entries
    .filter((e) => e.invoiced)
    .reduce((sum, entry) => sum + entry.totalHours, 0);
  const notInvoicedHours = totalHours - invoicedHours;

  return {
    totalHours: totalHours.toFixed(2),
    invoicedHours: invoicedHours.toFixed(2),
    notInvoicedHours: notInvoicedHours.toFixed(2),
  };
};

export const filterEntries = (
  entries: TimeEntry[],
  searchTerm: string,
  filterType: string,
  filterStatus: string
): TimeEntry[] => {
  return entries.filter((entry) => {
    const matchesSearch =
      entry.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.user.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" ||
      (filterType === "timer" && entry.type === "Timer Tracked") ||
      (filterType === "manual" && entry.type === "Added Manually");

    const matchesStatus =
      filterStatus === "all" || entry.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });
};

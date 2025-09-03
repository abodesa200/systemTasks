// modules/timesheets/hooks/useTimeEntries.ts
import { useState, useMemo } from "react";
import { TimeEntry } from "../types/timeEntry";
import { calculateStats, filterEntries } from "../utils/timeHelpers";

export const useTimeEntries = (initialEntries: TimeEntry[]) => {
  const [entries, setEntries] = useState<TimeEntry[]>(initialEntries);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const stats = useMemo(() => calculateStats(entries), [entries]);

  const filteredEntries = useMemo(
    () => filterEntries(entries, searchTerm, filterType, filterStatus),
    [entries, searchTerm, filterType, filterStatus]
  );

  return {
    entries,
    setEntries,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    stats,
    filteredEntries,
  };
};

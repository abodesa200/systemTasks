// modules/projects/hooks/useProjects.ts
import { useState, useMemo } from "react";
import { Project } from "../types/projects";
import { calculateStats, filterProjects } from "../utils/projectHelpers";

export const useProjects = (initialProjects: Project[]) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const stats = useMemo(() => calculateStats(projects), [projects]);

  const filteredProjects = useMemo(
    () => filterProjects(projects, searchTerm, filterStatus, filterPriority),
    [projects, searchTerm, filterStatus, filterPriority]
  );

  return {
    projects,
    setProjects,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    stats,
    filteredProjects,
  };
};

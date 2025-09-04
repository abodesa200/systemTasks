import { useMemo, useState } from "react";
import { UserType } from "../types/usersType";
import { calculateStats, filterData } from "../utils/clientHelpers";

export const useUsers = <T extends UserType>(
  initialData: T[],
  type: "CLIENTS" | "USERS"
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const stats = useMemo(() => calculateStats(data, type), [data, type]);

  const filtered = useMemo(
    () => filterData(data, searchTerm, filterType, filterStatus, type),
    [data, searchTerm, filterType, filterStatus, type]
  );

  return {
    data,
    setData,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    viewMode,
    setViewMode,
    stats,
    filtered,
  };
};

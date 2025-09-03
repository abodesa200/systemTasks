"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TimeSheetsStats } from "../../components/TimeSheetsStats";
import { TimeSheetsFilters } from "../../components/TimeSheetsFilters";
import { TimeEntryTable } from "../../components/TimeEntryTable";
import { useTimeEntries } from "../../hooks/useTimeEntries";
import { TimeEntry } from "../../types/timeEntry";
import { Suspense } from "react";

interface TimeTrackingBoardProps {
  initialEntries: TimeEntry[];
}

export const TimeTrackingBoard = ({
  initialEntries,
}: TimeTrackingBoardProps) => {
  const {
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
  } = useTimeEntries(initialEntries);

  const handleEdit = (entry: TimeEntry) => {
    // Logic for editing an entry
    console.log("Edit entry:", entry);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              status: currentStatus === "active" ? "paused" : "active",
            }
          : entry
      )
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Statistics Cards */}
        <Suspense fallback={<div>Loading...</div>}>
          <TimeSheetsStats stats={stats} />
        </Suspense>

        {/* Filters and Search */}
        <Suspense fallback={<div>Loading...</div>}>
          <Card>
            <CardContent className="p-6">
              <TimeSheetsFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterType={filterType}
                onFilterTypeChange={setFilterType}
                filterStatus={filterStatus}
                onFilterStatusChange={setFilterStatus}
              />
            </CardContent>
          </Card>
        </Suspense>

        {/* Time Entries Table */}
        <Suspense fallback={<div>Loading...</div>}>
          <Card className="backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-200 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  Time Entries{" "}
                  <Badge className="bg-slate-700 text-slate-300">
                    {filteredEntries.length} entries
                  </Badge>
                </CardTitle>

                <Button variant={"maincolor"}>
                  <Plus className="w-4 h-4 mr-2" />
                  New task
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <TimeEntryTable
                entries={filteredEntries}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            </CardContent>
          </Card>
        </Suspense>
      </div>
    </div>
  );
};

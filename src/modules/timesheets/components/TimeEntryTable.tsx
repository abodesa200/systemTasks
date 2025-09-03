// modules/timesheets/components/TimeEntryTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Plus, Edit, Trash2, Pause, Play, Calendar, User, CheckCircle, Timer } from "lucide-react";
import { TimeEntry } from "../types/timeEntry";
import { formatTime } from "../utils/timeHelpers";

interface TimeEntryTableProps {
  entries: TimeEntry[];
  onEdit: (entry: TimeEntry) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: string) => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          Active
        </Badge>
      );
    case "paused":
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          Paused
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
          Completed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getTypeBadge = (type: string) => {
  return type === "Timer Tracked" ? (
    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
      <Timer className="w-3 h-3 mr-1" />
      Timer Tracked
    </Badge>
  ) : (
    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
      <Edit className="w-3 h-3 mr-1" />
      Added Manually
    </Badge>
  );
};

export const TimeEntryTable = ({
  entries,
  onEdit,
  onDelete,
  onToggleStatus,
}: TimeEntryTableProps) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-slate-700/50 rounded-full flex items-center justify-center">
          <Clock className="w-12 h-12 text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-300 mb-2">
          No time entries found
        </h3>
        <p className="text-slate-500 mb-6">
          Start tracking your time or adjust your filters
        </p>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add First Entry
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700/50 hover:bg-slate-700/20">
            <TableHead className="text-slate-300">
              <div className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                User
              </div>
            </TableHead>
            <TableHead className="text-slate-300 font-semibold">Task</TableHead>
            <TableHead className="text-slate-300 font-semibold">
              status
            </TableHead>
            <TableHead className="text-slate-300 font-semibold">
              Project
            </TableHead>
            <TableHead className="text-slate-300 font-semibold">
              Start Time
            </TableHead>
            <TableHead className="text-slate-300 font-semibold">
              End Time
            </TableHead>
            <TableHead className="text-slate-300">
              <div className="flex items-center gap-2 justify-center">
                <Calendar className="w-4 h-4" />
                Date
              </div>
            </TableHead>
            <TableHead className="text-slate-300 font-semibold">Type</TableHead>
            <TableHead className="text-slate-300 font-semibold">
              Invoiced
            </TableHead>
            <TableHead className="text-slate-300 font-semibold">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time
              </div>
            </TableHead>
            <TableHead className="text-slate-300 font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {entries.map((entry) => (
            <TableRow
              key={entry.id}
              className="border-slate-700/30 hover:bg-slate-700/20 transition-all duration-200 group"
            >
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8 ring-2 ring-cyan-500/30">
                    <AvatarImage src={entry.user.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm">
                      {entry.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-slate-200">{entry.user.name}</span>
                </div>
              </TableCell>

              <TableCell className="py-4">
                <span className="text-slate-300">{entry.task}</span>
              </TableCell>

              <TableCell className="py-4">
                {getStatusBadge(entry.status)}
              </TableCell>

              <TableCell className="py-4">
                <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors">
                  {entry.project}
                </span>
              </TableCell>

              <TableCell className="py-4">
                <span className="text-slate-300 font-mono text-xs">
                  {entry.startTime}
                </span>
              </TableCell>

              <TableCell className="py-4">
                <span className="text-slate-300 font-mono text-xs">
                  {entry.endTime}
                </span>
              </TableCell>

              <TableCell className="py-4">
                <span className="text-slate-300">{entry.date}</span>
              </TableCell>

              <TableCell className="py-4">{getTypeBadge(entry.type)}</TableCell>

              <TableCell className="py-4">
                {entry.invoiced ? (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Invoiced
                  </Badge>
                ) : (
                  <Badge className="bg-slate-600/50 text-slate-400 border-slate-600">
                    Not Invoiced
                  </Badge>
                )}
              </TableCell>

              <TableCell className="py-4">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          100,
                          (entry.totalHours / 8) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="text-slate-200 font-mono text-xs">
                    {formatTime(entry.totalHours)}
                  </span>
                </div>
              </TableCell>

              <TableCell className="py-4">
                <div className="flex items-center gap-1 transition-opacity duration-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-cyan-500/20 hover:text-cyan-400"
                    onClick={() => onEdit(entry)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400"
                    onClick={() => onDelete(entry.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  {entry.status === "active" ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-yellow-500/20 hover:text-yellow-400"
                      onClick={() => onToggleStatus(entry.id, entry.status)}
                    >
                      <Pause className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-green-500/20 hover:text-green-400"
                      onClick={() => onToggleStatus(entry.id, entry.status)}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

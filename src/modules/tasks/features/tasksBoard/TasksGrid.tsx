// "use client";
// import { Clock, MoreHorizontal } from "lucide-react";
// import { Badge } from "../../../ui/badge";
// import { Button } from "../../../ui/button";
// import { Card, CardContent, CardHeader } from "../../../ui/card";
// import { Progress } from "../../../ui/progress";
// import { TaskCard } from "../../components/TaskCard";

// interface TasksGridProps {
//   column: any;
//   onDragStart: (taskId: string) => void;
//   onDrop: (columnId: string) => void;
//   onEditTask: (task: any) => void;
//   onDeleteTask: (taskId: string) => void;
// }

// export function TasksGrid({
//   column,
//   onDragStart,
//   onDrop,
//   onEditTask,
//   onDeleteTask,
// }: TasksGridProps) {
//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     onDrop(column.id);
//   };

//   const completionRate =
//     column.tasks.length > 0
//       ? Math.round(
//           column.tasks.reduce((sum, task) => sum + task.progress, 0) /
//             column.tasks.length
//         )
//       : 0;
//   const totalEstimatedHours = column.tasks.reduce(
//     (sum, task) => sum + (task.estimatedHours || 0),
//     0
//   );
//   const totalSpentHours = column.tasks.reduce(
//     (sum, task) => sum + (task.spentHours || 0),
//     0
//   );

//   return (
//     <div className="w-full h-full">
//       <Card
//         onDragOver={handleDragOver}
//         className="h-full"
//         onDrop={handleDrop}
//         data-column-id={column.id}
//       >
//         <CardHeader className="pb-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <h2 className="font-semibold text-foreground">{column.title}</h2>
//               <Badge variant="secondary" className="text-xs">
//                 {column.tasks.length}
//               </Badge>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-8 w-8 text-muted-foreground hover:text-foreground"
//             >
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </div>

//           <div className="space-y-2">
//             <div className="flex items-center gap-2 justify-between text-xs text-muted-foreground">
//               <Progress value={completionRate} className="h-2">
//                 <div
//                   className={`h-full transition-all rounded-full ${
//                     completionRate < 30
//                       ? "bg-rose-500"
//                       : completionRate < 70
//                       ? "bg-amber-500"
//                       : "bg-[#00c4b4]"
//                   }`}
//                   style={{ width: `${completionRate}%` }}
//                 />
//               </Progress>
//               <span>{completionRate}%</span>
//             </div>

//             <div className="flex items-center justify-between text-xs text-muted-foreground">
//               <div className="flex items-center gap-1">
//                 <Clock className="w-3 h-3" />
//                 <span>
//                   {totalSpentHours}h / {totalEstimatedHours}h
//                 </span>
//               </div>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent className="">
//           <div className="space-y-3">
//             {column.tasks.map((task: any) => (
//               <TaskCard
//                 key={task.id}
//                 task={task}
//                 onDragStart={onDragStart}
//                 onEdit={onEditTask}
//                 onDelete={onDeleteTask}
//                 onArchive={() => console.log("sk")}
//               />
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, MoreHorizontal } from "lucide-react";
import React, { useCallback } from "react";
import { TaskCard } from "../../components/TaskCard";
import { Column, Task } from "../../types";
import { calculateColumnStats } from "../../utils/taskHelpers";
import { ProgressBar } from "./ProgressBar";

interface TasksGridProps {
  column: Column;
  onDragStart: (taskId: string) => void;
  onDrop: (columnId: string, taskId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TasksGrid = React.memo(
  ({
    column,
    onDragStart,
    onDrop,
    onEditTask,
    onDeleteTask,
  }: TasksGridProps) => {
    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        const draggedTaskId = e.dataTransfer.getData("text/plain");
        if (draggedTaskId) {
          onDrop(column.id, draggedTaskId);
        }
      },
      [onDrop, column.id]
    );

    const handleArchive = useCallback((taskId: string) => {
      // console.log("Archive task:", taskId);
    }, []);

    const stats = calculateColumnStats(column.tasks);

    return (
      <div className="w-full h-full">
        <Card
          onDragOver={handleDragOver}
          className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-colors hover:border-primary/20"
          onDrop={handleDrop}
          data-column-id={column.id}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-foreground text-balance">
                  {column.title}
                </h2>
                <Badge variant="secondary" className="text-xs font-medium">
                  {stats.totalTasks}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                aria-label="Column options"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Column Statistics */}
            <div className="space-y-3">
              <ProgressBar
                value={stats.completionRate}
                showPercentage
                className="text-xs text-muted-foreground"
              />

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>
                    {stats.totalSpentHours}h / {stats.totalEstimatedHours}h
                  </span>
                </div>
                <span className="text-xs">
                  {stats.totalEstimatedHours > 0
                    ? Math.round(
                        (stats.totalSpentHours / stats.totalEstimatedHours) *
                          100
                      )
                    : 0}
                  % utilized
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={onDragStart}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onArchive={handleArchive}
              />
            ))}
            {column.tasks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No tasks in this column</p>
                <p className="text-xs mt-1">Drop tasks here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
);

TasksGrid.displayName = "TasksGrid";

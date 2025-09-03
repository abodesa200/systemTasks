// "use client";
// import {
//   Building,
//   Calendar,
//   Clock,
//   Edit,
//   Folder,
//   MessageSquare,
//   Paperclip,
//   Trash2,
//   UserCircle,
// } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import TaskDetails from "../features/taskDetails/TaskDetails";
// import { Task, TaskCardProps } from "../types";
// import {
//   formatDate,
//   getDaysUntilDue,
//   getPriorityText,
// } from "../utils/taskHelpers";

// export function TaskCard({
//   task,
//   onDragStart,
//   onDragEnd,
//   onEdit,
//   onDelete,
//   onArchive,
// }: TaskCardProps) {
//   const [showDetails, setShowDetails] = useState(false);

//   const handleDragStart = (e: React.DragEvent) => {
//     onDragStart(task.id, e);
//     e.dataTransfer.effectAllowed = "move";
//     e.dataTransfer.setData("text/plain", task.id);
//   };

//   const daysUntilDue = getDaysUntilDue(task.dueDate);
//   const isOverdue = daysUntilDue < 0;
//   const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

  // const taskWithDetails: Task = {
  //   ...task,
  //   status: task.status || "In Progress",
  //   createdAt: task.createdAt || task.dueDate || new Date().toISOString(),
  //   // updatedDate: task.createdAt || new Date().toISOString(),
  // };

//   const handleCardClick = (e: React.MouseEvent) => {
//     if ((e.target as HTMLElement).closest("button")) {
//       return;
//     }
//     setShowDetails(true);
//   };

//   return (
//     <>
//       <div
//         className={`mb-3 cursor-grab hover:shadow-lg transition-all duration-300 
//           bg-white dark:bg-zinc-800/90 rounded-xl border border-gray-200 dark:border-zinc-700
//           group relative overflow-hidden hover:cursor-pointer
//         `}
//         draggable
//         onDragStart={handleDragStart}
//         onDragEnd={onDragEnd}
//         onClick={handleCardClick}
//       >
//         <div className="p-3 pb-2 pr-3 ml-1">
//           <div className="flex items-start justify-between">
//             <h1
//               className="font-semibold text-[16px] leading-tight
//                text-gray-900 dark:text-gray-100 cursor-pointer
//                  pr-1"
//             >
//               {task.title}
//             </h1>
//             <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
//               <button
//                 className="h-6 w-6 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md flex items-center justify-center transition-colors"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onEdit(task);
//                 }}
//                 aria-label="Edit task"
//               >
//                 <Edit className="w-4 h-4" />
//               </button>
//               <button
//                 className="h-6 w-6 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md flex items-center justify-center transition-colors"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onDelete(task.id);
//                 }}
//                 aria-label="Delete task"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           <div className="text-xs text-gray-500 flex justify-between  items-center dark:text-gray-400 space-y-1 mt-2">
//             <div className="">
//               <div className="flex items-center gap-1">
//                 <Folder className="w-3 h-3" />
//                 <span>{task.project}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Building className="w-3 h-3" />
//                 <span>Client: {task.client}</span>
//               </div>
//             </div>
//             <div
//               className={`text-xs px-2 py-1 rounded-full  ${
//                 task.priority === "high"
//                   ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
//                   : task.priority === "medium"
//                   ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
//                   : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
//               }`}
//             >
//               {getPriorityText(task.priority)}
//             </div>
//           </div>
//         </div>

//         <div className="pt-0 px-4 pb-4 ml-1">
//           <div className="space-y-3">
//             <div className="flex items-center justify-between text-xs">
//               <div
//                 className={`flex items-center gap-1 ${
//                   isOverdue
//                     ? "text-red-600 dark:text-red-400"
//                     : isDueSoon
//                     ? "text-amber-600 dark:text-amber-400"
//                     : "text-gray-500 dark:text-gray-400"
//                 }`}
//               >
//                 <Calendar className="w-3 h-3" />
//                 <span>{formatDate(task.dueDate)}</span>
//                 {isOverdue && (
//                   <span className="font-medium">
//                     (Overdue by {Math.abs(daysUntilDue)} days)
//                   </span>
//                 )}
//                 {isDueSoon && (
//                   <span className="font-medium">
//                     (Due in {daysUntilDue} days)
//                   </span>
//                 )}
//               </div>
//             </div>

//             {task.tags && task.tags.length > 0 && (
//               <div className="flex flex-wrap gap-1">
//                 {task.tags.map((tag) => (
//                   <span
//                     key={tag.id}
//                     className={`text-xs px-2 py-1 rounded-full border bg-gray-100 dark:bg-zinc-700/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-zinc-600`}
//                   >
//                     {tag.name}
//                   </span>
//                 ))}
//               </div>
//             )}

//             <div className="space-y-2">
//               <div className="flex items-center justify-between text-xs">
//                 <span className="text-gray-500 dark:text-gray-400">
//                   Progress
//                 </span>
//                 <span className="font-medium text-gray-900 dark:text-gray-100">
//                   {task.progress}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
//                 <div
//                   className={`h-full rounded-full transition-all ${
//                     task.progress < 30
//                       ? "bg-red-500"
//                       : task.progress < 70
//                       ? "bg-amber-500"
//                       : "bg-emerald-500"
//                   }`}
//                   style={{ width: `${task.progress}%` }}
//                 />
//               </div>
//             </div>

//             {/* Time information */}
//             <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
//               <div className="flex items-center gap-1">
//                 <Clock className="w-3 h-3" />
//                 <span>
//                   {task.spentHours}h / {task.estimatedHours}h
//                 </span>
//               </div>
//               <div className="text-xs">
//                 {Math.round((task.spentHours / task.estimatedHours) * 100)}% of
//                 estimated time
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
//                   <MessageSquare className="w-3 h-3" />
//                   <span>{task.comments}</span>
//                 </div>
//                 <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
//                   <Paperclip className="w-3 h-3" />
//                   <span>{task.attachments}</span>
//                 </div>
//               </div>
//               {task.assignees && task.assignees.length > 0 && (
//                 <div className="flex -space-x-2">
//                   {task.assignees.map((assignee) => (
//                     <div
//                       key={assignee.id}
//                       className="w-7 h-7 relative rounded-full border-2 border-white dark:border-zinc-800 bg-gray-200 dark:bg-zinc-600 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 overflow-hidden shadow-sm"
//                     >
//                       {assignee.avatar ? (
//                         <Image
//                           src={assignee.avatar}
//                           alt={assignee.initials}
//                           fill
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <UserCircle className="w-5 h-5" />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Task Details Dialog */}
      // <TaskDetails
      //   task={taskWithDetails}
      //   isOpen={showDetails}
      //   onClose={() => setShowDetails(false)}
      //   onEdit={onEdit}
      //   onDelete={onDelete}
      //   onArchive={onArchive}
      // />
//     </>
//   );
// }

"use client";
import {
  Building,
  Calendar,
  Clock,
  Edit,
  Folder,
  MessageSquare,
  Paperclip,
  Trash2,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import { TaskCardProps } from "../types";
import { formatDate, getDaysUntilDue, getPriorityColor, getPriorityText } from "../utils/taskHelpers";
import { ProgressBar } from "../features/tasksBoard/ProgressBar";
import TaskDetails from "../features/taskDetails/TaskDetails";


export const TaskCard = React.memo(
  ({
    task,
    onDragStart,
    onDragEnd,
    onEdit,
    onDelete,
    onArchive,
  }: TaskCardProps) => {
    const [showDetails, setShowDetails] = useState(false);
 const taskWithDetails: Task = {
   ...task,
   status: task.status || "In Progress",
   createdAt: task.createdAt || task.dueDate || new Date().toISOString(),
   // updatedDate: task.createdAt || new Date().toISOString(),
 };
    const handleDragStart = useCallback(
      (e: React.DragEvent) => {
        onDragStart(task.id);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", task.id);
      },
      [onDragStart, task.id]
    );

    const handleEdit = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(task);
      },
      [onEdit, task]
    );

    const handleDelete = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(task.id);
      },
      [onDelete, task.id]
    );

    const handleCardClick = useCallback((e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) {
        return;
      }
      setShowDetails(true);
    }, []);

    const daysUntilDue = getDaysUntilDue(task.dueDate);
    const isOverdue = daysUntilDue < 0;
    const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;
    const timeUtilization = Math.round(
      (task.spentHours / task.estimatedHours) * 100
    );

    return (
      <div
        className="mb-3 cursor-grab hover:shadow-lg transition-all duration-300 
        bg-card rounded-xl border border-border
        group relative overflow-hidden hover:cursor-pointer
        hover:border-primary/20 hover:shadow-primary/5 active:cursor-grabbing"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        aria-label={`Task: ${task.title}`}
      >
        {/* Header */}
        <div className="p-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-base leading-tight text-foreground pr-1 text-balance">
              {task.title}
            </h3>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 shrink-0">
              <button
                className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md flex items-center justify-center transition-colors"
                onClick={handleEdit}
                aria-label="Edit task"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md flex items-center justify-center transition-colors"
                onClick={handleDelete}
                aria-label="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Project and Client Info */}
          <div className="flex justify-between items-start mt-3 gap-2">
            <div className="text-xs text-muted-foreground space-y-1 flex-1">
              <div className="flex items-center gap-1">
                <Folder className="w-3 h-3 shrink-0" />
                <span className="truncate">{task.project}</span>
              </div>
              <div className="flex items-center gap-1">
                <Building className="w-3 h-3 shrink-0" />
                <span className="truncate">Client: {task.client}</span>
              </div>
            </div>
            <div
              className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${getPriorityColor(
                task.priority
              )}`}
            >
              {getPriorityText(task.priority)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-4">
          <div className="space-y-3">
            {/* Due Date */}
            <div className="flex items-center justify-between text-xs">
              <div
                className={`flex items-center gap-1 ${
                  isOverdue
                    ? "text-destructive"
                    : isDueSoon
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-muted-foreground"
                }`}
              >
                <Calendar className="w-3 h-3" />
                <span>{formatDate(task.dueDate)}</span>
                {isOverdue && (
                  <span className="font-medium">
                    (Overdue by {Math.abs(daysUntilDue)} days)
                  </span>
                )}
                {isDueSoon && (
                  <span className="font-medium">
                    (Due in {daysUntilDue} days)
                  </span>
                )}
              </div>
            </div>

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground border"
                  >
                    {tag.name}
                  </span>
                ))}
                {task.tags.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    +{task.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">
                  {task.progress}%
                </span>
              </div>
              <ProgressBar value={task.progress} />
            </div>

            {/* Time Information */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>
                  {task.spentHours}h / {task.estimatedHours}h
                </span>
              </div>
              <div
                className={`text-xs ${
                  timeUtilization > 100 ? "text-destructive" : ""
                }`}
              >
                {timeUtilization}% of estimated
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="w-3 h-3" />
                  <span>{task.comments}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Paperclip className="w-3 h-3" />
                  <span>{task.attachments}</span>
                </div>
              </div>

              {/* Assignees */}
              {task.assignees && task.assignees.length > 0 && (
                <div className="flex -space-x-2">
                  {task.assignees.slice(0, 3).map((assignee) => (
                    <div
                      key={assignee.id}
                      className="w-7 h-7 relative rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs text-muted-foreground overflow-hidden shadow-sm"
                      title={assignee.name}
                    >
                      {assignee.avatar ? (
                        <Image
                          src={assignee.avatar || ""}
                          alt={assignee.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <UserCircle className="w-5 h-5" />
                      )}
                    </div>
                  ))}
                  {task.assignees.length > 3 && (
                    <div className="w-7 h-7 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs text-muted-foreground">
                      +{task.assignees.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <TaskDetails
          task={taskWithDetails}
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      </div>
    );
  }
);

TaskCard.displayName = "TaskCard";

// "use client";
// import { Button } from "@/components/ui/button";
// import { LayoutDashboard, List, Plus } from "lucide-react";
// import { useState } from "react";
// import { CustomSelect } from "../../../CustomSelect";
// import SearchBar from "../../../ui/Search";
// import { useDragAndDrop } from "../../hook/useDragAndDrop";
// import { useTasks } from "../../hook/useTasks";
// import { AddOrUpdateTask } from "../addOrUpdateTask/AddOrUpdateTask";
// import { TasksGrid } from "./TasksGrid";

// export default function TasksBoard() {
//   const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

//   const {
//     filteredColumns,
//     editingTask,
//     isTaskDialogOpen,
//     setIsTaskDialogOpen,
//     setEditingTask,
//     setNewTaskColumnId,
//     activeFilter,
//     setActiveFilter,
//     handleEditTask,
//     setColumns,
//     handleDeleteTask,
//   } = useTasks();

//   const { handleDragStart, handleDrop } = useDragAndDrop(setColumns);

//   const statusOptions = [
//     { value: "all", label: "all" },
//     { value: "todo", label: "todo" },
//     { value: "progress", label: "progress " },
//     { value: "review", label: "review" },
//     { value: "completed", label: "completed" },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between w-full gap-4">
//         {/* filter */}
//         <div className="flex items-center gap-4 w-[40%]">
// <CustomSelect
//   placeholder="اختر الحالة"
//   options={statusOptions}
//   value={activeFilter}
//   onValueChange={setActiveFilter}
//   className="w-full"
// />
//           <SearchBar />
//         </div>

//         {/* View Mode Toggle */}
//         <div className="flex items-center gap-4">
//           <div className="flex items-center space-x-2 bg-zinc-800 p-1 rounded-lg">
//             <Button
//               onClick={() => setViewMode("kanban")}
//               variant="ghost"
//               size="icon"
//               className={`h-8 w-8 transition-all ${
//                 viewMode === "kanban"
//                   ? "bg-gradient-to-r from-[#00c4b4] to-[#00a69c] text-white"
//                   : "text-zinc-400 hover:text-white"
//               }`}
//               title="Kanban View"
//             >
//               <LayoutDashboard className="w-4 h-4" />
//             </Button>
//             <Button
//               onClick={() => setViewMode("list")}
//               variant="ghost"
//               size="icon"
//               className={`h-8 w-8 transition-all ${
//                 viewMode === "list"
//                   ? "bg-gradient-to-r from-[#00c4b4] to-[#00a69c] text-white"
//                   : "text-zinc-400 hover:text-white"
//               }`}
//               title="List View"
//             >
//               <List className="w-4 h-4" />
//             </Button>
//           </div>
//           <Button
//             size="lg"
//             variant="maincolor"
//             onClick={() => setIsTaskDialogOpen(true)}
//           >
//             <Plus className="w-4 h-4 text-white" />
//             <span className="text-white text-sm font-medium">New Task</span>
//           </Button>
//         </div>
//       </div>

//       {/* Grid View */}
//       <div className="mx-auto overflow-x-auto pb-6">
//         <div
//           className={`${
//             viewMode === "kanban" ? "flex" : "grid grid-cols-1"
//           } gap-4 overflow-auto min-w-max`}
//         >
//           {filteredColumns.map((column) => (
//             <div
//               key={column.id}
//               className={`${viewMode === "kanban" ? "w-80" : "w-full"} `}
//             >
//               <TasksGrid
//                 column={column}
//                 onEditTask={handleEditTask}
//                 onDeleteTask={handleDeleteTask}
//                 onDragStart={handleDragStart}
//                 onDrop={handleDrop}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Task Dialog */}
// <AddOrUpdateTask
//   task={editingTask}
//   isOpen={isTaskDialogOpen}
//   onClose={() => {
//     setIsTaskDialogOpen(false);
//     setEditingTask(null);
//     setNewTaskColumnId(null);
//   }}
// />
//     </div>
//   );
// }

"use client";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/Search";
import { CustomSelect } from "@/components/shared/CustomSelect";
import { initialColumns } from "@/modules/data";
import { LayoutDashboard, List, Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Column, Task } from "../../types";
import { AddOrUpdateTask } from "../addOrUpdateTask/AddOrUpdateTask";
import { TasksGrid } from "./TasksGrid";

// Mock data with sample tasks for testing

export default function TasksBoard() {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  // Memoized filtered columns for performance
  const filteredColumns = useMemo(() => {
    if (activeFilter === "all") return columns;
    return columns.filter((column) => column.id === activeFilter);
  }, [columns, activeFilter]);

  const handleDragStart = useCallback((taskId: string) => {
    setDraggedTaskId(taskId);
  }, []);

  const handleDrop = useCallback(
    (targetColumnId: string, draggedTaskId: string) => {
      if (!draggedTaskId) return;

      setColumns((prevColumns) => {
        // Find the task and its current column
        let taskToMove: Task | null = null;
        let sourceColumnId: string | null = null;

        for (const column of prevColumns) {
          const task = column.tasks.find((t) => t.id === draggedTaskId);
          if (task) {
            taskToMove = task;
            sourceColumnId = column.id;
            break;
          }
        }

        if (
          !taskToMove ||
          !sourceColumnId ||
          sourceColumnId === targetColumnId
        ) {
          return prevColumns;
        }

        // Update task status and move between columns
        const updatedTask = {
          ...taskToMove,
          status: targetColumnId as Task["status"],
        };

        return prevColumns.map((column) => {
          if (column.id === sourceColumnId) {
            // Remove task from source column
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== draggedTaskId),
            };
          } else if (column.id === targetColumnId) {
            // Add task to target column
            return {
              ...column,
              tasks: [...column.tasks, updatedTask],
            };
          }
          return column;
        });
      });

      // Clear dragged task ID
      setDraggedTaskId(null);
    },
    []
  );

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
    setIsTaskDialogOpen(true);
  }, []);

  const handleDeleteTask = useCallback((taskId: string) => {
    setColumns((prev) =>
      prev.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      }))
    );
  }, []);

  const handleViewModeChange = useCallback((mode: "kanban" | "list") => {
    setViewMode(mode);
  }, []);

  const statusOptions = [
    { value: "all", label: "All Tasks" },
    { value: "todo", label: "To Do" },
    { value: "progress", label: "In Progress" },
    { value: "review", label: "Review" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="space-y-6 ">
      {/* Header Controls */}
      <div className="flex items-center justify-between w-full gap-4">
        {/* Filters */}
        <div className="flex items-center flex-wrap md:flex-nowrap justify-center gap-4 flex-1 max-w-md">
          <CustomSelect
            placeholder="اختر الحالة"
            options={statusOptions}
            value={activeFilter}
            onValueChange={setActiveFilter}
            className="w-full"
          />
          <SearchBar />
        </div>

        {/* View Controls */}
        <div className="flex  items-center justify-center gap-4 ">
          <div className=" items-center hidden md:flex space-x-1 bg-muted p-1 rounded-lg">
            <Button
              onClick={() => handleViewModeChange("kanban")}
              variant="ghost"
              size="icon"
              className={`h-8 w-8 transition-all ${
                viewMode === "kanban"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Kanban View"
            >
              <LayoutDashboard className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => handleViewModeChange("list")}
              variant="ghost"
              size="icon"
              className={`h-8 w-8 transition-all ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          <Button
            size="default"
            onClick={() => setIsTaskDialogOpen(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Task</span>
          </Button>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="mx-auto overflow-x-auto pb-6">
        <div
          className={`${
            viewMode === "kanban" ? "flex" : "grid grid-cols-1"
          } gap-6 overflow-auto min-w-max`}
        >
          {filteredColumns.map((column) => (
            <div
              key={column.id}
              className={`${
                viewMode === "kanban" ? "w-80" : "w-full"
              } shrink-0`}
            >
              <TasksGrid
                column={column}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Task Dialog Placeholder */}

      <AddOrUpdateTask
        task={editingTask}
        isOpen={isTaskDialogOpen}
        onClose={() => {
          setIsTaskDialogOpen(false);
          setEditingTask(null);
        }}
      />
    </div>
  );
}

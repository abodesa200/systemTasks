import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Edit, Tag, Trash2, Users } from "lucide-react";
import React, { useState } from "react";
import { DeleteDialog } from "../../components/shared/DeleteDialog";

interface Assignee {
  id: string;
  name: string;
  avatar?: string;
}

interface Tag {
  id?: string;
  name: string;
  color?: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  progress: number;
  priority?: "low" | "medium" | "high";
  estimatedHours?: number;
  spentHours?: number;
  assignees?: Assignee[];
  dueDate?: string;
  tags?: Tag[];
  createdAt?: string;
  updatedAt?: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface TasksListProps {
  filteredColumns: Column[];
  totalTasksInFilter: number;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TasksList: React.FC<TasksListProps> = ({
  filteredColumns,
  totalTasksInFilter,
  onEditTask,
  onDeleteTask,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleDeleteClick = (taskId: string) => {
    setTaskToDelete(taskId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete);
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className=" rounded-lg ">
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        // isLoading={isDeleting}
      />

      {totalTasksInFilter === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-lg mb-2">No tasks found</div>
          <div className="text-sm">
            Try changing the filter or add some tasks
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredColumns.map((column) => {
            const completionRate =
              column.tasks.length > 0
                ? Math.round(
                    column.tasks.reduce((sum, task) => sum + task.progress, 0) /
                      column.tasks.length
                  )
                : 0;

            const totalEstimatedHours = column.tasks.reduce(
              (sum, task) =>
                sum + (task.estimatedHours || task.spentHours || 0),
              0
            );
            const totalSpentHours = column.tasks.reduce(
              (sum, task) => sum + (task.spentHours || 0),
              0
            );

            return (
              <Card key={column.id} className="border-border ">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">{column.title}</CardTitle>
                      <Badge variant="secondary" className="font-medium">
                        {column.tasks.length} tasks
                      </Badge>
                    </div>

                    {/* Column Statistics */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {totalSpentHours}h / {totalEstimatedHours}h
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs">Progress:</span>
                        <div className="w-16">
                          <Progress value={completionRate} className="h-2" />
                        </div>
                        <span className="text-xs font-medium">
                          {completionRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="-mt-4">
                  {/* Tasks List */}
                  {column.tasks.length === 0 ? (
                    <div
                      className="text-center 
                     text-muted-foreground bg-muted/50 rounded-lg border-2 border-dashed border-border"
                    >
                      <p className="text-sm">No tasks in this column</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {column.tasks.map((task) => (
                        <Card
                          key={task.id}
                          className="bg-muted/30 hover:bg-muted/50 transition-all duration-200 border-border"
                        >
                          <CardContent className="">
                            {/* Task Header */}
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex items-center gap-2 ">
                                <h4 className="font-medium truncate">
                                  {task.title}
                                </h4>
                                {task.priority && (
                                  <Badge
                                    variant={getPriorityVariant(task.priority)}
                                  >
                                    {task.priority}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span className="truncate">
                                  {task.spentHours || 0}h
                                  {task.estimatedHours &&
                                    ` / ${task.estimatedHours}h`}
                                </span>
                              </div>
                              {task.dueDate && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  <span className="truncate text-xs">
                                    {new Date(
                                      task.dueDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                {task.assignees && task.assignees.length > 0 ? (
                                  <div className="flex items-center gap-1">
                                    {task.assignees
                                      .slice(0, 3)
                                      .map((assignee) => (
                                        <Avatar
                                          key={assignee.id}
                                          className="w-6 h-6"
                                          title={assignee.name}
                                        >
                                          <AvatarFallback className="text-xs">
                                            {assignee.name
                                              .charAt(0)
                                              .toUpperCase()}
                                          </AvatarFallback>
                                        </Avatar>
                                      ))}
                                    {task.assignees.length > 3 && (
                                      <span className="text-xs text-muted-foreground ml-1">
                                        +{task.assignees.length - 3}
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-xs text-muted-foreground">
                                    Unassigned
                                  </span>
                                )}
                              </div>
                              {task.tags && task.tags.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <Tag className="w-4 h-4 text-muted-foreground" />
                                  <div className="flex flex-wrap gap-1">
                                    {task.tags.slice(0, 2).map((tag, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {typeof tag === "string"
                                          ? tag
                                          : tag.name}
                                      </Badge>
                                    ))}
                                    {task.tags.length > 2 && (
                                      <span className="text-xs text-muted-foreground">
                                        +{task.tags.length - 2}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                              {/* Task Actions */}
                              <div className="flex items-center gap-1 ">
                                <Button
                                  onClick={() => onEditTask(task)}
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteClick(task.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Task Progress Bar */}
                            <div className="mt-2 ">
                              <div className="flex items-center gap-2  justify-between text-[11px] text-muted-foreground mb-1">
                                <Progress
                                  value={task.progress}
                                  className="h-2"
                                />
                                <div>{task.progress}%</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TasksList;

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Archive,
  Building,
  Copy,
  Edit,
  Flag,
  MoreHorizontal,
  Trash2,
  Users,
} from "lucide-react";
import WorkTimer from "../../../../components/shared/WorkTimer";
import { Task } from "../../types";

import { mockAttachments, mockComments, mockSubtasks } from "@/modules/data";
import Attachments from "./Attachments";
import Comments from "./Comments";
import Overview from "./Overview";
import Subtasks from "./Subtasks";
import TimeTracking from "./TimeTracking";

interface TaskDetailsDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (task: any) => void;
  onDelete?: (taskId: string) => void;
  onArchive?: (taskId: string) => void;
}

export default function TaskDetails({
  task,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onArchive,
}: TaskDetailsDialogProps) {
  const getPriorityText = (priority: string) => {
    const priorityMap = {
      urgent: "عاجلة",
      high: "عالية",
      medium: "متوسطة",
      low: "منخفضة",
    };
    return priorityMap[priority as keyof typeof priorityMap] || priority;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      case "medium":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
      case "low":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const completedSubtasks = mockSubtasks.filter((st) => st.completed).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]  max-h-[95vh] overflow-x-hidden overflow-y-auto p-0">
        <div className="flex flex-col h-full w-full">
          {/* Enhanced Header with more actions */}
          <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-card dark:to-card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 justify-between">
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-xl font-bold text-right">
                      {task.title}
                    </DialogTitle>
                  </div>
                </div>
                <div className="flex">
                  <DialogDescription className=" text-sm text-muted-foreground bg-white dark:bg-zinc-800 p-3 rounded-lg border">
                    {task.description || "لا يوجد وصف للمهمة"}
                  </DialogDescription>
                  <div className="flex flex-col items-center  gap-3 mr-4">
                    <WorkTimer showTimer />
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${getPriorityColor(
                          task.priority
                        )} px-3 py-1`}
                      >
                        <Flag className="w-3 h-3 ml-1" />
                        {getPriorityText(task.priority)}
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3  ">
                  <div className="flex items-center gap-4  ">
                    <div
                      className="flex items-center gap-1 text-sm 
                  text-muted-foreground bg-white dark:bg-zinc-800 px-3 py-1 rounded-full"
                    >
                      <Building className="w-4 h-4" />
                      {task.project}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground bg-white dark:bg-zinc-800 px-3 py-1 rounded-full">
                      <Users className="w-4 h-4" />
                      {task.client}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-full"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onEdit?.(task)}>
                        <Edit className="w-4 h-4 ml-2" />
                        تعديل المهمة
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 ml-2" />
                        نسخ المهمة
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onArchive?.(task.id)}>
                        <Archive className="w-4 h-4 ml-2" />
                        أرشفة
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete?.(task.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 ml-2" />
                        حذف المهمة
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className=" max-w-[580px] overflow-hidden">
            <Tabs defaultValue="overview" className="h-full flex flex-col px-1">
              <TabsList className="flex  justify-between  mt-4  ">
                <TabsTrigger value="overview" className="">
                  نظرة عامة
                </TabsTrigger>
                <TabsTrigger value="subtasks">
                  المهام الفرعية ({mockSubtasks.length})
                </TabsTrigger>
                <TabsTrigger value="comments">
                  التعليقات ({mockComments.length})
                </TabsTrigger>
                <TabsTrigger value="attachments">
                  المرفقات ({mockAttachments.length})
                </TabsTrigger>
                <TabsTrigger value="time">تسجيل الوقت</TabsTrigger>
                {/* <TabsTrigger value="activity">النشاط</TabsTrigger> */}
              </TabsList>

              <div className="flex-1 overflow-y-auto px-6 pb-6">
                {/* Overview Tab - Enhanced */}
                <TabsContent value="overview" className="mt-4 space-y-6">
                  {/* Quick Stats */}
                  <Overview task={task} completedSubtasks={completedSubtasks} />
                </TabsContent>

                {/* Subtasks Tab - New */}
                <TabsContent value="subtasks" className="mt-4 space-y-4">
                  <Subtasks completedSubtasks={completedSubtasks} />
                </TabsContent>

                {/* Enhanced Comments Tab */}
                <TabsContent value="comments" className="mt-4 space-y-4">
                  <Comments />
                </TabsContent>

                {/* Enhanced Attachments Tab */}
                <TabsContent value="attachments" className="mt-4 space-y-4">
                  <Attachments />
                </TabsContent>

                {/* Time Tracking Tab - New */}
                <TabsContent value="time" className="mt-4 space-y-4">
                  <TimeTracking task={task} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

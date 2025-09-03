"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { mockSubtasks } from "@/modules/data";
import {
  AlertTriangle,
  Building,
  CalendarDays,
  CheckSquare,
  Clock,
  Edit,
  Plus,
  Save,
  Target,
  Timer,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { formatDate, getDaysUntilDue } from "../../utils/taskHelpers";

const Overview = ({ task, completedSubtasks }) => {
  const [editingProgress, setEditingProgress] = useState(false);
  const [tempProgress, setTempProgress] = useState(task.progress);
  const subtaskProgress = Math.round(
    (completedSubtasks / mockSubtasks.length) * 100
  );
  const saveProgress = () => {
    // Here you would typically update the task progress
    task.progress = tempProgress;
    setEditingProgress(false);
  };
  const daysUntilDue = getDaysUntilDue(task.dueDate);
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{task.progress}%</p>
                <p className="text-xs text-muted-foreground">مكتملة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{task.spentHours}</p>
                <p className="text-xs text-muted-foreground">ساعة مستغرقة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {completedSubtasks}/{mockSubtasks.length}
                </p>
                <p className="text-xs text-muted-foreground">مهام فرعية</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CalendarDays
                className={`w-5 h-5 ${
                  isOverdue
                    ? "text-red-600"
                    : isDueSoon
                    ? "text-amber-600"
                    : "text-gray-600"
                }`}
              />
              <div>
                <p className="text-2xl font-bold">{Math.abs(daysUntilDue)}</p>
                <p className="text-xs text-muted-foreground">
                  {isOverdue ? "يوم متأخر" : "يوم متبقي"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section - Enhanced */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">تقدم المهمة</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingProgress(!editingProgress)}
            >
              {editingProgress ? (
                <Save className="w-4 h-4 ml-1" />
              ) : (
                <Edit className="w-4 h-4 ml-1" />
              )}
              {editingProgress ? "حفظ" : "تعديل"}
            </Button>
          </div>
          <CardDescription>
            {editingProgress ? (
              <div className="flex items-center gap-4 mt-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={tempProgress}
                  onChange={(e) => setTempProgress(Number(e.target.value))}
                  className="w-20"
                />
                <span>%</span>
                <Button size="sm" onClick={saveProgress}>
                  حفظ
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTempProgress(task.progress);
                    setEditingProgress(false);
                  }}
                >
                  إلغاء
                </Button>
              </div>
            ) : (
              `${task.progress}% مكتملة`
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress
            value={editingProgress ? tempProgress : task.progress}
            className="h-3"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>0%</span>
            <span>100%</span>
          </div>

          {/* Subtask Progress */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">تقدم المهام الفرعية</span>
              <span className="text-sm text-muted-foreground">
                {subtaskProgress}%
              </span>
            </div>
            <Progress value={subtaskProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Rest of the overview content... */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Info Card - Enhanced */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">معلومات أساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">المشروع</span>
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span className="font-medium">{task.project}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">العميل</span>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="font-medium">{task.client}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">الحالة</span>
              <Select defaultValue={task.status}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="قيد الانتظار">قيد الانتظار</SelectItem>
                  <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
                  <SelectItem value="في المراجعة">في المراجعة</SelectItem>
                  <SelectItem value="مكتملة">مكتملة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                تاريخ الإنشاء
              </span>
              <span className="text-sm">{formatDate(task.createdDate)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">آخر تحديث</span>
              <span className="text-sm">{formatDate(task.updatedDate)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Card - Enhanced */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الجدولة والتوقيت</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                تاريخ الاستحقاق
              </span>
              <div
                className={`flex items-center gap-1 ${
                  isOverdue
                    ? "text-red-600"
                    : isDueSoon
                    ? "text-amber-600"
                    : "text-gray-600"
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span className="font-medium">{formatDate(task.dueDate)}</span>
              </div>
            </div>
            {isOverdue && (
              <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                <AlertTriangle className="w-4 h-4" />
                متأخرة بـ {Math.abs(daysUntilDue)} يوم
              </div>
            )}
            {isDueSoon && !isOverdue && (
              <div className="flex items-center gap-1 text-amber-600 text-sm font-medium">
                <Zap className="w-4 h-4" />
                مستحقة خلال {daysUntilDue} يوم
              </div>
            )}
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                الوقت المستغرق
              </span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{task.spentHours} ساعة</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                الوقت المتوقع
              </span>
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                <span className="font-medium">{task.estimatedHours} ساعة</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">كفاءة الوقت</span>
                <span
                  className={`font-medium ${
                    task.spentHours / task.estimatedHours > 1
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {Math.round((task.spentHours / task.estimatedHours) * 100)}%
                </span>
              </div>
              <Progress
                value={Math.min(
                  (task.spentHours / task.estimatedHours) * 100,
                  100
                )}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tags and Team - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {task.tags && task.tags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">العلامات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    style={{
                      backgroundColor: tag.color + "20",
                      color: tag.color,
                    }}
                  >
                    {tag.name}
                  </Badge>
                ))}
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 ml-1" />
                  إضافة علامة
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الفريق</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Assignees */}
              {task.assignees && task.assignees.length > 0 && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    المكلفون
                  </Label>
                  <div className="space-y-2">
                    {task.assignees.map((assignee) => (
                      <div
                        key={assignee.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={assignee.avatar} />
                            <AvatarFallback>{assignee.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium text-sm">
                              {assignee.name}
                            </span>
                            {assignee.role && (
                              <p className="text-xs text-muted-foreground">
                                {assignee.role}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Watchers */}
              {task.watchers && task.watchers.length > 0 && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    المتابعون
                  </Label>
                  <div className="flex -space-x-2">
                    {task.watchers.map((watcher) => (
                      <Avatar
                        key={watcher.id}
                        className="w-8 h-8 border-2 border-white dark:border-gray-800"
                      >
                        <AvatarImage src={watcher.avatar} />
                        <AvatarFallback>{watcher.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;

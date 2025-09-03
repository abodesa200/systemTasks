"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { mockSubtasks } from "@/modules/data";
import { CheckCircle, Circle, Edit, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

const Subtasks = ({ completedSubtasks }) => {
  const [newSubtask, setNewSubtask] = useState("");
  const [showAddSubtask, setShowAddSubtask] = useState(false);
  const subtaskProgress = Math.round(
    (completedSubtasks / mockSubtasks.length) * 100
  );
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">المهام الفرعية</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {completedSubtasks} من {mockSubtasks.length} مكتملة
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddSubtask(!showAddSubtask)}
            >
              <PlusCircle className="w-4 h-4 ml-1" />
              إضافة مهمة فرعية
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={subtaskProgress} className="h-2 mb-4" />

        {/* Add New Subtask */}
        {showAddSubtask && (
          <Card className="mb-4 border-dashed">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="عنوان المهمة الفرعية..."
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" disabled={!newSubtask.trim()}>
                  إضافة
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowAddSubtask(false);
                    setNewSubtask("");
                  }}
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subtasks List */}
        <div className="space-y-3">
          {mockSubtasks.map((subtask, index) => (
            <div
              key={subtask.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                subtask.completed
                  ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                  : "bg-gray-50 dark:bg-gray-800/50"
              }`}
            >
              <Button variant="ghost" size="icon" className="h-6 w-6">
                {subtask.completed ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </Button>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    subtask.completed
                      ? "line-through text-muted-foreground"
                      : ""
                  }`}
                >
                  {subtask.title}
                </p>
                {subtask.assignee && (
                  <p className="text-sm text-muted-foreground">
                    مكلف: {subtask.assignee}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Edit className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Subtasks;

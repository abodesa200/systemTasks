import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockTimeEntries } from "@/modules/data";
import { Clock, MoreHorizontal, Plus, Target, TrendingUp } from "lucide-react";
import { Task } from "../../types";

const TimeTracking = ({ task }: { task: Task }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">تسجيل وقت جديد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">التاريخ</Label>
              <Input type="date" id="date" />
            </div>
            <div>
              <Label htmlFor="hours">عدد الساعات</Label>
              <Input type="number" id="hours" placeholder="0.5" step="0.5" />
            </div>
            <div>
              <Label htmlFor="description">الوصف</Label>
              <Input id="description" placeholder="ما الذي تم إنجازه؟" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة تسجيل
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Time Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockTimeEntries.reduce((acc, entry) => acc + entry.hours, 0)}
                  h
                </p>
                <p className="text-xs text-muted-foreground">إجمالي الوقت</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {(
                    mockTimeEntries.reduce(
                      (acc, entry) => acc + entry.hours,
                      0
                    ) / mockTimeEntries.length
                  ).toFixed(1)}
                  h
                </p>
                <p className="text-xs text-muted-foreground">متوسط يومي</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {task.estimatedHours -
                    mockTimeEntries.reduce(
                      (acc, entry) => acc + entry.hours,
                      0
                    )}
                  h
                </p>
                <p className="text-xs text-muted-foreground">وقت متبقي</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Entries List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">سجل الوقت</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTimeEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      {new Date(entry.date).getDate()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString("ar-EG", {
                        month: "short",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{entry.description}</p>
                    <p className="text-xs text-muted-foreground">
                      بواسطة {entry.user}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{entry.hours}h</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>تعديل</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTracking;

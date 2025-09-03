import { Clock, MoreHorizontal, Plus, Users } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { TaskCard } from "./TaskCard"
import { Progress } from "../ui/progress"
import { Badge } from "../ui/badge"

export function TasksColumn({ 
    column, 
    onDragStart, 
    onDragEnd, 
    onDragOver, 
    onDrop, 
    isDragOver, 
    draggedTaskId,
    onEditTask,
    onDeleteTask,
    onAddTask
  }) {
    const completionRate = column.tasks.length > 0
      ? Math.round(column.tasks.reduce((sum, task) => sum + task.progress, 0) / column.tasks.length)
      : 0
  
    const totalEstimatedHours = column.tasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0)
    const totalSpentHours = column.tasks.reduce((sum, task) => sum + (task.spentHours || 0), 0)
  
    return (
      <div className="flex-1 min-w-80">
        <Card
          className={`h-full bg-card border-border transition-all duration-300 ${
            isDragOver ? 'ring-2 ring-primary ring-inset bg-accent/50' : ''
          }`}
          onDragOver={(e) => onDragOver(e, column.id)}
          onDrop={(e) => onDrop(e, column.id)}
          data-column-id={column.id}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-foreground">{column.title}</h2>
                <Badge variant="secondary" className="text-xs">
                  {column.tasks.length}
                </Badge>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>معدل الإنجاز</span>
                <span>{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2">
                <div 
                  className={`h-full transition-all rounded-full ${
                    completionRate < 30 ? 'bg-rose-500' :
                    completionRate < 70 ? 'bg-amber-500' : 'bg-[#00c4b4]'
                  }`} 
                  style={{ width: `${completionRate}%` }}
                />
              </Progress>
              
              {/* إحصائيات إضافية */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{totalSpentHours}ساعة / {totalEstimatedHours}ساعة</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{new Set(column.tasks.flatMap(task => task.assignees.map(a => a.id))).size} أشخاص</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onDragStart={onDragStart} 
                  onDragEnd={onDragEnd} 
                  isDragging={draggedTaskId === task.id}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
              <Button
                variant="ghost"
                className="w-full border-2 border-dashed border-border h-12 text-muted-foreground hover:text-foreground hover:border-primary/50 bg-muted/50 hover:bg-accent/50"
                onClick={() => onAddTask(column.id)}
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة مهمة جديدة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
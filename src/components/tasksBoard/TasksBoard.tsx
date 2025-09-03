"use client"
import { useCallback, useState } from "react"
import { Progress } from "../ui/progress"
import { TasksColumn } from "./TasksColumn"
import { TaskDialog } from "./TaskDialog"
import { initialColumns } from "../data"

export default function TasksBoard() {
    const [columns, setColumns] = useState(initialColumns)
    const [draggedTaskId, setDraggedTaskId] = useState(null)
    const [dragOverColumn, setDragOverColumn] = useState(null)
    const [editingTask, setEditingTask] = useState(null)
    const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
    const [newTaskColumnId, setNewTaskColumnId] = useState(null)
    
  
    const handleDragStart = useCallback((taskId, e) => {
      setDraggedTaskId(taskId)
      
      // تحسين مظهر العنصر أثناء السحب
      const taskElement = e.currentTarget
      e.dataTransfer.setData("text/plain", taskId)
      e.dataTransfer.effectAllowed = 'move'
      
      // إنشاء عنصر وهمي محسن للسحب
      const dragImage = taskElement.cloneNode(true)
      dragImage.style.width = `${taskElement.offsetWidth}px`
      dragImage.style.opacity = "0.9"
      dragImage.style.transform = "rotate(3deg) scale(1.05)"
      dragImage.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)"
      dragImage.style.borderRadius = "0.75rem"
      dragImage.style.border = "2px solid #00c4b4"
      dragImage.style.position = "absolute"
      dragImage.style.top = "-1000px"
      dragImage.style.zIndex = "1000"
      
      document.body.appendChild(dragImage)
      e.dataTransfer.setDragImage(dragImage, taskElement.offsetWidth / 2, 30)
      
      // إزالة العنصر الوهمي بعد فترة
      setTimeout(() => {
        if (document.body.contains(dragImage)) {
          document.body.removeChild(dragImage)
        }
      }, 100)
    }, [])
  
    const handleDragEnd = useCallback(() => {
      setDraggedTaskId(null)
      setDragOverColumn(null)
    }, [])
  
    const handleDragOver = useCallback((e, targetColumnId) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      
      if (targetColumnId !== dragOverColumn) {
        setDragOverColumn(targetColumnId)
      }
    }, [dragOverColumn])
  
    const handleDrop = useCallback((e, targetColumnId) => {
      e.preventDefault()
  
      const taskId = e.dataTransfer.getData("text/plain")
      if (!taskId) return
  
      const sourceColumn = columns.find((col) => col.tasks.some((task) => task.id === taskId))
      const draggedTask = sourceColumn?.tasks.find((task) => task.id === taskId)
  
      if (!draggedTask || !sourceColumn) return
  
      if (sourceColumn.id === targetColumnId) {
        setDragOverColumn(null)
        return
      }
  
      const updatedTask = { ...draggedTask, status: targetColumnId }
  
      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          if (column.id === sourceColumn.id) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            }
          } else if (column.id === targetColumnId) {
            return {
              ...column,
              tasks: [...column.tasks, updatedTask],
            }
          }
          return column
        }),
      )
  
      setDraggedTaskId(null)
      setDragOverColumn(null)
    }, [columns])
  
    const handleEditTask = (task) => {
      setEditingTask(task)
      setIsTaskDialogOpen(true)
    }
  
    const handleDeleteTask = (taskId) => {
      if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
        setColumns(prevColumns =>
          prevColumns.map(column => ({
            ...column,
            tasks: column.tasks.filter(task => task.id !== taskId)
          }))
        )
      }
    }
  
    const handleAddTask = (columnId) => {
      setNewTaskColumnId(columnId)
      setEditingTask(null)
      setIsTaskDialogOpen(true)
    }
  
    const handleSaveTask = (taskData) => {
      if (editingTask) {
        // تعديل مهمة موجودة
        setColumns(prevColumns =>
          prevColumns.map(column => ({
            ...column,
            tasks: column.tasks.map(task =>
              task.id === editingTask.id ? { ...task, ...taskData } : task
            )
          }))
        )
      } else {
        // إضافة مهمة جديدة
        const newTask = {
          ...taskData,
          id: Date.now().toString(),
          status: newTaskColumnId,
          assignees: [],
          tags: [],
          progress: 0,
          comments: 0,
          attachments: 0,
          createdAt: new Date().toISOString().split('T')[0],
          spentHours: 0
        }
  
        setColumns(prevColumns =>
          prevColumns.map(column =>
            column.id === newTaskColumnId
              ? { ...column, tasks: [...column.tasks, newTask] }
              : column
          )
        )
      }
    }
  
    const totalTasks = columns.reduce((sum, col) => sum + col.tasks.length, 0)
    const completedTasks = columns.find(col => col.id === 'completed')?.tasks.length || 0
    const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  
    return (
      <div className=" ">
        <div className="">
          <div className="">
        
            
          
            <div className="mb-4">
              <Progress value={overallProgress} className="h-3">
                <div 
                  className="h-full transition-all rounded-full bg-gradient-to-r from-[#00c4b4] to-emerald-500" 
                  style={{ width: `${overallProgress}%` }}
                />
              </Progress>
            </div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-6">
            {columns.map((column) => (
              <TasksColumn
                key={column.id}
                column={column}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDragOver={dragOverColumn === column.id}
                draggedTaskId={draggedTaskId}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onAddTask={handleAddTask}
              />
            ))}
          </div>
        </div>
  
        <TaskDialog
          task={editingTask}
          isOpen={isTaskDialogOpen}
          onClose={() => {
            setIsTaskDialogOpen(false)
            setEditingTask(null)
            setNewTaskColumnId(null)
          }}
          onSave={handleSaveTask}
        />
      </div>
    )
  }
  
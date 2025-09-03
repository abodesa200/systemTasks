"use client"
import { Save } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useState } from "react"

export function TaskDialog({ task, isOpen, onClose, onSave }) {
    const [editedTask, setEditedTask] = useState(task || {
      title: '',
      description: '',
      project: '',
      client: '',
      dueDate: '',
      priority: 'medium',
      estimatedHours: 0
    })
  
    const handleSave = () => {
      onSave(editedTask)
      onClose()
    }
  
    if (!isOpen) return null
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{task ? 'تعديل المهمة' : 'إضافة مهمة جديدة'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">عنوان المهمة</label>
              <Input
                value={editedTask.title}
                onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                placeholder="أدخل عنوان المهمة"
              />
            </div>
            <div>
              <label className="text-sm font-medium">الوصف</label>
              <Textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                placeholder="أدخل وصف المهمة"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">المشروع</label>
                <Input
                  value={editedTask.project}
                  onChange={(e) => setEditedTask({...editedTask, project: e.target.value})}
                  placeholder="اسم المشروع"
                />
              </div>
              <div>
                <label className="text-sm font-medium">العميل</label>
                <Input
                  value={editedTask.client}
                  onChange={(e) => setEditedTask({...editedTask, client: e.target.value})}
                  placeholder="اسم العميل"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">تاريخ الاستحقاق</label>
                <Input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">الأولوية</label>
                <select 
                  className="w-full p-2 border rounded-md bg-background"
                  value={editedTask.priority}
                  onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
                >
                  <option value="low">منخفضة</option>
                  <option value="medium">متوسطة</option>
                  <option value="high">عالية</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">الساعات المقدرة</label>
              <Input
                type="number"
                value={editedTask.estimatedHours}
                onChange={(e) => setEditedTask({...editedTask, estimatedHours: parseInt(e.target.value) || 0})}
                placeholder="عدد الساعات المقدرة"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={onClose}>
                إلغاء
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 ml-2" />
                حفظ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  
  
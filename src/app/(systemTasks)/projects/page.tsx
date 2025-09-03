// "use client";
// import SummaryCard from "@/components/shared/SummaryCard";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   BarChart3,
//   Clock,
//   FolderOpen,
//   Plus,
//   Search,
//   Target,
// } from "lucide-react";
// import { useMemo, useState } from "react";

// export default function ProjectsPage() {
//   const [projects, setProjects] = useState(initialProjects);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [filterPriority, setFilterPriority] = useState("all");
//   const [editingProject, setEditingProject] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   // Filter projects based on search and filters
//   const filteredProjects = useMemo(() => {
//     return projects.filter((project) => {
//       const matchesSearch =
//         project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         project.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus =
//         filterStatus === "all" || project.status === filterStatus;
//       const matchesPriority =
//         filterPriority === "all" || project.priority === filterPriority;

//       return matchesSearch && matchesStatus && matchesPriority;
//     });
//   }, [projects, searchTerm, filterStatus, filterPriority]);

//   const handleAddProject = () => {
//     setEditingProject(null);
//     setIsDialogOpen(true);
//   };

//   const handleEditProject = (project) => {
//     setEditingProject(project);
//     setIsDialogOpen(true);
//   };

//   const handleDeleteProject = (projectId) => {
//     if (confirm("هل أنت متأكد من حذف هذا المشروع؟")) {
//       setProjects(projects.filter((p) => p.id !== projectId));
//     }
//   };

//   const handleViewProject = (project) => {
//     // يمكنك إضافة لوجيك عرض تفاصيل المشروع هنا
//     console.log("عرض المشروع:", project);
//   };

//   const handleSaveProject = (projectData) => {
//     if (editingProject) {
//       // تحديث مشروع موجود
//       setProjects(
//         projects.map((p) =>
//           p.id === editingProject.id ? { ...p, ...projectData } : p
//         )
//       );
//     } else {
//       // إضافة مشروع جديد
//       const newProject = {
//         ...projectData,
//         id: Math.random().toString(36).substr(2, 9),
//         progress: 0,
//         tasksCount: 0,
//         completedTasks: 0,
//       };
//       setProjects([...projects, newProject]);
//     }
//   };

//   // Statistics
//   const stats = useMemo(() => {
//     const total = projects.length;
//     const active = projects.filter((p) => p.status === "active").length;
//     const completed = projects.filter((p) => p.status === "completed").length;
//     const avgProgress =
//       total > 0
//         ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / total)
//         : 0;

//     return { total, active, completed, avgProgress };
//   }, [projects]);

//   return (
//     <div className="">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           {/* Statistics Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <SummaryCard
//               title=" إجمالي المشاريع"
//               count={stats.total}
//               icon={<FolderOpen className="h-4 w-4 text-primary" />}
//               variant="progress"
//             />
//             <SummaryCard
//               title="المشاريع النشطة"
//               count={stats.active}
//               subtitle="0 hours invoiced"
//               icon={<Target className="h-4 w-4 text-emerald-600" />}
//               variant="custom"
//               customColor="text-green-400"
//             />

//             {/* Not Invoiced */}
//             <SummaryCard
//               title="  المشاريع المكتملة"
//               count={stats.completed}
//               subtitle="Pending invoicing"
//               icon={<BarChart3 className="h-4 w-4 text-green-600" />}
//               variant="custom"
//               customColor="text-orange-400"
//             />
//             <SummaryCard
//               title="  متوسط التقدم"
//               count={stats.avgProgress}
//               subtitle="Pending invoicing"
//               icon={<Clock className="h-4 w-4 text-cyan-600" />}
//               variant="custom"
//               customColor="text-orange-400"
//             />
//           </div>

//           {/* Search and Filters */}
//           <Card className="mb-6">
//             <CardHeader>
//               <CardTitle className="text-lg">تصفية المشاريع</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="relative flex-1">
//                   <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="البحث في المشاريع..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-4 pr-10"
//                   />
//                 </div>

//                 <Select value={filterStatus} onValueChange={setFilterStatus}>
//                   <SelectTrigger className="w-full md:w-[180px]">
//                     <SelectValue placeholder="حالة المشروع" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">جميع الحالات</SelectItem>
//                     <SelectItem value="planning">في التخطيط</SelectItem>
//                     <SelectItem value="active">نشط</SelectItem>
//                     <SelectItem value="on-hold">معلق</SelectItem>
//                     <SelectItem value="completed">مكتمل</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <Select
//                   value={filterPriority}
//                   onValueChange={setFilterPriority}
//                 >
//                   <SelectTrigger className="w-full md:w-[180px]">
//                     <SelectValue placeholder="أولوية المشروع" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">جميع الأولويات</SelectItem>
//                     <SelectItem value="high">عالية</SelectItem>
//                     <SelectItem value="medium">متوسطة</SelectItem>
//                     <SelectItem value="low">منخفضة</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </Card>
//           <Button onClick={handleAddProject} className="gap-2 py-3 px-6 h-auto">
//             <Plus className="w-5 h-5" />
//             مشروع جديد
//           </Button>
//         </div>

//         {/* Projects Grid */}
//         {filteredProjects.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProjects.map((project) => (
//               <ProjectCard
//                 key={project.id}
//                 project={project}
//                 onEdit={handleEditProject}
//                 onDelete={handleDeleteProject}
//                 onView={handleViewProject}
//               />
//             ))}
//           </div>
//         ) : (
//           <Card className="text-center py-12">
//             <CardContent>
//               <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FolderOpen className="w-12 h-12 text-muted-foreground" />
//               </div>
//               <h3 className="text-xl font-semibold text-foreground mb-2">
//                 لا توجد مشاريع
//               </h3>
//               <p className="text-muted-foreground mb-6">
//                 لم يتم العثور على أي مشاريع تطابق المعايير المحددة
//               </p>
//               <Button onClick={handleAddProject} className="gap-2">
//                 <Plus className="w-5 h-5" />
//                 إنشاء مشروع جديد
//               </Button>
//             </CardContent>
//           </Card>
//         )}

//         {/* Project Dialog */}
//         <ProjectDialog
//           project={editingProject}
//           isOpen={isDialogOpen}
//           onClose={() => {
//             setIsDialogOpen(false);
//             setEditingProject(null);
//           }}
//           onSave={handleSaveProject}
//           isEditing={!!editingProject}
//         />
//       </div>
//     </div>
//   );
// }

// // ProjectCard Component
// function ProjectCard({ project, onEdit, onDelete, onView }) {
//   const statusColors = {
//     planning: "bg-gray-100 text-gray-800",
//     active: "bg-emerald-100 text-emerald-800",
//     "on-hold": "bg-amber-100 text-amber-800",
//     completed: "bg-green-100 text-green-800",
//   };

//   const priorityColors = {
//     high: "bg-red-100 text-red-800",
//     medium: "bg-yellow-100 text-yellow-800",
//     low: "bg-blue-100 text-blue-800",
//   };

//   return (
//     <Card className="overflow-hidden hover:shadow-md transition-shadow">
//       <CardHeader className="pb-3">
//         <div className="flex justify-between items-start">
//           <div>
//             <CardTitle className="text-lg">{project.name}</CardTitle>
//             <CardDescription className="mt-1 line-clamp-2">
//               {project.description}
//             </CardDescription>
//           </div>
//           <Badge className={statusColors[project.status]}>
//             {getStatusText(project.status)}
//           </Badge>
//         </div>
//       </CardHeader>
//       <CardContent className="pb-3">
//         <div className="flex justify-between items-center mb-3">
//           <span className="text-sm text-muted-foreground">التقدم</span>
//           <span className="text-sm font-medium">{project.progress}%</span>
//         </div>
//         <Progress value={project.progress} className="h-2" />

//         <div className="flex justify-between items-center mt-4">
//           <Badge variant="outline" className={priorityColors[project.priority]}>
//             {getPriorityText(project.priority)}
//           </Badge>
//           <div className="text-sm text-muted-foreground">
//             {project.completedTasks} / {project.tasksCount} مهام
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="flex justify-between pt-3 border-t">
//         <Button variant="outline" size="sm" onClick={() => onView(project)}>
//           عرض
//         </Button>
//         <div className="flex gap-2">
//           <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
//             تعديل
//           </Button>
//           <Button
//             variant="destructive"
//             size="sm"
//             onClick={() => onDelete(project.id)}
//           >
//             حذف
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

// // ProjectDialog Component
// function ProjectDialog({ project, isOpen, onClose, onSave, isEditing }) {
//   const [formData, setFormData] = useState(
//     project || {
//       name: "",
//       description: "",
//       status: "planning",
//       priority: "medium",
//     }
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//     onClose();
//   };

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>
//             {isEditing ? "تعديل المشروع" : "إضافة مشروع جديد"}
//           </DialogTitle>
//           <DialogDescription>
//             {isEditing
//               ? "قم بتعديل معلومات المشروع هنا."
//               : "أدخل معلومات المشروع الجديد هنا."}
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <Label htmlFor="name">اسم المشروع</Label>
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={(e) => handleChange("name", e.target.value)}
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="description">وصف المشروع</Label>
//               <Input
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) => handleChange("description", e.target.value)}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="status">الحالة</Label>
//                 <Select
//                   value={formData.status}
//                   onValueChange={(value) => handleChange("status", value)}
//                 >
//                   <SelectTrigger id="status">
//                     <SelectValue placeholder="اختر الحالة" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="planning">في التخطيط</SelectItem>
//                     <SelectItem value="active">نشط</SelectItem>
//                     <SelectItem value="on-hold">معلق</SelectItem>
//                     <SelectItem value="completed">مكتمل</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="priority">الأولوية</Label>
//                 <Select
//                   value={formData.priority}
//                   onValueChange={(value) => handleChange("priority", value)}
//                 >
//                   <SelectTrigger id="priority">
//                     <SelectValue placeholder="اختر الأولوية" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="high">عالية</SelectItem>
//                     <SelectItem value="medium">متوسطة</SelectItem>
//                     <SelectItem value="low">منخفضة</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={onClose}>
//               إلغاء
//             </Button>
//             <Button type="submit">{isEditing ? "تحديث" : "إنشاء"}</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// // Helper functions
// function getStatusText(status) {
//   const statusMap = {
//     planning: "في التخطيط",
//     active: "نشط",
//     "on-hold": "معلق",
//     completed: "مكتمل",
//   };
//   return statusMap[status] || status;
// }

// function getPriorityText(priority) {
//   const priorityMap = {
//     high: "عالية",
//     medium: "متوسطة",
//     low: "منخفضة",
//   };
//   return priorityMap[priority] || priority;
// }

// // Initial projects data
// const initialProjects = [
//   {
//     id: "1",
//     name: "مشروع تطوير الموقع",
//     description: "تطوير موقع الشركة الجديد باستخدام أحدث التقنيات",
//     status: "active",
//     priority: "high",
//     progress: 65,
//     tasksCount: 20,
//     completedTasks: 13,
//   },
//   {
//     id: "2",
//     name: "تطبيق الجوال",
//     description: "تصميم وتطوير تطبيق جوال للعملاء",
//     status: "planning",
//     priority: "medium",
//     progress: 20,
//     tasksCount: 15,
//     completedTasks: 3,
//   },
//   {
//     id: "3",
//     name: "نظام إدارة المحتوى",
//     description: "بناء نظام متكامل لإدارة محتوى المواقع",
//     status: "completed",
//     priority: "high",
//     progress: 100,
//     tasksCount: 30,
//     completedTasks: 30,
//   },
// ];
// app/projects/page.tsx

import ProjectsBoard from "@/modules/projects/features/projectsBoard/ProjectsBoard";
import { Project } from "@/modules/projects/types/projects";

const initialProjects: Project[] = [
  {
    id: "1",
    name: "مشروع تطوير الموقع",
    description: "تطوير موقع الشركة الجديد باستخدام أحدث التقنيات",
    status: "active",
    priority: "high",
    progress: 65,
    tasksCount: 20,
    completedTasks: 13,
  },
  {
    id: "2",
    name: "تطبيق الجوال",
    description: "تصميم وتطوير تطبيق جوال للعملاء",
    status: "planning",
    priority: "medium",
    progress: 20,
    tasksCount: 15,
    completedTasks: 3,
  },
  {
    id: "3",
    name: "نظام إدارة المحتوى",
    description: "بناء نظام متكامل لإدارة محتوى المواقع",
    status: "completed",
    priority: "high",
    progress: 100,
    tasksCount: 30,
    completedTasks: 30,
  },
];

export default function ProjectsPage() {
  return <ProjectsBoard initialProjects={initialProjects} />;
}
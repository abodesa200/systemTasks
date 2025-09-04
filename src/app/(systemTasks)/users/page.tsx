// "use client";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
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
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Calendar,
//   CheckCircle,
//   Clock,
//   Edit,
//   Mail,
//   MapPin,
//   MoreHorizontal,
//   Plus,
//   Search,
//   Shield,
//   Trash2,
//   User,
//   XCircle,
// } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// // تعريف نموذج البيانات باستخدام Zod
// const userFormSchema = z.object({
//   name: z.string().min(2, {
//     message: "يجب أن يكون الاسم أكثر من حرفين.",
//   }),
//   email: z.string().email({
//     message: "يرجى إدخال بريد إلكتروني صحيح.",
//   }),
//   phone: z.string().min(10, {
//     message: "يجب أن يكون رقم الهاتف مكون من 10 أرقام على الأقل.",
//   }),
//   role: z.string({
//     required_error: "يرجى اختيار دور المستخدم.",
//   }),
//   status: z.string({
//     required_error: "يرجى اختيار حالة المستخدم.",
//   }),
//   department: z.string().optional(),
//   location: z.string().optional(),
//   joinDate: z.string().optional(),
// });

// // نوع بيانات المستخدم
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
//   phone: string;
//   role: "admin" | "manager" | "developer" | "designer" | "viewer";
//   status: "active" | "inactive" | "pending";
//   department: string;
//   location: string;
//   joinDate: string;
//   lastActive?: string;
// }

// // بيانات تجريبية
// const mockUsers: User[] = [
//   {
//     id: "1",
//     name: "عبداللطيف الخالدي",
//     email: "abdullatif@example.com",
//     phone: "+966512345678",
//     role: "admin",
//     status: "active",
//     department: "التطوير",
//     location: "الرياض",
//     joinDate: "2024-01-15",
//     lastActive: "2024-03-20 14:30",
//   },
//   {
//     id: "2",
//     name: "أحمد السعدي",
//     email: "ahmed@example.com",
//     phone: "+966511223344",
//     role: "developer",
//     status: "active",
//     department: "التطوير",
//     location: "جدة",
//     joinDate: "2024-02-10",
//     lastActive: "2024-03-20 12:45",
//   },
//   {
//     id: "3",
//     name: "سارة العتيبي",
//     email: "sara@example.com",
//     phone: "+966544332211",
//     role: "designer",
//     status: "active",
//     department: "التصميم",
//     location: "الدمام",
//     joinDate: "2024-01-20",
//     lastActive: "2024-03-19 16:20",
//   },
//   {
//     id: "4",
//     name: "محمد الحربي",
//     email: "mohammed@example.com",
//     phone: "+966587654321",
//     role: "manager",
//     status: "inactive",
//     department: "الإدارة",
//     location: "الرياض",
//     joinDate: "2023-12-05",
//     lastActive: "2024-03-15 09:15",
//   },
//   {
//     id: "5",
//     name: "فاطمة القحطاني",
//     email: "fatima@example.com",
//     phone: "+966576543210",
//     role: "developer",
//     status: "pending",
//     department: "التطوير",
//     location: "مكة",
//     joinDate: "2024-03-01",
//     lastActive: "2024-03-20 10:30",
//   },
// ];

// export default function UsersManagementPage() {
//   const [users, setUsers] = useState<User[]>(mockUsers);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterRole, setFilterRole] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [viewMode, setViewMode] = useState<"table" | "cards">("table");

//   // تهيئة النموذج
//   const form = useForm<z.infer<typeof userFormSchema>>({
//     resolver: zodResolver(userFormSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       role: "developer",
//       status: "active",
//       department: "",
//       location: "",
//       joinDate: new Date().toISOString().split("T")[0],
//     },
//   });

//   // فتح نموذج الإضافة
//   const handleAddClick = () => {
//     setSelectedUser(null);
//     form.reset();
//     setIsAddDialogOpen(true);
//   };

//   // فتح نموذج التعديل
//   const handleEditClick = (user: User) => {
//     setSelectedUser(user);
//     form.reset({
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//       status: user.status,
//       department: user.department,
//       location: user.location,
//       joinDate: user.joinDate,
//     });
//     setIsEditDialogOpen(true);
//   };

//   // فتح تأكيد الحذف
//   const handleDeleteClick = (user: User) => {
//     setSelectedUser(user);
//     setIsDeleteDialogOpen(true);
//   };

//   // إضافة مستخدم جديد
//   const onSubmitAdd = (values: z.infer<typeof userFormSchema>) => {
//     const newUser: User = {
//       id: (users.length + 1).toString(),
//       ...values,
//       lastActive: new Date().toISOString(),
//     };
//     setUsers([...users, newUser]);
//     setIsAddDialogOpen(false);
//     form.reset();
//   };

//   // تعديل مستخدم
//   const onSubmitEdit = (values: z.infer<typeof userFormSchema>) => {
//     if (!selectedUser) return;

//     const updatedUsers = users.map((user) =>
//       user.id === selectedUser.id
//         ? { ...user, ...values, lastActive: new Date().toISOString() }
//         : user
//     );

//     setUsers(updatedUsers);
//     setIsEditDialogOpen(false);
//     setSelectedUser(null);
//   };

//   // حذف مستخدم
//   const handleDelete = () => {
//     if (!selectedUser) return;

//     const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
//     setUsers(updatedUsers);
//     setIsDeleteDialogOpen(false);
//     setSelectedUser(null);
//   };

//   // تصفية المستخدمين
//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.department.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesRole = filterRole === "all" || user.role === filterRole;
//     const matchesStatus =
//       filterStatus === "all" || user.status === filterStatus;

//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   // الحصول على لون ودلالة الدور
//   const getRoleBadge = (role: string) => {
//     switch (role) {
//       case "admin":
//         return (
//           <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
//             مدير النظام
//           </Badge>
//         );
//       case "manager":
//         return (
//           <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
//             مدير
//           </Badge>
//         );
//       case "developer":
//         return (
//           <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
//             مطور
//           </Badge>
//         );
//       case "designer":
//         return (
//           <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30">
//             مصمم
//           </Badge>
//         );
//       case "viewer":
//         return (
//           <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
//             مشاهد
//           </Badge>
//         );
//       default:
//         return <Badge variant="secondary">{role}</Badge>;
//     }
//   };

//   // الحصول على لون ودلالة الحالة
//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "active":
//         return (
//           <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1 w-fit">
//             <CheckCircle className="w-3 h-3" /> نشط
//           </Badge>
//         );
//       case "inactive":
//         return (
//           <Badge className="bg-red-500/20 text-red-400 border-red-500/30 flex items-center gap-1 w-fit">
//             <XCircle className="w-3 h-3" /> غير نشط
//           </Badge>
//         );
//       case "pending":
//         return (
//           <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 flex items-center gap-1 w-fit">
//             <Clock className="w-3 h-3" /> قيد الانتظار
//           </Badge>
//         );
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* العنوان والإحصائيات */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-200">
//               إدارة المستخدمين
//             </h1>
//             <p className="text-slate-400 mt-2">
//               إدارة فريق العمل وأعضاء النظام
//             </p>
//           </div>

//           <Button
//             onClick={handleAddClick}
//             className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
//           >
//             <Plus className="w-4 h-4 ml-2" />
//             إضافة مستخدم
//           </Button>
//         </div>

//         {/* إحصائيات سريعة */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <Card className=" ">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-400 text-sm">إجمالي المستخدمين</p>
//                   <h3 className="text-2xl font-bold text-slate-200 mt-1">
//                     {users.length}
//                   </h3>
//                 </div>
//                 <div className="p-3 rounded-full bg-blue-500/20">
//                   <User className="w-6 h-6 text-blue-400" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-400 text-sm">المستخدمين النشطين</p>
//                   <h3 className="text-2xl font-bold text-slate-200 mt-1">
//                     {users.filter((u) => u.status === "active").length}
//                   </h3>
//                 </div>
//                 <div className="p-3 rounded-full bg-green-500/20">
//                   <CheckCircle className="w-6 h-6 text-green-400" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-400 text-sm">المسؤولين</p>
//                   <h3 className="text-2xl font-bold text-slate-200 mt-1">
//                     {
//                       users.filter(
//                         (u) => u.role === "admin" || u.role === "manager"
//                       ).length
//                     }
//                   </h3>
//                 </div>
//                 <div className="p-3 rounded-full bg-purple-500/20">
//                   <Shield className="w-6 h-6 text-purple-400" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-400 text-sm">قيد الانتظار</p>
//                   <h3 className="text-2xl font-bold text-slate-200 mt-1">
//                     {users.filter((u) => u.status === "pending").length}
//                   </h3>
//                 </div>
//                 <div className="p-3 rounded-full bg-yellow-500/20">
//                   <Clock className="w-6 h-6 text-yellow-400" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* الفلاتر والبحث */}
//         <Card className="">
//           <CardContent className="p-6">
//             <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//               <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
//                 <div className="relative flex-1 max-w-md">
//                   <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
//                   <Input
//                     placeholder="ابحث بالاسم، البريد أو القسم..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pr-10"
//                   />
//                 </div>

//                 <Select value={filterRole} onValueChange={setFilterRole}>
//                   <SelectTrigger className="w-40">
//                     <SelectValue placeholder="جميع الأدوار" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">جميع الأدوار</SelectItem>
//                     <SelectItem value="admin">مدير النظام</SelectItem>
//                     <SelectItem value="manager">مدير</SelectItem>
//                     <SelectItem value="developer">مطور</SelectItem>
//                     <SelectItem value="designer">مصمم</SelectItem>
//                     <SelectItem value="viewer">مشاهد</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <Select value={filterStatus} onValueChange={setFilterStatus}>
//                   <SelectTrigger className="w-40">
//                     <SelectValue placeholder="جميع الحالات" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">جميع الحالات</SelectItem>
//                     <SelectItem value="active">نشط</SelectItem>
//                     <SelectItem value="inactive">غير نشط</SelectItem>
//                     <SelectItem value="pending">قيد الانتظار</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Button
//                   variant={viewMode === "table" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setViewMode("table")}
//                   className="border-slate-600 text-slate-300 hover:bg-slate-700"
//                 >
//                   عرض الجدول
//                 </Button>
//                 <Button
//                   variant={viewMode === "cards" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setViewMode("cards")}
//                   className="border-slate-600 text-slate-300 hover:bg-slate-700"
//                 >
//                   عرض البطاقات
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* جدول/بطاقات المستخدمين */}
//         {viewMode === "table" ? (
//           <Card className="">
//             <CardHeader className="border-b border-slate-700/50">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-xl font-semibold text-slate-200">
//                   قائمة المستخدمين
//                 </CardTitle>
//                 <Badge className="bg-slate-700 text-slate-300">
//                   {filteredUsers.length} مستخدم
//                 </Badge>
//               </div>
//             </CardHeader>

//             <CardContent className="p-0">
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="border-slate-700/50 hover:bg-slate-700/20">
//                       <TableHead className="text-slate-300">المستخدم</TableHead>
//                       <TableHead className="text-slate-300">الدور</TableHead>
//                       <TableHead className="text-slate-300">الحالة</TableHead>
//                       <TableHead className="text-slate-300">القسم</TableHead>
//                       <TableHead className="text-slate-300">الموقع</TableHead>
//                       <TableHead className="text-slate-300">
//                         تاريخ الانضمام
//                       </TableHead>
//                       <TableHead className="text-slate-300 text-center">
//                         الإجراءات
//                       </TableHead>
//                     </TableRow>
//                   </TableHeader>

//                   <TableBody>
//                     {filteredUsers.map((user) => (
//                       <TableRow
//                         key={user.id}
//                         className="border-slate-700/30 hover:bg-slate-700/20"
//                       >
//                         <TableCell className="py-4">
//                           <div className="flex items-center gap-3">
//                             <Avatar className="w-10 h-10 ring-2 ring-cyan-500/30">
//                               <AvatarImage src={user.avatar} />
//                               <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
//                                 {user.name
//                                   .split(" ")
//                                   .map((n) => n[0])
//                                   .join("")}
//                               </AvatarFallback>
//                             </Avatar>
//                             <div>
//                               <p className="text-slate-200 font-medium">
//                                 {user.name}
//                               </p>
//                               <p className="text-slate-400 text-sm flex items-center gap-1">
//                                 <Mail className="w-3 h-3" /> {user.email}
//                               </p>
//                             </div>
//                           </div>
//                         </TableCell>

//                         <TableCell className="py-4">
//                           {getRoleBadge(user.role)}
//                         </TableCell>

//                         <TableCell className="py-4">
//                           {getStatusBadge(user.status)}
//                         </TableCell>

//                         <TableCell className="py-4">
//                           <span className="text-slate-300">
//                             {user.department}
//                           </span>
//                         </TableCell>

//                         <TableCell className="py-4">
//                           <span className="text-slate-300 flex items-center gap-1">
//                             <MapPin className="w-4 h-4" /> {user.location}
//                           </span>
//                         </TableCell>

//                         <TableCell className="py-4">
//                           <span className="text-slate-300 flex items-center gap-1">
//                             <Calendar className="w-4 h-4" /> {user.joinDate}
//                           </span>
//                         </TableCell>

//                         <TableCell className="py-4">
//                           <div className="flex items-center justify-center gap-2">
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="h-8 w-8 p-0 hover:bg-cyan-500/20 hover:text-cyan-400"
//                               onClick={() => handleEditClick(user)}
//                             >
//                               <Edit className="w-4 h-4" />
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400"
//                               onClick={() => handleDeleteClick(user)}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>

//               {filteredUsers.length === 0 && (
//                 <div className="text-center py-12">
//                   <div className="w-24 h-24 mx-auto mb-4 bg-slate-700/50 rounded-full flex items-center justify-center">
//                     <User className="w-12 h-12 text-slate-500" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-slate-300 mb-2">
//                     لا يوجد مستخدمين
//                   </h3>
//                   <p className="text-slate-500 mb-6">
//                     لم يتم العثور على مستخدمين ينطبقون على معايير البحث
//                   </p>
//                   <Button
//                     onClick={handleAddClick}
//                     className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
//                   >
//                     <Plus className="w-4 h-4 ml-2" />
//                     إضافة مستخدم جديد
//                   </Button>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredUsers.map((user) => (
//               <Card key={user.id} className="">
//                 <CardHeader className="pb-4">
//                   <div className="flex items-start justify-between">
//                     <Avatar className="w-14 h-14 ring-2 ring-cyan-500/30">
//                       <AvatarImage src={user.avatar} />
//                       <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg">
//                         {user.name
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                       </AvatarFallback>
//                     </Avatar>

//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent
//                         align="end"
//                         className="bg-slate-800 border-slate-700"
//                       >
//                         <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
//                         <DropdownMenuItem onClick={() => handleEditClick(user)}>
//                           <Edit className="w-4 h-4 ml-2" /> تعديل
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem
//                           className="text-red-400 focus:text-red-400 focus:bg-red-500/20"
//                           onClick={() => handleDeleteClick(user)}
//                         >
//                           <Trash2 className="w-4 h-4 ml-2" /> حذف
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>

//                   <div className="mt-4">
//                     <CardTitle className="text-lg text-slate-200">
//                       {user.name}
//                     </CardTitle>
//                     <CardDescription className="flex items-center gap-1 mt-1">
//                       <Mail className="w-4 h-4" /> {user.email}
//                     </CardDescription>
//                   </div>
//                 </CardHeader>

//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-slate-400">الدور:</span>
//                       {getRoleBadge(user.role)}
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-slate-400">الحالة:</span>
//                       {getStatusBadge(user.status)}
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-slate-400">القسم:</span>
//                       <span className="text-slate-200">{user.department}</span>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-slate-400">الموقع:</span>
//                       <span className="text-slate-200 flex items-center gap-1">
//                         <MapPin className="w-4 h-4" /> {user.location}
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-slate-400">تاريخ الانضمام:</span>
//                       <span className="text-slate-200 flex items-center gap-1">
//                         <Calendar className="w-4 h-4" /> {user.joinDate}
//                       </span>
//                     </div>

//                     {user.lastActive && (
//                       <div className="flex items-center justify-between">
//                         <span className="text-slate-400">آخر نشاط:</span>
//                         <span className="text-slate-200 text-sm">
//                           {user.lastActive.split(" ")[0]}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-700/50">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
//                       onClick={() => handleEditClick(user)}
//                     >
//                       <Edit className="w-4 h-4 ml-2" /> تعديل
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="border-red-600/50 text-red-400 hover:bg-red-500/20"
//                       onClick={() => handleDeleteClick(user)}
//                     >
//                       <Trash2 className="w-4 h-4 ml-2" /> حذف
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}

//             {filteredUsers.length === 0 && (
//               <div className="col-span-full text-center py-12">
//                 <div className="w-24 h-24 mx-auto mb-4 bg-slate-700/50 rounded-full flex items-center justify-center">
//                   <User className="w-12 h-12 text-slate-500" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-slate-300 mb-2">
//                   لا يوجد مستخدمين
//                 </h3>
//                 <p className="text-slate-500 mb-6">
//                   لم يتم العثور على مستخدمين ينطبقون على معايير البحث
//                 </p>
//                 <Button
//                   onClick={handleAddClick}
//                   className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
//                 >
//                   <Plus className="w-4 h-4 ml-2" />
//                   إضافة مستخدم جديد
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* نموذج إضافة مستخدم */}
//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-md">
//             <DialogHeader>
//               <DialogTitle className="text-xl">إضافة مستخدم جديد</DialogTitle>
//               <DialogDescription>
//                 املأ البيانات التالية لإضافة مستخدم جديد إلى النظام
//               </DialogDescription>
//             </DialogHeader>

//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmitAdd)}
//                 className="space-y-4 py-4"
//               >
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>الاسم الكامل</FormLabel>
//                       <FormControl>
//                         <Input placeholder="أدخل الاسم الكامل" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>البريد الإلكتروني</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="أدخل البريد الإلكتروني"
//                           type="email"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>رقم الهاتف</FormLabel>
//                       <FormControl>
//                         <Input placeholder="أدخل رقم الهاتف" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="grid grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="role"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>الدور</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="اختر الدور" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className="bg-slate-800 border-slate-700">
//                             <SelectItem value="admin">مدير النظام</SelectItem>
//                             <SelectItem value="manager">مدير</SelectItem>
//                             <SelectItem value="developer">مطور</SelectItem>
//                             <SelectItem value="designer">مصمم</SelectItem>
//                             <SelectItem value="viewer">مشاهد</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="status"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>الحالة</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="اختر الحالة" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className="bg-slate-800 border-slate-700">
//                             <SelectItem value="active">نشط</SelectItem>
//                             <SelectItem value="inactive">غير نشط</SelectItem>
//                             <SelectItem value="pending">
//                               قيد الانتظار
//                             </SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="department"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>القسم (اختياري)</FormLabel>
//                       <FormControl>
//                         <Input placeholder="أدخل اسم القسم" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="location"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>الموقع (اختياري)</FormLabel>
//                       <FormControl>
//                         <Input placeholder="أدخل الموقع" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="joinDate"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>تاريخ الانضمام</FormLabel>
//                       <FormControl>
//                         <Input type="date" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <DialogFooter className="pt-4">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => setIsAddDialogOpen(false)}
//                     className="border-slate-600 text-slate-300 hover:bg-slate-700"
//                   >
//                     إلغاء
//                   </Button>
//                   <Button
//                     type="submit"
//                     className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
//                   >
//                     إضافة المستخدم
//                   </Button>
//                 </DialogFooter>
//               </form>
//             </Form>
//           </DialogContent>
//         </Dialog>

//         {/* نموذج تعديل مستخدم */}
//         <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//           <DialogContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-md">
//             <DialogHeader>
//               <DialogTitle className="text-xl">
//                 تعديل بيانات المستخدم
//               </DialogTitle>
//               <DialogDescription>
//                 قم بتعديل البيانات التالية لتحديث معلومات المستخدم
//               </DialogDescription>
//             </DialogHeader>

//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmitEdit)}
//                 className="space-y-4 py-4"
//               >
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>الاسم الكامل</FormLabel>
//                       <FormControl>
//                         <Input placeholder="أدخل الاسم الكامل" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>البريد الإلكتروني</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="أدخل البريد الإلكتروني"
//                           type="email"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>رقم الهاتف</FormLabel>
//                       <FormControl>
//                         <Input placeholder="أدخل رقم الهاتف" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="grid grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="role"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>الدور</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="اختر الدور" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className="bg-slate-800 border-slate-700">
//                             <SelectItem value="admin">مدير النظام</SelectItem>
//                             <SelectItem value="manager">مدير</SelectItem>
//                             <SelectItem value="developer">مطور</SelectItem>
//                             <SelectItem value="designer">مصمم</SelectItem>
//                             <SelectItem value="viewer">مشاهد</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="status"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>الحالة</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="اختر الحالة" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className="bg-slate-800 border-slate-700">
//                             <SelectItem value="active">نشط</SelectItem>
//                             <SelectItem value="inactive">غير نشط</SelectItem>
//                             <SelectItem value="pending">
//                               قيد الانتظار
//                             </SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="department"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>القسم (اختياري)</FormLabel>
//                       <FormControl>
//                         <Input placeholder="أدخل اسم القسم" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="location"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>الموقع (اختياري)</FormLabel>
//                       <FormControl>
//                         <Input placeholder="أدخل الموقع" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="joinDate"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>تاريخ الانضمام</FormLabel>
//                       <FormControl>
//                         <Input type="date" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <DialogFooter className="pt-4">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => setIsEditDialogOpen(false)}
//                     className="border-slate-600 text-slate-300 hover:bg-slate-700"
//                   >
//                     إلغاء
//                   </Button>
//                   <Button
//                     type="submit"
//                     className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
//                   >
//                     حفظ التعديلات
//                   </Button>
//                 </DialogFooter>
//               </form>
//             </Form>
//           </DialogContent>
//         </Dialog>

//         {/* تأكيد الحذف */}
//         <AlertDialog
//           open={isDeleteDialogOpen}
//           onOpenChange={setIsDeleteDialogOpen}
//         >
//           <AlertDialogContent className="bg-slate-800 border-slate-700 text-slate-200">
//             <AlertDialogHeader>
//               <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
//               <AlertDialogDescription>
//                 هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المستخدم{" "}
//                 <span className="font-semibold text-slate-200">
//                   {selectedUser?.name}
//                 </span>{" "}
//                 بشكل دائم من النظام.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">
//                 إلغاء
//               </AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={handleDelete}
//                 className="bg-red-500 text-white hover:bg-red-600"
//               >
//                 حذف
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </div>
//   );
// }

"use client";
import { UsersPage } from "@/modules/users/features/clientsBoard/UsersPage";
import { User } from "@/modules/users/types/user";
import * as z from "zod";

// Types

// Validation Schema
export const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "يجب أن يكون الاسم أكثر من حرفين.",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صحيح.",
  }),
  phone: z.string().min(10, {
    message: "يجب أن يكون رقم الهاتف مكون من 10 أرقام على الأقل.",
  }),
  role: z.string().min(1, "يرجى اختيار حالة العميل."),
  type: z.string().min(1, "يرجى اختيار نوع العميل."),

  department: z.string().optional(),
  location: z.string().optional(),
  joinDate: z.string().optional(),
});

// Mock Data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "عبداللطيف الخالدي",
    email: "abdullatif@example.com",
    phone: "+966512345678",
    role: "admin",
    status: "active",
    department: "التطوير",
    location: "الرياض",
    joinDate: "2024-01-15",
    lastActive: "2024-03-20 14:30",
  },
  {
    id: "2",
    name: "أحمد السعدي",
    email: "ahmed@example.com",
    phone: "+966511223344",
    role: "developer",
    status: "active",
    department: "التطوير",
    location: "جدة",
    joinDate: "2024-02-10",
    lastActive: "2024-03-20 12:45",
  },
  {
    id: "3",
    name: "سارة العتيبي",
    email: "sara@example.com",
    phone: "+966544332211",
    role: "designer",
    status: "active",
    department: "التصميم",
    location: "الدمام",
    joinDate: "2024-01-20",
    lastActive: "2024-03-19 16:20",
  },
  {
    id: "4",
    name: "محمد الحربي",
    email: "mohammed@example.com",
    phone: "+966587654321",
    role: "manager",
    status: "inactive",
    department: "الإدارة",
    location: "الرياض",
    joinDate: "2023-12-05",
    lastActive: "2024-03-15 09:15",
  },
];

export default function Users() {
  return <UsersPage initialClients={mockUsers} type={"USERS"} />;
}

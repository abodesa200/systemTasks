"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Edit,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// تعريف نموذج البيانات باستخدام Zod
const clientFormSchema = z.object({
  name: z.string().min(2, {
    message: "يجب أن يكون الاسم أكثر من حرفين.",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صحيح.",
  }),
  phone: z.string().min(10, {
    message: "يجب أن يكون رقم الهاتف مكون من 10 أرقام على الأقل.",
  }),
  company: z.string().min(2, {
    message: "يجب أن يكون اسم الشركة أكثر من حرفين.",
  }),
  status: z.string({
    required_error: "يرجى اختيار حالة العميل.",
  }),
  type: z.string({
    required_error: "يرجى اختيار نوع العميل.",
  }),
  industry: z.string().optional(),
  address: z.string().optional(),
  joinDate: z.string().optional(),
  creditLimit: z.number().optional(),
});

// نوع بيانات العميل
interface Client {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone: string;
  company: string;
  status: "active" | "inactive" | "pending";
  type: "individual" | "corporate" | "government";
  industry: string;
  address: string;
  joinDate: string;
  creditLimit?: number;
  totalSpent?: number;
  lastPurchase?: string;
}

// بيانات تجريبية للعملاء
const mockClients: Client[] = [
  {
    id: "1",
    name: "أحمد السعدي",
    email: "ahmed@alsaudi.com",
    phone: "+966512345678",
    company: "شركة السعدي للتجارة",
    status: "active",
    type: "corporate",
    industry: "التجارة",
    address: "الرياض، حي العليا",
    joinDate: "2023-05-15",
    creditLimit: 50000,
    totalSpent: 125000,
    lastPurchase: "2024-03-18",
  },
  {
    id: "2",
    name: "محمد القحطاني",
    email: "mohammed@alqhtani.com",
    phone: "+966511223344",
    company: "مجموعة القحطاني",
    status: "active",
    type: "corporate",
    industry: "العقارات",
    address: "جدة، حي الصفا",
    joinDate: "2023-08-10",
    creditLimit: 100000,
    totalSpent: 285000,
    lastPurchase: "2024-03-20",
  },
  {
    id: "3",
    name: "سارة العتيبي",
    email: "sara@ateibi.com",
    phone: "+966544332211",
    company: "مكتب العتيبي للاستشارات",
    status: "active",
    type: "individual",
    industry: "الاستشارات",
    address: "الدمام، حي النخيل",
    joinDate: "2024-01-20",
    creditLimit: 20000,
    totalSpent: 45000,
    lastPurchase: "2024-03-15",
  },
  {
    id: "4",
    name: "فهد الحربي",
    email: "fahad@alharbi.com",
    phone: "+966587654321",
    company: "أفراد",
    status: "inactive",
    type: "individual",
    industry: "الخدمات",
    address: "الرياض، حي الملز",
    joinDate: "2023-11-05",
    creditLimit: 10000,
    totalSpent: 15000,
    lastPurchase: "2024-02-15",
  },
  {
    id: "5",
    name: "نورة الشمري",
    email: "noura@alshammari.com",
    phone: "+966576543210",
    company: "مؤسسة الشمري",
    status: "pending",
    type: "corporate",
    industry: "التصنيع",
    address: "الرياض، حي الغدير",
    joinDate: "2024-03-01",
    creditLimit: 75000,
    totalSpent: 0,
    lastPurchase: "",
  },
  {
    id: "6",
    name: "وزارة التعليم",
    email: "contact@edu.gov.sa",
    phone: "+966112345678",
    company: "وزارة التعليم",
    status: "active",
    type: "government",
    industry: "الحكومة",
    address: "الرياض، الحي الدبلوماسي",
    joinDate: "2022-12-01",
    creditLimit: 500000,
    totalSpent: 1250000,
    lastPurchase: "2024-03-10",
  },
];

export default function ClientsManagementPage() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  // تهيئة النموذج
  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "active",
      type: "individual",
      industry: "",
      address: "",
      joinDate: new Date().toISOString().split("T")[0],
      creditLimit: 0,
    },
  });

  // فتح نموذج الإضافة
  const handleAddClick = () => {
    setSelectedClient(null);
    form.reset();
    setIsAddDialogOpen(true);
  };

  // فتح نموذج التعديل
  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    form.reset({
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      status: client.status,
      type: client.type,
      industry: client.industry,
      address: client.address,
      joinDate: client.joinDate,
      creditLimit: client.creditLimit || 0,
    });
    setIsEditDialogOpen(true);
  };

  // فتح تأكيد الحذف
  const handleDeleteClick = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteDialogOpen(true);
  };

  // إضافة عميل جديد
  const onSubmitAdd = (values: z.infer<typeof clientFormSchema>) => {
    const newClient: Client = {
      id: (clients.length + 1).toString(),
      ...values,
      totalSpent: 0,
    };
    setClients([...clients, newClient]);
    setIsAddDialogOpen(false);
    form.reset();
  };

  // تعديل عميل
  const onSubmitEdit = (values: z.infer<typeof clientFormSchema>) => {
    if (!selectedClient) return;

    const updatedClients = clients.map((client) =>
      client.id === selectedClient.id ? { ...client, ...values } : client
    );

    setClients(updatedClients);
    setIsEditDialogOpen(false);
    setSelectedClient(null);
  };

  // حذف عميل
  const handleDelete = () => {
    if (!selectedClient) return;

    const updatedClients = clients.filter(
      (client) => client.id !== selectedClient.id
    );
    setClients(updatedClients);
    setIsDeleteDialogOpen(false);
    setSelectedClient(null);
  };

  // تصفية العملاء
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || client.type === filterType;
    const matchesStatus =
      filterStatus === "all" || client.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // الحصول على لون ودلالة النوع
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "individual":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            فرد
          </Badge>
        );
      case "corporate":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            شركة
          </Badge>
        );
      case "government":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            حكومي
          </Badge>
        );
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  // الحصول على لون ودلالة الحالة
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1 w-fit">
            <CheckCircle className="w-3 h-3" /> نشط
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 flex items-center gap-1 w-fit">
            <XCircle className="w-3 h-3" /> غير نشط
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 flex items-center gap-1 w-fit">
            <Clock className="w-3 h-3" /> قيد الانتظار
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // تنسيق المبالغ المالية
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* العنوان والإحصائيات */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">إدارة العملاء</h1>
            <p className="text-slate-400 mt-2">
              إدارة قاعدة عملاء المنشأة والجهات المتعاقدة
            </p>
          </div>

          <Button
            onClick={handleAddClick}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة عميل
          </Button>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">إجمالي العملاء</p>
                  <h3 className="text-2xl font-bold text-slate-200 mt-1">
                    {clients.length}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-blue-500/20">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">العملاء النشطين</p>
                  <h3 className="text-2xl font-bold text-slate-200 mt-1">
                    {clients.filter((c) => c.status === "active").length}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-green-500/20">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">إجمالي الإنفاق</p>
                  <h3 className="text-2xl font-bold text-slate-200 mt-1">
                    {formatCurrency(
                      clients.reduce(
                        (sum, client) => sum + (client.totalSpent || 0),
                        0
                      )
                    )}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-purple-500/20">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">الحد الائتماني</p>
                  <h3 className="text-2xl font-bold text-slate-200 mt-1">
                    {formatCurrency(
                      clients.reduce(
                        (sum, client) => sum + (client.creditLimit || 0),
                        0
                      )
                    )}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-cyan-500/20">
                  <Building className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* الفلاتر والبحث */}
        <Card className="">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="ابحث بالاسم، البريد أو الشركة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 bg-slate-700/50 border-slate-600"
                  />
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600">
                    <SelectValue placeholder="جميع الأنواع" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    <SelectItem value="individual">أفراد</SelectItem>
                    <SelectItem value="corporate">شركات</SelectItem>
                    <SelectItem value="government">جهات حكومية</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600">
                    <SelectValue placeholder="جميع الحالات" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                    <SelectItem value="pending">قيد الانتظار</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  عرض الجدول
                </Button>
                <Button
                  variant={viewMode === "cards" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className="border-slate-600  hover:bg-slate-700"
                >
                  عرض البطاقات
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* جدول/بطاقات العملاء */}
        {viewMode === "table" ? (
          <Card className="">
            <CardHeader className="border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-200">
                  قائمة العملاء
                </CardTitle>
                <Badge className="bg-slate-700 text-slate-300">
                  {filteredClients.length} عميل
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700/50 hover:bg-slate-700/20">
                      <TableHead className="text-slate-300">العميل</TableHead>
                      <TableHead className="text-slate-300">النوع</TableHead>
                      <TableHead className="text-slate-300">الحالة</TableHead>
                      <TableHead className="text-slate-300">الشركة</TableHead>
                      <TableHead className="text-slate-300">
                        الحد الائتماني
                      </TableHead>
                      <TableHead className="text-slate-300">
                        إجمالي الإنفاق
                      </TableHead>
                      <TableHead className="text-slate-300 text-center">
                        الإجراءات
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredClients.map((client) => (
                      <TableRow
                        key={client.id}
                        className="border-slate-700/30 hover:bg-slate-700/20"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 ring-2 ring-cyan-500/30">
                              <AvatarImage src={client.avatar} />
                              <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                                {client.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-slate-200 font-medium">
                                {client.name}
                              </p>
                              <p className="text-slate-400 text-sm flex items-center gap-1">
                                <Mail className="w-3 h-3" /> {client.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="py-4">
                          {getTypeBadge(client.type)}
                        </TableCell>

                        <TableCell className="py-4">
                          {getStatusBadge(client.status)}
                        </TableCell>

                        <TableCell className="py-4">
                          <span className="text-slate-300">
                            {client.company}
                          </span>
                        </TableCell>

                        <TableCell className="py-4">
                          <span className="text-slate-300">
                            {formatCurrency(client.creditLimit || 0)}
                          </span>
                        </TableCell>

                        <TableCell className="py-4">
                          <span className="text-slate-300">
                            {formatCurrency(client.totalSpent || 0)}
                          </span>
                        </TableCell>

                        <TableCell className="py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-cyan-500/20 hover:text-cyan-400"
                              onClick={() => handleEditClick(client)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400"
                              onClick={() => handleDeleteClick(client)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredClients.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-slate-700/50 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-300 mb-2">
                    لا يوجد عملاء
                  </h3>
                  <p className="text-slate-500 mb-6">
                    لم يتم العثور على عملاء ينطبقون على معايير البحث
                  </p>
                  <Button
                    onClick={handleAddClick}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة عميل جديد
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <Card key={client.id} className="">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <Avatar className="w-14 h-14 ring-2 ring-cyan-500/30">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg">
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-slate-800 border-slate-700"
                      >
                        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleEditClick(client)}
                        >
                          <Edit className="w-4 h-4 ml-2" /> تعديل
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-400 focus:text-red-400 focus:bg-red-500/20"
                          onClick={() => handleDeleteClick(client)}
                        >
                          <Trash2 className="w-4 h-4 ml-2" /> حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-4">
                    <CardTitle className="text-lg text-slate-200">
                      {client.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Building className="w-4 h-4" /> {client.company}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">النوع:</span>
                      {getTypeBadge(client.type)}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">الحالة:</span>
                      {getStatusBadge(client.status)}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">البريد:</span>
                      <span className="text-slate-200 flex items-center gap-1">
                        <Mail className="w-4 h-4" /> {client.email}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">الهاتف:</span>
                      <span className="text-slate-200 flex items-center gap-1">
                        <Phone className="w-4 h-4" /> {client.phone}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">الحد الائتماني:</span>
                      <span className="text-slate-200">
                        {formatCurrency(client.creditLimit || 0)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">إجمالي الإنفاق:</span>
                      <span className="text-slate-200">
                        {formatCurrency(client.totalSpent || 0)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">تاريخ الانضمام:</span>
                      <span className="text-slate-200 flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {client.joinDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-700/50">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                      onClick={() => handleEditClick(client)}
                    >
                      <Edit className="w-4 h-4 ml-2" /> تعديل
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-600/50 text-red-400 hover:bg-red-500/20"
                      onClick={() => handleDeleteClick(client)}
                    >
                      <Trash2 className="w-4 h-4 ml-2" /> حذف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredClients.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-slate-700/50 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-300 mb-2">
                  لا يوجد عملاء
                </h3>
                <p className="text-slate-500 mb-6">
                  لم يتم العثور على عملاء ينطبقون على معايير البحث
                </p>
                <Button
                  onClick={handleAddClick}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة عميل جديد
                </Button>
              </div>
            )}
          </div>
        )}

        {/* نموذج إضافة عميل */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">إضافة عميل جديد</DialogTitle>
              <DialogDescription>
                املأ البيانات التالية لإضافة عميل جديد إلى النظام
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitAdd)}
                className="space-y-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل الاسم الكامل"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل البريد الإلكتروني"
                          type="email"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل رقم الهاتف"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم الشركة</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل اسم الشركة"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع العميل</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600">
                              <SelectValue placeholder="اختر النوع" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="individual">فرد</SelectItem>
                            <SelectItem value="corporate">شركة</SelectItem>
                            <SelectItem value="government">
                              جهة حكومية
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الحالة</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600">
                              <SelectValue placeholder="اختر الحالة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="active">نشط</SelectItem>
                            <SelectItem value="inactive">غير نشط</SelectItem>
                            <SelectItem value="pending">
                              قيد الانتظار
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المجال/الصناعة (اختياري)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل المجال أو الصناعة"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العنوان (اختياري)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل العنوان"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="creditLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الحد الائتماني (اختياري)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="joinDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تاريخ الانضمام</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    إضافة العميل
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* نموذج تعديل عميل */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">تعديل بيانات العميل</DialogTitle>
              <DialogDescription>
                قم بتعديل البيانات التالية لتحديث معلومات العميل
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitEdit)}
                className="space-y-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل الاسم الكامل"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل البريد الإلكتروني"
                          type="email"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل رقم الهاتف"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم الشركة</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل اسم الشركة"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع العميل</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600">
                              <SelectValue placeholder="اختر النوع" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="individual">فرد</SelectItem>
                            <SelectItem value="corporate">شركة</SelectItem>
                            <SelectItem value="government">
                              جهة حكومية
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الحالة</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600">
                              <SelectValue placeholder="اختر الحالة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="active">نشط</SelectItem>
                            <SelectItem value="inactive">غير نشط</SelectItem>
                            <SelectItem value="pending">
                              قيد الانتظار
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المجال/الصناعة (اختياري)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل المجال أو الصناعة"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العنوان (اختياري)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل العنوان"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="creditLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الحد الائتماني (اختياري)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="joinDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تاريخ الانضمام</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-slate-700/50 border-slate-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    حفظ التعديلات
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* تأكيد الحذف */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent className="bg-slate-800 border-slate-700 text-slate-200">
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
              <AlertDialogDescription>
                هذا الإجراء لا يمكن التراجع عنه. سيتم حذف العميل{" "}
                <span className="font-semibold text-slate-200">
                  {selectedClient?.name}
                </span>{" "}
                بشكل دائم من النظام.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">
                إلغاء
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                حذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

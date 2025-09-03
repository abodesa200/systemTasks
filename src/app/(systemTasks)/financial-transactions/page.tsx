"use client";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Banknote,
  CalendarDays,
  CreditCard,
  Edit,
  Filter,
  Plus,
  Receipt,
  Search,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TransactionForm } from "./AddOrUpdateTransition";
import { initialTransactions, teamMembers } from "./data";

export default function AccountingSystem() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    category: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    status: "مكتمل",
  });
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [financialOverview, setFinancialOverview] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // حساب الإحصائيات المالية
  useEffect(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income" && t.status === "مكتمل")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense" && t.status === "مكتمل")
      .reduce((sum, t) => sum + t.amount, 0);

    setFinancialOverview({
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
    });
  }, [transactions]);

  // إضافة معاملة جديدة
  const handleAddTransaction = () => {
    if (
      !newTransaction.category ||
      !newTransaction.description ||
      !newTransaction.amount
    )
      return;

    const transaction = {
      id: transactions.length + 1,
      ...newTransaction,
      amount: Number(newTransaction.amount),
    };

    setTransactions([...transactions, transaction]);
    setNewTransaction({
      type: "expense",
      category: "",
      description: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      status: "مكتمل",
    });
    setDialogOpen(false);
  };

  // تعديل معاملة
  const handleEditTransaction = () => {
    if (!editingTransaction) return;

    setTransactions(
      transactions.map((t) =>
        t.id === editingTransaction.id ? editingTransaction : t
      )
    );
    setEditingTransaction(null);
  };

  // حذف معاملة
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // فتح نافذة التعديل
  const openEditDialog = (transaction) => {
    setEditingTransaction({ ...transaction });
  };

  // تصفية المعاملات
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === "all" || transaction.type === filter;
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // حساب إجمالي الرواتب
  const totalSalaries = teamMembers.reduce(
    (sum, member) => sum + member.salary,
    0
  );

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* نظرة عامة على الوضع المالي */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                إجمالي الإيرادات
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {financialOverview.totalIncome.toLocaleString()} ر.س
              </div>
              <p className="text-xs text-green-600 mt-1">
                +20% عن الشهر الماضي
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                إجمالي المصروفات
              </CardTitle>
              <TrendingDown className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">
                {financialOverview.totalExpenses.toLocaleString()} ر.س
              </div>
              <p className="text-xs text-red-600 mt-1">+5% عن الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                الرصيد الحالي
              </CardTitle>
              <Wallet className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  financialOverview.balance >= 0
                    ? "text-blue-700"
                    : "text-amber-700"
                }`}
              >
                {financialOverview.balance.toLocaleString()} ر.س
              </div>
              <p className="text-xs text-gray-600 mt-1">صافي الربح</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* قسم المعاملات */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex ">
                <CardTitle className="flex items-center">
                  <Receipt className="h-5 w-5 ml-2 text-gray-700" />
                  إدارة المعاملات
                </CardTitle>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="بحث في المعاملات..."
                      className="pr-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 ml-2" />
                      <SelectValue placeholder="تصفية حسب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="income">الإيرادات</SelectItem>
                      <SelectItem value="expense">المصروفات</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 ml-2" />
                        معاملة جديدة
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>إضافة معاملة جديدة</DialogTitle>
                        <DialogDescription>
                          قم بإضافة معاملة مالية جديدة إلى النظام
                        </DialogDescription>
                      </DialogHeader>
                      <TransactionForm
                        transaction={newTransaction}
                        onChange={setNewTransaction}
                        onSubmit={handleAddTransaction}
                        isEditing={false}
                        onClose={() => setDialogOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-b-lg overflow-hidden">
                  <Table>
                    <TableHeader className="">
                      <TableRow>
                        <TableHead>النوع</TableHead>
                        <TableHead>الفئة</TableHead>
                        <TableHead>الوصف</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead className="text-center">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow
                          key={transaction.id}
                          className="hover:bg-gray-50/50"
                        >
                          <TableCell>
                            <Badge
                              variant={
                                transaction.type === "income"
                                  ? "default"
                                  : "destructive"
                              }
                              className="flex items-center justify-center w-16"
                            >
                              {transaction.type === "income"
                                ? "إيراد"
                                : "مصروف"}
                            </Badge>
                          </TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell className="font-medium max-w-xs truncate">
                            {transaction.description}
                          </TableCell>
                          <TableCell
                            className={
                              transaction.type === "income"
                                ? "text-green-600 font-medium"
                                : "text-red-600 font-medium"
                            }
                          >
                            {transaction.amount.toLocaleString()} ر.س
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CalendarDays className="h-3 w-3 ml-1 text-gray-500" />
                              {transaction.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.status === "مكتمل"
                                  ? "default"
                                  : transaction.status === "معلق"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(transaction)}
                              >
                                <Edit className="h-4 w-4 text-blue-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleDeleteTransaction(transaction.id)
                                }
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* القسم الجانبي */}
          <div className="space-y-6">
            {/* إدارة الرواتب */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 ml-2 text-blue-700" />
                  إدارة الرواتب
                </CardTitle>
                <CardDescription>رواتب فريق العمل الشهرية</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex justify-between items-center p-3 border rounded-lg "
                    >
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                      <div className="text-green-600 font-medium">
                        {member.salary.toLocaleString()} ر.س
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 border-t mt-2 font-bold">
                    <p>الإجمالي</p>
                    <p className="text-red-600">
                      {totalSalaries.toLocaleString()} ر.س
                    </p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  <Banknote className="h-4 w-4 ml-2" />
                  دفع الرواتب
                </Button>
              </CardContent>
            </Card>

            {/* الميزانية */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 ml-2 text-amber-700" />
                  ميزانية المشروع
                </CardTitle>
                <CardDescription>
                  تتبع الميزانية versus المصروفات الفعلية
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الميزانية المخصصة</span>
                    <span className="font-medium">25,000 ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المصروفات الفعلية</span>
                    <span className="font-medium text-red-600">13,700 ر.س</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-medium">
                    <span className="text-gray-700">المتبقي</span>
                    <span className="text-green-600">11,300 ر.س</span>
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${(13700 / 25000) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 ر.س</span>
                  <span>25,000 ر.س</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Edit className="h-4 w-4 ml-2" />
                  تعديل الميزانية
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* نافذة تعديل المعاملة */}
      <Dialog
        open={!!editingTransaction}
        onOpenChange={(open) => !open && setEditingTransaction(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>تعديل المعاملة</DialogTitle>
            <DialogDescription>قم بتعديل المعاملة المالية</DialogDescription>
          </DialogHeader>
          {editingTransaction && (
            <TransactionForm
              transaction={editingTransaction}
              onChange={setEditingTransaction}
              onSubmit={handleEditTransaction}
              isEditing={true}
              onClose={() => setEditingTransaction(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

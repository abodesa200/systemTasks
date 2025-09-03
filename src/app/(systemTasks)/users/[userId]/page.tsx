"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  BarChart3,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  RefreshCw,
  Search,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// أنواع البيانات
interface Transaction {
  id: string;
  date: string;
  type: string;
  description: string;
  category: string;
  amount: number;
  status: string;
  reference: string;
  relatedUser?: string;
}

interface MonthlyStat {
  month: string;
  income: number;
  expense: number;
}

interface WalletData {
  userName: string;
  balance: number;
  totalIncome: number;
  totalExpense: number;
  pendingAmount: number;
  monthlyStats: MonthlyStat[];
  transactions: Transaction[];
}

// دالة لجلب بيانات المحفظة من API
const getWalletData = async (
  userId: string | string[]
): Promise<WalletData | null> => {
  try {
    // في التطبيق الحقيقي، ستجلب البيانات من API
    // const response = await fetch(`/api/wallet/${userId}`);
    // const data = await response.json();
    // return data;

    // بيانات وهمية للاختبار
    return {
      userName: "أحمد محمد",
      balance: 12500,
      totalIncome: 20000,
      totalExpense: 7500,
      pendingAmount: 1500,
      monthlyStats: [
        { month: "يناير 2024", income: 5000, expense: 2000 },
        { month: "فبراير 2024", income: 6000, expense: 2500 },
        { month: "مارس 2024", income: 9000, expense: 3000 },
      ],
      transactions: [
        {
          id: "1",
          date: "2024-03-15",
          type: "income",
          description: "راتب شهر مارس",
          category: "رواتب",
          amount: 5000,
          status: "completed",
          reference: "REF-001",
        },
        {
          id: "2",
          date: "2024-03-10",
          type: "expense",
          description: "فاتورة كهرباء",
          category: "مرافق",
          amount: 350,
          status: "completed",
          reference: "REF-002",
        },
        {
          id: "3",
          date: "2024-03-05",
          type: "transfer_in",
          description: "تحويل من علي",
          category: "تحويلات",
          amount: 1000,
          status: "completed",
          reference: "REF-003",
          relatedUser: "علي أحمد",
        },
        {
          id: "4",
          date: "2024-03-01",
          type: "bonus",
          description: "مكافأة أداء",
          category: "مكافآت",
          amount: 1500,
          status: "completed",
          reference: "REF-004",
        },
        {
          id: "5",
          date: "2024-02-28",
          type: "deduction",
          description: "خصم تأخير",
          category: "خصومات",
          amount: 200,
          status: "completed",
          reference: "REF-005",
        },
        {
          id: "6",
          date: "2024-02-25",
          type: "transfer_out",
          description: "تحويل إلى سارة",
          category: "تحويلات",
          amount: 500,
          status: "pending",
          reference: "REF-006",
          relatedUser: "سارة خالد",
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return null;
  }
};

// دالة لتنسيق المبالغ المالية
const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
  }).format(amount);
};

// دالة للحصول على Badge لنوع المعاملة
const getTransactionTypeBadge = (type: string): JSX.Element => {
  const typeConfig: {
    [key: string]: {
      label: string;
      variant: "default" | "secondary" | "destructive" | "outline";
      className: string;
    };
  } = {
    income: {
      label: "إيراد",
      variant: "default",
      className: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    expense: {
      label: "مصروف",
      variant: "destructive",
      className: "bg-red-500/20 text-red-400 border-red-500/30",
    },
    transfer_in: {
      label: "تحويل وارد",
      variant: "secondary",
      className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    transfer_out: {
      label: "تحويل صادر",
      variant: "secondary",
      className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    },
    bonus: {
      label: "مكافأة",
      variant: "default",
      className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    },
    deduction: {
      label: "خصم",
      variant: "destructive",
      className: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    },
  };

  const config = typeConfig[type] || {
    label: type,
    variant: "outline",
    className: "",
  };

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
};

// دالة للحصول على Badge لحالة المعاملة
const getTransactionStatusBadge = (status: string): JSX.Element => {
  const statusConfig: {
    [key: string]: {
      label: string;
      variant: "default" | "secondary" | "destructive" | "outline";
      className: string;
    };
  } = {
    completed: {
      label: "مكتمل",
      variant: "default",
      className: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    pending: {
      label: "قيد الانتظار",
      variant: "outline",
      className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    },
    failed: {
      label: "فاشل",
      variant: "destructive",
      className: "bg-red-500/20 text-red-400 border-red-500/30",
    },
    cancelled: {
      label: "ملغى",
      variant: "destructive",
      className: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    },
  };

  const config = statusConfig[status] || {
    label: status,
    variant: "outline",
    className: "",
  };

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
};

const WalletPage = () => {
  const { userId } = useParams();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [walletSearchTerm, setWalletSearchTerm] = useState("");
  const [walletFilter, setWalletFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // جلب بيانات المحفظة عند تحميل الصفحة
    const fetchWalletData = async () => {
      setIsLoading(true);
      try {
        const data = await getWalletData(userId);
        setWalletData(data);
      } catch (error) {
        console.error("Failed to fetch wallet data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchWalletData();
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-slate-200">جاري تحميل بيانات المحفظة...</div>
      </div>
    );
  }

  if (!walletData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-slate-200">لم يتم العثور على بيانات المحفظة</div>
      </div>
    );
  }

  // تصفية المعاملات
  const filteredTransactions = walletData.transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(walletSearchTerm.toLowerCase()) ||
      transaction.category
        .toLowerCase()
        .includes(walletSearchTerm.toLowerCase());
    const matchesFilter =
      walletFilter === "all" || transaction.type === walletFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* رأس الصفحة */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Wallet className="w-8 h-8 text-cyan-400" />
              محفظة {walletData.userName}
            </h1>
            <p className="text-slate-400 mt-2">
              عرض شامل للمحفظة المالية وكشف الحساب
            </p>
          </div>
          <Button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
          >
            رجوع
          </Button>
        </div>

        {/* ملخص المحفظة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">
                    الرصيد الحالي
                  </p>
                  <h3 className="text-2xl font-bold text-green-400 mt-1">
                    {formatAmount(walletData.balance)}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-green-500/20">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">
                    إجمالي الإيرادات
                  </p>
                  <h3 className="text-2xl font-bold text-blue-400 mt-1">
                    {formatAmount(walletData.totalIncome)}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-blue-500/20">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-400 text-sm font-medium">
                    إجمالي المصروفات
                  </p>
                  <h3 className="text-2xl font-bold text-red-400 mt-1">
                    {formatAmount(walletData.totalExpense)}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-red-500/20">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-400 text-sm font-medium">
                    المبلغ المعلق
                  </p>
                  <h3 className="text-2xl font-bold text-yellow-400 mt-1">
                    {formatAmount(walletData.pendingAmount)}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-yellow-500/20">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* إحصائيات شهرية */}
        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              الإحصائيات الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {walletData.monthlyStats.map((month, index) => (
                <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-200 mb-3">
                    {month.month}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 text-sm">إيرادات:</span>
                      <span className="text-green-400 font-semibold">
                        {formatAmount(month.income)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-400 text-sm">مصروفات:</span>
                      <span className="text-red-400 font-semibold">
                        {formatAmount(month.expense)}
                      </span>
                    </div>
                    <div className="border-t border-slate-600 pt-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">الصافي:</span>
                        <span
                          className={`font-semibold ${
                            month.income - month.expense >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {formatAmount(month.income - month.expense)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* كشف الحساب */}
        <Card className="">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                كشف الحساب التفصيلي
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Download className="w-4 h-4 ml-2" />
                  تصدير PDF
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="w-4 h-4 ml-2" />
                  تحديث
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* فلاتر البحث */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="ابحث في المعاملات..."
                  value={walletSearchTerm}
                  onChange={(e) => setWalletSearchTerm(e.target.value)}
                  className="pr-10 bg-slate-700/50 border-slate-600"
                />
              </div>
              <Select value={walletFilter} onValueChange={setWalletFilter}>
                <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600">
                  <SelectValue placeholder="نوع المعاملة" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">جميع المعاملات</SelectItem>
                  <SelectItem value="income">إيرادات</SelectItem>
                  <SelectItem value="expense">مصروفات</SelectItem>
                  <SelectItem value="transfer_in">تحويلات واردة</SelectItem>
                  <SelectItem value="transfer_out">تحويلات صادرة</SelectItem>
                  <SelectItem value="bonus">مكافآت</SelectItem>
                  <SelectItem value="deduction">خصومات</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* جدول المعاملات */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-right text-slate-300 text-sm font-medium p-3">
                      التاريخ
                    </th>
                    <th className="text-right text-slate-300 text-sm font-medium p-3">
                      النوع
                    </th>
                    <th className="text-right text-slate-300 text-sm font-medium p-3">
                      الوصف
                    </th>
                    <th className="text-right text-slate-300 text-sm font-medium p-3">
                      الفئة
                    </th>
                    <th className="text-right text-slate-300 text-sm font-medium p-3">
                      المبلغ
                    </th>
                    <th className="text-right text-slate-300 text-sm font-medium p-3">
                      الحالة
                    </th>
                    <th className="text-right text-slate-300 text-sm font-medium p-3">
                      المرجع
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                    >
                      <td className="p-3">
                        <span className="text-slate-300 text-sm">
                          {new Date(transaction.date).toLocaleDateString(
                            "ar-SA"
                          )}
                        </span>
                      </td>
                      <td className="p-3">
                        {getTransactionTypeBadge(transaction.type)}
                      </td>
                      <td className="p-3">
                        <div>
                          <p className="text-slate-200 font-medium">
                            {transaction.description}
                          </p>
                          {transaction.relatedUser && (
                            <p className="text-slate-400 text-xs mt-1">
                              {transaction.type === "transfer_in"
                                ? "من: "
                                : "إلى: "}
                              {transaction.relatedUser}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className="border-slate-600 text-slate-300"
                        >
                          {transaction.category}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-semibold ${
                            transaction.type === "income" ||
                            transaction.type === "transfer_in" ||
                            transaction.type === "bonus"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {transaction.type === "income" ||
                          transaction.type === "transfer_in" ||
                          transaction.type === "bonus"
                            ? "+"
                            : "-"}
                          {formatAmount(transaction.amount)}
                        </span>
                      </td>
                      <td className="p-3">
                        {getTransactionStatusBadge(transaction.status)}
                      </td>
                      <td className="p-3">
                        <span className="text-slate-400 text-sm font-mono">
                          {transaction.reference}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-slate-700/50 rounded-full flex items-center justify-center">
                    <CreditCard className="w-8 h-8 text-slate-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-2">
                    لا توجد معاملات
                  </h3>
                  <p className="text-slate-500">
                    لم يتم العثور على معاملات تطابق معايير البحث
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletPage;

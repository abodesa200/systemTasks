import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, CreditCard, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { Transaction } from "../types/wallet";
import {
  formatAmount,
  getTransactionTypeBadge,
  getTransactionStatusBadge,
} from "../utils/walletHelpers";

interface TransactionsTableProps {
  transactions: Transaction[];
  searchTerm: string;
  filter: string;
  onSearchChange: (term: string) => void;
  onFilterChange: (filter: string) => void;
  onRefresh: () => void;
}

export const TransactionsTable = ({
  transactions,
  searchTerm,
  filter,
  onSearchChange,
  onFilterChange,
  onRefresh,
}: TransactionsTableProps) => {
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || transaction.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
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
              onClick={onRefresh}
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
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10 bg-slate-700/50 border-slate-600"
            />
          </div>
          <Select value={filter} onValueChange={onFilterChange}>
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

        {/* جدول المعاملات باستخدام Shadcn Table */}
        <div className="overflow-x-auto rounded-md border border-slate-700/50">
          <Table>
            <TableHeader>
              <TableRow className="border-b   border-slate-700/50 hover:bg-transparent">
                <TableHead >
                  التاريخ
                </TableHead>
                <TableHead >
                  النوع
                </TableHead>
                <TableHead >
                  الوصف
                </TableHead>
                <TableHead >
                  الفئة
                </TableHead>
                <TableHead >
                  المبلغ
                </TableHead>
                <TableHead >
                  الحالة
                </TableHead>
                <TableHead >
                  المرجع
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                  >
                    <TableCell className="p-3">
                      <span className="text-slate-300 text-sm">
                        {new Date(transaction.date).toLocaleDateString("ar-SA")}
                      </span>
                    </TableCell>
                    <TableCell className="p-3">
                      {getTransactionTypeBadge(transaction.type)}
                    </TableCell>
                    <TableCell className="p-3">
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
                    </TableCell>
                    <TableCell className="p-3">
                      <Badge
                        variant="outline"
                        className="border-slate-600 text-slate-300"
                      >
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="p-3">
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
                    </TableCell>
                    <TableCell className="p-3">
                      {getTransactionStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell className="p-3">
                      <span className="text-slate-400 text-sm font-mono">
                        {transaction.reference}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-700/50 rounded-full flex items-center justify-center">
                      <CreditCard className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">
                      لا توجد معاملات
                    </h3>
                    <p className="text-slate-500">
                      لم يتم العثور على معاملات تطابق معايير البحث
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

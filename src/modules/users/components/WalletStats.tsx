import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { formatAmount } from "../utils/walletHelpers";

interface WalletStatsProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  pendingAmount: number;
}

export const WalletStats = ({
  balance,
  totalIncome,
  totalExpense,
  pendingAmount,
}: WalletStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">
                الرصيد الحالي
              </p>
              <h3 className="text-2xl font-bold text-green-400 mt-1">
                {formatAmount(balance)}
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
                {formatAmount(totalIncome)}
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
                {formatAmount(totalExpense)}
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
                {formatAmount(pendingAmount)}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-yellow-500/20">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

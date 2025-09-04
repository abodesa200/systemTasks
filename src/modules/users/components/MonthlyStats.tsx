import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { formatAmount } from "../utils/walletHelpers";
import { MonthlyStat } from "../types/wallet";

interface MonthlyStatsProps {
  monthlyStats: MonthlyStat[];
}

export const MonthlyStats = ({ monthlyStats }: MonthlyStatsProps) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          الإحصائيات الشهرية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {monthlyStats.map((month, index) => (
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
  );
};

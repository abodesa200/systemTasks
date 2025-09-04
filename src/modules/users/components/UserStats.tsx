import SummaryCard from "@/components/shared/SummaryCard";
import { Building, CheckCircle, CreditCard, User } from "lucide-react";
import { formatCurrency } from "../utils/clientHelpers";

interface ClientStatsProps {
  stats: {
    total: number;
    active: number;
    totalSpent: number;
    creditLimit: number;
  };
}

export const UserStats = ({ stats }: ClientStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <SummaryCard
        title="إجمالي العملاء"
        count={stats.total}
        subtitle="Pending invoicing"
        icon={<User className="w-6 h-6 text-blue-400" />}
        variant="custom"
        customColor="text-orange-400"
      />
      <SummaryCard
        title="العملاء النشطين"
        count={stats.active}
        subtitle="Pending invoicing"
        icon={<CheckCircle className="w-6 h-6 text-green-400" />}
        variant="custom"
        customColor="text-orange-400"
      />
      <SummaryCard
        title="إجمالي الإنفاق"
        count={formatCurrency(stats.totalSpent)}
        subtitle="Pending invoicing"
        icon={<CreditCard className="w-6 h-6 text-purple-400" />}
        variant="custom"
        customColor="text-orange-400"
      />
      <SummaryCard
        title="الحد الائتماني"
        count={ formatCurrency(stats.creditLimit)}
        subtitle="Pending invoicing"
        icon={<Building className="w-6 h-6 text-cyan-400" />}
        variant="custom"
        customColor="text-orange-400"
      />
    </div>
  );
};

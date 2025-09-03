// modules/timesheets/components/TimeSheetsStats.tsx
import TaskSummaryCard from "@/components/shared/SummaryCard";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

interface TimeSheetsStatsProps {
  stats: {
    totalHours: string;
    invoicedHours: string;
    notInvoicedHours: string;
  };
}

export const TimeSheetsStats = ({ stats }: TimeSheetsStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TaskSummaryCard
        title="Hours Worked"
        count={stats.totalHours}
        icon={<Clock className="w-5 h-5 text-white" />}
        variant="progress"
      />
      <TaskSummaryCard
        title="Invoiced"
        count={stats.invoicedHours}
        subtitle="0 hours invoiced"
        icon={<CheckCircle className="w-5 h-5 text-green-400" />}
        variant="custom"
        customColor="text-green-400"
      />
      <TaskSummaryCard
        title="Not Invoiced"
        count={stats.notInvoicedHours}
        subtitle="Pending invoicing"
        icon={<AlertCircle className="w-5 h-5 text-orange-400" />}
        variant="custom"
        customColor="text-orange-400"
      />
    </div>
  );
};

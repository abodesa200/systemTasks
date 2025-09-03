// modules/projects/components/ProjectsStats.tsx
import SummaryCard from "@/components/shared/SummaryCard";
import { FolderOpen, Target, BarChart3, Clock } from "lucide-react";

interface ProjectsStatsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
    avgProgress: number;
  };
}

export const ProjectsStats = ({ stats }: ProjectsStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <SummaryCard
        title="إجمالي المشاريع"
        count={stats.total}
        icon={<FolderOpen className="h-4 w-4 text-primary" />}
        variant="progress"
      />
      <SummaryCard
        title="المشاريع النشطة"
        count={stats.active}
        subtitle="0 hours invoiced"
        icon={<Target className="h-4 w-4 text-emerald-600" />}
        variant="custom"
        customColor="text-green-400"
      />
      <SummaryCard
        title="المشاريع المكتملة"
        count={stats.completed}
        subtitle="Pending invoicing"
        icon={<BarChart3 className="h-4 w-4 text-green-600" />}
        variant="custom"
        customColor="text-orange-400"
      />
      <SummaryCard
        title="متوسط التقدم"
        count={stats.avgProgress}
        subtitle="Pending invoicing"
        icon={<Clock className="h-4 w-4 text-cyan-600" />}
        variant="custom"
        customColor="text-orange-400"
      />
    </div>
  );
};

// modules/projects/components/ProjectsStats.tsx
import SummaryCard from "@/components/shared/SummaryCard";
import { FolderOpen, FolderTree, Tag } from "lucide-react";
import { Category } from "../types/categriesTypes";
interface CategoryStatsProps {
  categories: Category[];
}


export const CategoryStats = ({ categories }: CategoryStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <SummaryCard
        title="   إجمالي الفئات الرئيسية"
        count={categories.length}
        icon={<FolderOpen className="h-5 w-5 text-blue-600" />}
        variant="progress"
      />
      <SummaryCard
        title=" إجمالي الفئات الفرعية"
        count={categories.reduce(
          (total, cat) => total + cat.subCategories.length,
          0
        )}
        subtitle="0 hours invoiced"
        icon={<Tag className="h-5 w-5 text-green-600" />}
        variant="custom"
        customColor="text-green-400"
      />
      <SummaryCard
        title=" الفئة الأكثر استخدامًا"
        count={
          categories.length > 0
            ? categories.reduce((prev, current) =>
                prev.subCategories.length > current.subCategories.length
                  ? prev
                  : current
              ).name
            : "لا يوجد"
        }
        subtitle="Pending invoicing"
        icon={<FolderTree className="h-5 w-5 text-amber-600" />}
        variant="custom"
        customColor="text-orange-400"
      />
    </div>
  );
};

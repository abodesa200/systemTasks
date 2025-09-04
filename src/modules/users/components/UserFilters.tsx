import { CustomSelect } from "@/components/shared/CustomSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SearchInput from "@/components/ui/Search";

interface ClientFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
  filterStatus: string;
  onFilterStatusChange: (value: string) => void;
  viewMode: "table" | "cards";
  type: "USERS" | "CLIENTS";
  onViewModeChange: (mode: "table" | "cards") => void;
}
const typeOptions = [
  { value: "all", label: "جميع الأنواع" },
  { value: "individual", label: "أفراد" },
  { value: "corporate", label: "شركات" },
  { value: "government", label: "جهات حكومية" },
];

// خيارات الحالة
const filterStatusOptions = [
  { value: "all", label: "جميع الحالات" },
  { value: "active", label: "نشط" },
  { value: "inactive", label: "غير نشط" },
  { value: "pending", label: "قيد الانتظار" },
];
export const UserFilters = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  filterStatus,
  onFilterStatusChange,
  viewMode,
  onViewModeChange,
  type,
}: ClientFiltersProps) => {
  return (
    <Card className="">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            <div className="relative flex-1 max-w-md">
              <SearchInput
                placeholder="ابحث بالاسم، البريد أو الشركة..."
                value={searchTerm}
                onChange={onSearchChange}
              />
            </div>
            <CustomSelect
              placeholder="جميع الأنواع"
              options={typeOptions}
              value={filterType}
              onValueChange={onFilterTypeChange}
              className="w-40"
            />

            {/* الحالة */}
            <CustomSelect
              placeholder="جميع الحالات"
              options={filterStatusOptions}
              value={filterStatus}
              onValueChange={onFilterStatusChange}
              className="w-40"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("table")}
            >
              عرض الجدول
            </Button>
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("cards")}
            >
              عرض البطاقات
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// components/SearchInput.jsx
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchInput = ({
  placeholder = "ابحث...",
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`relative flex-1 max-w-md ${className}`}>
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-10 bg-slate-700/50 border-slate-600"
      />
    </div>
  );
};

export default SearchInput;

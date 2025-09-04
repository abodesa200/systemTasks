// modules/clients/components/Badges.tsx
import { ClientStatus, ClientType } from "../types/usersType";

interface TypeBadgeProps {
  type: ClientType | string;
}

export const TypeBadge = ({ type }: TypeBadgeProps) => {
  switch (type) {
    case "individual":
      return (
        <span className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-2 py-1 rounded-full text-xs">
          فرد
        </span>
      );
    case "corporate":
      return (
        <span className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-2 py-1 rounded-full text-xs">
          شركة
        </span>
      );
    case "government":
      return (
        <span className="bg-green-500/20 text-green-400 border-green-500/30 px-2 py-1 rounded-full text-xs">
          حكومي
        </span>
      );
    default:
      return (
        <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full text-xs">
          {type}
        </span>
      );
  }
};

interface StatusBadgeProps {
  status: ClientStatus | string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case "active":
      return (
        <span className="bg-green-500/20 text-green-400 border-green-500/30 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span> نشط
        </span>
      );
    case "inactive":
      return (
        <span className="bg-red-500/20 text-red-400 border-red-500/30 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <span className="w-2 h-2 bg-red-400 rounded-full"></span> غير نشط
        </span>
      );
    case "pending":
      return (
        <span className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span> قيد
          الانتظار
        </span>
      );
    default:
      return (
        <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full text-xs">
          {status}
        </span>
      );
  }
};

// modules/clients/utils/badgeHelpers.tsx
import { ClientStatus, ClientType } from "../types/usersType";

export const getTypeBadge = (type: ClientType | string) => {
  switch (type) {
    case "individual":
      return {
        badge: (
          <span className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-2 py-1 rounded-full text-xs">
            فرد
          </span>
        ),
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      };
    case "corporate":
      return {
        badge: (
          <span className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-2 py-1 rounded-full text-xs">
            شركة
          </span>
        ),
        color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      };
    case "government":
      return {
        badge: (
          <span className="bg-green-500/20 text-green-400 border-green-500/30 px-2 py-1 rounded-full text-xs">
            حكومي
          </span>
        ),
        color: "bg-green-500/20 text-green-400 border-green-500/30",
      };
    default:
      return {
        badge: (
          <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full text-xs">
            {type}
          </span>
        ),
        color: "bg-gray-500/20 text-gray-400",
      };
  }
};

export const getStatusBadge = (status: ClientStatus | string) => {
  switch (status) {
    case "active":
      return {
        badge: (
          <span className="bg-green-500/20 text-green-400 border-green-500/30 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span> نشط
          </span>
        ),
        color: "bg-green-500/20 text-green-400 border-green-500/30",
      };
    case "inactive":
      return {
        badge: (
          <span className="bg-red-500/20 text-red-400 border-red-500/30 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span> غير نشط
          </span>
        ),
        color: "bg-red-500/20 text-red-400 border-red-500/30",
      };
    case "pending":
      return {
        badge: (
          <span className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span> قيد
            الانتظار
          </span>
        ),
        color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      };
    default:
      return {
        badge: (
          <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full text-xs">
            {status}
          </span>
        ),
        color: "bg-gray-500/20 text-gray-400",
      };
  }
};

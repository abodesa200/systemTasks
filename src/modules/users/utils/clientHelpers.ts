// modules/clients/utils/clientHelpers.ts
import { Client, UserType } from "../types/usersType";

export const getTypeColor = (type: string) => {
  switch (type) {
    case "individual":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "corporate":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "government":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "inactive":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "pending":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export const getTypeText = (type: string) => {
  switch (type) {
    case "individual":
      return "فرد";
    case "corporate":
      return "شركة";
    case "government":
      return "حكومي";
    default:
      return type;
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "نشط";
    case "inactive":
      return "غير نشط";
    case "pending":
      return "قيد الانتظار";
    default:
      return status;
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const calculateStats = (clients: Client[]) => {
  const total = clients.length;
  const active = clients.filter((c) => c.status === "active").length;
  const totalSpent = clients.reduce(
    (sum, client) => sum + (client.totalSpent || 0),
    0
  );
  const creditLimit = clients.reduce(
    (sum, client) => sum + (client.creditLimit || 0),
    0
  );

  return { total, active, totalSpent, creditLimit };
};

export const filterData = (
  data: UserType[],
  searchTerm: string,
  filterType: string,
  filterStatus: string
): UserType[] => {
  return data.filter((item) => {
    // ----------- البحث العام (name + email + fields خاصة) -----------
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(lowerSearch) ||
      item.email.toLowerCase().includes(lowerSearch) ||
      // لو كان Client
      ("company" in item &&
        item.company?.toLowerCase().includes(lowerSearch)) ||
      ("industry" in item &&
        item.industry?.toLowerCase().includes(lowerSearch)) ||
      // لو كان User
      ("department" in item &&
        item.department?.toLowerCase().includes(lowerSearch)) ||
      ("location" in item &&
        item.location?.toLowerCase().includes(lowerSearch));

    // ----------- فلترة حسب الـ type / role -----------
    const matchesType =
      filterType === "all"
        ? true
        : "type" in item
        ? item.type === filterType
        : "role" in item
        ? item.role === filterType
        : true;

    // ----------- فلترة حسب status -----------
    const matchesStatus =
      filterStatus === "all" ? true : item.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });
};
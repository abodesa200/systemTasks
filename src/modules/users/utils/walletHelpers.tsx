import { Badge } from "@/components/ui/badge";

// دالة لتنسيق المبالغ المالية
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
  }).format(amount);
};

// دالة للحصول على Badge لنوع المعاملة
export const getTransactionTypeBadge = (type: string): JSX.Element => {
  const typeConfig: {
    [key: string]: {
      label: string;
      variant: "default" | "secondary" | "destructive" | "outline";
      className: string;
    };
  } = {
    income: {
      label: "إيراد",
      variant: "default",
      className: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    expense: {
      label: "مصروف",
      variant: "destructive",
      className: "bg-red-500/20 text-red-400 border-red-500/30",
    },
    transfer_in: {
      label: "تحويل وارد",
      variant: "secondary",
      className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    transfer_out: {
      label: "تحويل صادر",
      variant: "secondary",
      className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    },
    bonus: {
      label: "مكافأة",
      variant: "default",
      className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    },
    deduction: {
      label: "خصم",
      variant: "destructive",
      className: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    },
  };

  const config = typeConfig[type] || {
    label: type,
    variant: "outline",
    className: "",
  };

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
};

// دالة للحصول على Badge لحالة المعاملة
export const getTransactionStatusBadge = (status: string): JSX.Element => {
  const statusConfig: {
    [key: string]: {
      label: string;
      variant: "default" | "secondary" | "destructive" | "outline";
      className: string;
    };
  } = {
    completed: {
      label: "مكتمل",
      variant: "default",
      className: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    pending: {
      label: "قيد الانتظار",
      variant: "outline",
      className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    },
    failed: {
      label: "فاشل",
      variant: "destructive",
      className: "bg-red-500/20 text-red-400 border-red-500/30",
    },
    cancelled: {
      label: "ملغى",
      variant: "destructive",
      className: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    },
  };

  const config = statusConfig[status] || {
    label: status,
    variant: "outline",
    className: "",
  };

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
};

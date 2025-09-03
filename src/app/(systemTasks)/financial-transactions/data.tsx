// بيانات نموذجية للمعاملات
export const initialTransactions = [
  {
    id: 1,
    type: "income",
    category: "مشروع",
    description: "دفعة مشروع العميل X",
    amount: 15000,
    date: "2023-10-15",
    status: "مكتمل",
  },
  {
    id: 2,
    type: "expense",
    category: "رواتب",
    description: "رواتب الفريق الشهرية",
    amount: 8000,
    date: "2023-10-05",
    status: "مكتمل",
  },
  {
    id: 3,
    type: "expense",
    category: "أدوات",
    description: "اشتراك أدوات تطوير",
    amount: 500,
    date: "2023-10-10",
    status: "مكتمل",
  },
  {
    id: 4,
    type: "income",
    category: "استشارة",
    description: "جلسة استشارية",
    amount: 2000,
    date: "2023-10-18",
    status: "معلق",
  },
  {
    id: 5,
    type: "expense",
    category: "تسويق",
    description: "حملة إعلانية",
    amount: 1200,
    date: "2023-10-20",
    status: "ملغى",
  },
];

// بيانات الموظفين
export const teamMembers = [
  {
    id: 1,
    name: "أحمد محمد",
    role: "مطور واجهات",
    salary: 4000,
    joinedAt: "2023-01-15",
  },
  {
    id: 2,
    name: "فاطمة علي",
    role: "مطور خوادم",
    salary: 4500,
    joinedAt: "2023-02-10",
  },
  {
    id: 3,
    name: "محمد إبراهيم",
    role: "مصمم واجهات",
    salary: 3500,
    joinedAt: "2023-03-20",
  },
  {
    id: 4,
    name: "سارة عبدالله",
    role: "مدقق جودة",
    salary: 3800,
    joinedAt: "2023-01-05",
  },
];

// فئات المعاملات
export const transactionCategories = {
  income: ["مشروع", "استشارة", "صيانة", "تدريب", "أخرى"],
  expense: ["رواتب", "أدوات", "تسويق", "إيجار", "مرافق", "أخرى"],
};

import { WalletData } from "../types/wallet";

export const walletApi = {
  getWalletData: async (userId: string | string[]): Promise<WalletData | null> => {
    try {
      // محاكاة استجابة API
      return {
        userName: "أحمد محمد",
        balance: 12500,
        totalIncome: 20000,
        totalExpense: 7500,
        pendingAmount: 1500,
        monthlyStats: [
          { month: "يناير 2024", income: 5000, expense: 2000 },
          { month: "فبراير 2024", income: 6000, expense: 2500 },
          { month: "مارس 2024", income: 9000, expense: 3000 },
        ],
        transactions: [
          {
            id: "1",
            date: "2024-03-15",
            type: "income",
            description: "راتب شهر مارس",
            category: "رواتب",
            amount: 5000,
            status: "completed",
            reference: "REF-001",
          },
          {
            id: "2",
            date: "2024-03-10",
            type: "expense",
            description: "فاتورة كهرباء",
            category: "مرافق",
            amount: 350,
            status: "completed",
            reference: "REF-002",
          },
          {
            id: "3",
            date: "2024-03-05",
            type: "transfer_in",
            description: "تحويل من علي",
            category: "تحويلات",
            amount: 1000,
            status: "completed",
            reference: "REF-003",
            relatedUser: "علي أحمد",
          },
          {
            id: "4",
            date: "2024-03-01",
            type: "bonus",
            description: "مكافأة أداء",
            category: "مكافآت",
            amount: 1500,
            status: "completed",
            reference: "REF-004",
          },
          {
            id: "5",
            date: "2024-02-28",
            type: "deduction",
            description: "خصم تأخير",
            category: "خصومات",
            amount: 200,
            status: "completed",
            reference: "REF-005",
          },
          {
            id: "6",
            date: "2024-02-25",
            type: "transfer_out",
            description: "تحويل إلى سارة",
            category: "تحويلات",
            amount: 500,
            status: "pending",
            reference: "REF-006",
            relatedUser: "سارة خالد",
          },
        ],
      };
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      return null;
    }
  },
};
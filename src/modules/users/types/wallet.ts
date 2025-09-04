export interface Transaction {
  id: string;
  date: string;
  type: string;
  description: string;
  category: string;
  amount: number;
  status: string;
  reference: string;
  relatedUser?: string;
}

export interface MonthlyStat {
  month: string;
  income: number;
  expense: number;
}

export interface WalletData {
  userName: string;
  balance: number;
  totalIncome: number;
  totalExpense: number;
  pendingAmount: number;
  monthlyStats: MonthlyStat[];
  transactions: Transaction[];
}

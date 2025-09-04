"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { WalletStats } from "../../components/WalletStats";
import { MonthlyStats } from "../../components/MonthlyStats";
import { TransactionsTable } from "../../components/TransactionsTable";
import { useWallet } from "../../hooks/useWallet";
import Loading from "@/app/loading";



const WalletFeature = () => {
  const { userId } = useParams();
  const { walletData, isLoading, error, refetch } = useWallet(userId);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  if (isLoading) {
    return (
     
      <Loading />
    );
  }

  if (error || !walletData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-slate-200">
          {error || "لم يتم العثور على بيانات المحفظة"}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* رأس الصفحة */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-3">
              <Wallet className="w-5 h-5 text-cyan-400" />
              محفظة {walletData.userName}
            </h1>
           
          </div>
          <Button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
          >
            رجوع
          </Button>
        </div>

        {/* ملخص المحفظة */}
        <WalletStats
          balance={walletData.balance}
          totalIncome={walletData.totalIncome}
          totalExpense={walletData.totalExpense}
          pendingAmount={walletData.pendingAmount}
        />

        {/* إحصائيات شهرية */}
        <MonthlyStats monthlyStats={walletData.monthlyStats} />

        {/* كشف الحساب */}
        <TransactionsTable
          transactions={walletData.transactions}
          searchTerm={searchTerm}
          filter={filter}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilter}
          onRefresh={refetch}
        />
      </div>
    </div>
  );
};

export default WalletFeature;

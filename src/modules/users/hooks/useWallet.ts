import { useState, useEffect } from "react";
import { walletApi } from "../services/walletApi";
import { WalletData } from "../types/wallet";

export const useWallet = (userId: string | string[]) => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await walletApi.getWalletData(userId);
        setWalletData(data);
      } catch (err) {
        setError("فشل في تحميل بيانات المحفظة");
        console.error("Failed to fetch wallet data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchWalletData();
    }
  }, [userId]);

  return {
    walletData,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      walletApi
        .getWalletData(userId)
        .then(setWalletData)
        .catch((err) => {
          setError("فشل في تحميل بيانات المحفظة");
          console.error("Failed to fetch wallet data:", err);
        })
        .finally(() => setIsLoading(false));
    },
  };
};

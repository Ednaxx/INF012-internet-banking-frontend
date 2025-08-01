import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store";

export const useDashboard = () => {
  const navigate = useNavigate();
  const { name, accountNumber, branch, getBalance, logout } = useUserStore();
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      setBalanceLoading(true);
      const result = await getBalance();
      if (result.success) {
        setBalance(result.balance);
      }
      setBalanceLoading(false);
    };

    fetchBalance();
  }, [getBalance]);

  const handleLogout = () => {
    logout();
  };

  const handleNavigateToDeposit = () => {
    navigate("/deposit");
  };

  const handleNavigateToWithdrawal = () => {
    navigate("/withdrawal");
  };

  const handleNavigateToTransfer = () => {
    navigate("/transfer");
  };

  const handleNavigateToStatement = () => {
    navigate("/statement");
  };

  const formatBalance = (amount) => {
    return (
      amount?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) || "0.00"
    );
  };

  return {
    username: name, // Keep username for backward compatibility
    accountNumber,
    branch,
    balance,
    balanceLoading,
    handleLogout,
    handleNavigateToDeposit,
    handleNavigateToWithdrawal,
    handleNavigateToTransfer,
    handleNavigateToStatement,
    formatBalance,
  };
};

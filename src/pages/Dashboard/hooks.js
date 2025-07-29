import { useUserStore } from "../../store";

export const useDashboard = () => {
  const { username, accountNumber, branch, balance, logout } = useUserStore();

  const handleLogout = () => {
    logout();
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
    username,
    accountNumber,
    branch,
    balance,
    handleLogout,
    formatBalance,
  };
};

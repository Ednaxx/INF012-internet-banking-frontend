import { useState } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store";

export const useWithdrawal = () => {
  const navigate = useNavigate();
  const { withdraw, isLoading, error, balance, formatBalance } = useUserStore();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [withdrawalResult, setWithdrawalResult] = useState(null);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setWithdrawalResult(null);

    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    const result = await withdraw(parseFloat(amount), description);
    
    if (result.success) {
      setSuccess(true);
      setWithdrawalResult(result);
      setAmount("");
      setDescription("");
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setWithdrawalResult(null);
      }, 3000);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const formatCurrency = (value) => {
    return value?.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }) || "R$ 0,00";
  };

  const isInsufficientFunds = () => {
    return amount && parseFloat(amount) > balance;
  };

  return {
    amount,
    description,
    isLoading,
    error,
    success,
    withdrawalResult,
    balance,
    handleAmountChange,
    setDescription,
    handleSubmit,
    handleBack,
    formatCurrency,
    formatBalance,
    isInsufficientFunds,
  };
};

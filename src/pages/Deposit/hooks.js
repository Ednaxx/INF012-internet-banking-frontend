import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store";

export const useDeposit = () => {
  const navigate = useNavigate();
  const { deposit, getBalance, isLoading, error } = useUserStore();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [depositResult, setDepositResult] = useState(null);
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
    setDepositResult(null);

    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    const result = await deposit(parseFloat(amount), description);

    if (result.success) {
      setSuccess(true);
      setDepositResult(result);
      setAmount("");
      setDescription("");

      const balanceResult = await getBalance();
      if (balanceResult.success) {
        setBalance(balanceResult.balance);
      }

      setTimeout(() => {
        setSuccess(false);
        setDepositResult(null);
      }, 3000);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const formatCurrency = (value) => {
    return (
      value?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }) || "R$ 0,00"
    );
  };

  return {
    amount,
    description,
    isLoading: isLoading || balanceLoading,
    error,
    success,
    depositResult,
    balance,
    handleAmountChange,
    setDescription,
    handleSubmit,
    handleBack,
    formatCurrency,
  };
};

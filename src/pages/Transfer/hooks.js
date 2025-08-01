import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store";

export const useTransfer = () => {
  const navigate = useNavigate();
  const { transfer, getBalance, isLoading, error } = useUserStore();
  const [formData, setFormData] = useState({
    targetAccountNumber: "",
    targetBranch: "",
    amount: "",
    description: "",
  });
  const [success, setSuccess] = useState(false);
  const [transferResult, setTransferResult] = useState(null);
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

  const handleInputChange = (field, value) => {
    if (field === "amount") {
      // Allow only numbers and decimal point
      if (/^\d*\.?\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
    } else if (field === "targetAccountNumber") {
      // Allow only numbers for account
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
    } else if (field === "targetBranch") {
      // Allow only numbers for branch
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setTransferResult(null);

    if (
      !formData.amount ||
      parseFloat(formData.amount) <= 0 ||
      !formData.targetAccountNumber ||
      !formData.targetBranch
    ) {
      return;
    }

    const transferData = {
      targetAccountNumber: formData.targetAccountNumber,
      targetBranch: formData.targetBranch,
      amount: parseFloat(formData.amount),
      description:
        formData.description ||
        `Transferência para conta ${formData.targetAccountNumber}`,
    };

    const result = await transfer(transferData);

    if (result.success) {
      setSuccess(true);
      setTransferResult(result);
      setFormData({
        targetAccountNumber: "",
        targetBranch: "",
        amount: "",
        description: "",
      });

      const balanceResult = await getBalance();
      if (balanceResult.success) {
        setBalance(balanceResult.balance);
      }

      setTimeout(() => {
        setSuccess(false);
        setTransferResult(null);
      }, 5000);
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

  const isInsufficientFunds = () => {
    return formData.amount && parseFloat(formData.amount) > balance;
  };

  const isValidForm = () => {
    return (
      formData.targetAccountNumber &&
      formData.targetBranch &&
      formData.amount &&
      parseFloat(formData.amount) > 0 &&
      !isInsufficientFunds()
    );
  };

  return {
    formData,
    isLoading: isLoading || balanceLoading,
    error,
    success,
    transferResult,
    balance,
    handleInputChange,
    handleSubmit,
    handleBack,
    formatCurrency,
    isInsufficientFunds,
    isValidForm,
  };
};

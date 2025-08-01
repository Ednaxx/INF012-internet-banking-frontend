import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store";

export const useStatement = () => {
  const navigate = useNavigate();
  const { getStatement, isLoading, error } = useUserStore();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Load statement on component mount
    loadStatement();
  }, []);

  const loadStatement = async () => {
    const result = await getStatement();
    
    if (result.success) {
      setTransactions(result.transactions || []);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionTypeLabel = (type) => {
    const types = {
      DEPOSIT: "Depósito",
      WITHDRAWAL: "Saque", 
      PAYMENT: "Transferência",
      deposit: "Depósito",
      withdrawal: "Saque",
      transfer: "Transferência",
      payment: "Pagamento",
    };
    return types[type] || type;
  };

  const getTransactionColor = (type) => {
    const colors = {
      DEPOSIT: "text-green-600",
      WITHDRAWAL: "text-red-600",
      PAYMENT: "text-purple-600",
      deposit: "text-green-600",
      withdrawal: "text-red-600",
      transfer: "text-purple-600",
      payment: "text-blue-600",
    };
    return colors[type] || "text-gray-600";
  };

  const getTransactionSign = (type) => {
    return (type === "DEPOSIT" || type === "deposit") ? "+" : "-";
  };

  return {
    transactions,
    isLoading,
    error,
    handleBack,
    formatCurrency,
    formatDate,
    getTransactionTypeLabel,
    getTransactionColor,
    getTransactionSign,
  };
};

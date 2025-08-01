import React from "react";
import { FaArrowUp, FaArrowDown, FaExchangeAlt } from "react-icons/fa";

const TransactionItem = ({ transaction, formatCurrency, formatDate }) => {
  const getTransactionIcon = (type) => {
    switch (type) {
      case "DEPOSIT":
        return <FaArrowUp className="text-green-600" />;
      case "WITHDRAWAL":
        return <FaArrowDown className="text-red-600" />;
      case "TRANSFER":
        return <FaExchangeAlt className="text-blue-600" />;
      default:
        return <FaExchangeAlt className="text-gray-600" />;
    }
  };

  const getTransactionLabel = (type) => {
    switch (type) {
      case "DEPOSIT":
        return "Depósito";
      case "WITHDRAWAL":
        return "Saque";
      case "TRANSFER":
        return "Transferência";
      default:
        return "Operação";
    }
  };

  const getAmountColor = (type) => {
    switch (type) {
      case "DEPOSIT":
        return "text-green-600";
      case "WITHDRAWAL":
      case "TRANSFER":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getAmountPrefix = (type) => {
    return type === "DEPOSIT" ? "+" : "-";
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
          {getTransactionIcon(transaction.operationType)}
        </div>
        <div>
          <p className="font-medium text-gray-900">
            {getTransactionLabel(transaction.operationType)}
          </p>
          <p className="text-sm text-gray-500">
            {formatDate(transaction.timestamp)}
          </p>
          {transaction.description && (
            <p className="text-sm text-gray-600 mt-1">
              {transaction.description}
            </p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p
          className={`font-semibold ${getAmountColor(transaction.operationType)}`}
        >
          {getAmountPrefix(transaction.operationType)}
          {formatCurrency(transaction.amount)}
        </p>
        {transaction.targetAccountNumber && (
          <p className="text-sm text-gray-500">
            Para: {transaction.targetAccountNumber}
          </p>
        )}
      </div>
    </div>
  );
};

const TransactionList = ({
  transactions,
  formatCurrency,
  formatDate,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Nenhuma transação encontrada</p>
          <p className="text-gray-400 text-sm mt-2">
            Suas transações aparecerão aqui quando você começar a usar sua conta
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          Histórico de Transações
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {transactions.length} transação
          {transactions.length !== 1 ? "ões" : ""} encontrada
          {transactions.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="divide-y divide-gray-100">
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={transaction.id || index}
            transaction={transaction}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;

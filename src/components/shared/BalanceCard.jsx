import React from "react";

const BalanceCard = ({ balance, formatCurrency, title = "Saldo Atual" }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
      <div className="px-4 py-5 sm:p-6">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(balance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;

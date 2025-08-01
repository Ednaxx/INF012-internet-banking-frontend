import React from "react";
import { useStatement } from "./hooks";
import { PageHeader, AlertMessage } from "../../components/shared";
import { TransactionList } from "../../components/Statement";

const Statement = () => {
  const {
    transactions,
    isLoading,
    error,
    handleBack,
    formatCurrency,
    formatDate,
  } = useStatement();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="InternetBanking" showBackButton onBack={handleBack} />

      <main className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Extrato</h2>
            <p className="text-gray-600">
              Consulte o histórico de transações de sua conta
            </p>
          </div>

          {error && <AlertMessage type="error" message={error} />}

          <TransactionList
            transactions={transactions}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default Statement;

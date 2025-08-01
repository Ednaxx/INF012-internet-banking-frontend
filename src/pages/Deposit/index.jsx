import React from "react";
import { FaPlus } from "react-icons/fa";
import { useDeposit } from "./hooks";
import { PageHeader, BalanceCard, AlertMessage } from "../../components/shared";
import { DepositForm } from "../../components/Deposit";

const Deposit = () => {
  const {
    amount,
    description,
    isLoading,
    error,
    success,
    depositResult,
    balance,
    handleAmountChange,
    setDescription,
    handleSubmit,
    handleBack,
    formatCurrency,
  } = useDeposit();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="InternetBanking" showBackButton onBack={handleBack} />

      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Page Title */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FaPlus className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">Depósito</h2>
            </div>
            <p className="text-gray-600">
              Realize um depósito em sua conta bancária
            </p>
          </div>

          <BalanceCard balance={balance} formatCurrency={formatCurrency} />

          {/* Success Message */}
          {success && depositResult && (
            <div className="mb-6">
              <AlertMessage type="success">
                <div>
                  <h3 className="text-sm font-medium text-green-800">
                    Depósito realizado com sucesso!
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    Valor depositado:{" "}
                    {formatCurrency(depositResult.transaction.amount)}
                  </p>
                  <p className="text-sm text-green-700">
                    Novo saldo: {formatCurrency(depositResult.newBalance)}
                  </p>
                </div>
              </AlertMessage>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6">
              <AlertMessage type="error" message={error} />
            </div>
          )}

          <DepositForm
            amount={amount}
            description={description}
            isLoading={isLoading}
            handleAmountChange={handleAmountChange}
            setDescription={setDescription}
            handleSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default Deposit;

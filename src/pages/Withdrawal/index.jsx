import React from "react";
import { useWithdrawal } from "./hooks";
import { PageHeader, BalanceCard, AlertMessage } from "../../components/shared";
import { WithdrawalForm } from "../../components/Withdrawal";

const Withdrawal = () => {
  const {
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
    isInsufficientFunds,
  } = useWithdrawal();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="InternetBanking" showBackButton onBack={handleBack} />

      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Saque</h2>
            <p className="text-gray-600">
              Realize um saque de sua conta bancária
            </p>
          </div>

          <BalanceCard balance={balance} formatCurrency={formatCurrency} />

          {success && withdrawalResult && (
            <AlertMessage
              type="success"
              title="Saque realizado com sucesso!"
              message={`Valor sacado: ${formatCurrency(withdrawalResult.transaction.amount)}. Novo saldo: ${formatCurrency(withdrawalResult.newBalance)}`}
            />
          )}

          {isInsufficientFunds() && (
            <AlertMessage
              type="warning"
              message="Valor solicitado excede o saldo disponível"
            />
          )}

          <WithdrawalForm
            amount={amount}
            setAmount={(value) => handleAmountChange({ target: { value } })}
            description={description}
            setDescription={setDescription}
            onSubmit={handleSubmit}
            loading={isLoading}
            error={error}
            balance={balance}
          />
        </div>
      </main>
    </div>
  );
};

export default Withdrawal;

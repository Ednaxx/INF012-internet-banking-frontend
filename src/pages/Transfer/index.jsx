import React from "react";
import { useTransfer } from "./hooks";
import { PageHeader, BalanceCard, AlertMessage } from "../../components/shared";
import { TransferForm } from "../../components/Transfer";

const Transfer = () => {
  const {
    formData,
    isLoading,
    error,
    success,
    transferResult,
    balance,
    handleInputChange,
    handleSubmit,
    handleBack,
    formatCurrency,
    isInsufficientFunds,
  } = useTransfer();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="InternetBanking" showBackButton onBack={handleBack} />

      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Transferência
            </h2>
            <p className="text-gray-600">
              Transfira dinheiro para outra conta bancária
            </p>
          </div>

          <BalanceCard balance={balance} formatCurrency={formatCurrency} />

          {success && transferResult && (
            <AlertMessage
              type="success"
              title="Transferência realizada com sucesso!"
              message={`Valor transferido: ${formatCurrency(transferResult.transaction.amount)}. Conta destino: ${transferResult.transaction.targetAccountNumber}. Novo saldo: ${formatCurrency(transferResult.newBalance)}`}
            />
          )}

          {isInsufficientFunds() && (
            <AlertMessage
              type="warning"
              message="Valor solicitado excede o saldo disponível"
            />
          )}

          <TransferForm
            amount={formData.amount}
            setAmount={(value) => handleInputChange("amount", value)}
            targetAccountNumber={formData.targetAccountNumber}
            setTargetAccountNumber={(value) =>
              handleInputChange("targetAccountNumber", value)
            }
            targetBranch={formData.targetBranch}
            setTargetBranch={(value) =>
              handleInputChange("targetBranch", value)
            }
            description={formData.description}
            setDescription={(value) => handleInputChange("description", value)}
            onSubmit={handleSubmit}
            loading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default Transfer;

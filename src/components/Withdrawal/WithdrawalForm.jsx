import React from 'react';
import { FaMinus } from 'react-icons/fa';
import { FormInput, LoadingButton, AlertMessage } from '../shared';

const QuickAmountButton = ({ amount, onClick, disabled }) => (
  <button
    type="button"
    onClick={() => onClick(amount)}
    disabled={disabled}
    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    R$ {amount.toFixed(2)}
  </button>
);

const WithdrawalForm = ({ 
  amount, 
  setAmount, 
  description, 
  setDescription, 
  onSubmit, 
  loading, 
  error, 
  balance 
}) => {
  const quickAmounts = [50, 100, 200, 500];

  const handleQuickAmount = (value) => {
    setAmount(value.toString());
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="bg-red-100 p-3 rounded-lg mr-4">
          <FaMinus className="text-red-600 text-xl" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Realizar Saque
        </h2>
      </div>

      {error && <AlertMessage type="error" message={error} />}

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <FormInput
            id="amount"
            label="Valor do Saque"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valores Rápidos
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {quickAmounts.map((value) => (
                <QuickAmountButton
                  key={value}
                  amount={value}
                  onClick={handleQuickAmount}
                  disabled={loading || value > balance}
                />
              ))}
            </div>
          </div>
        </div>

        <FormInput
          id="description"
          label="Descrição (opcional)"
          type="text"
          placeholder="Descrição do saque..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
        />

        <LoadingButton
          type="submit"
          loading={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <FaMinus className="mr-2" />
          Realizar Saque
        </LoadingButton>
      </form>
    </div>
  );
};

export default WithdrawalForm;

import React from 'react';
import FormInput from '../shared/FormInput';
import LoadingButton from '../shared/LoadingButton';

const DepositForm = ({ 
  amount, 
  description, 
  isLoading, 
  handleAmountChange, 
  setDescription, 
  handleSubmit,
}) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Valor do Depósito
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">R$</span>
              </div>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0,00"
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
                disabled={isLoading}
                required
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Digite o valor que deseja depositar em sua conta
            </p>
          </div>

          <FormInput
            label="Descrição (Opcional)"
            id="description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite uma descrição para o depósito"
            disabled={isLoading}
            maxLength="500"
            rows="3"
            className="py-3 px-4"
          />
          <p className="mt-2 text-xs text-gray-500">
            Adicione uma descrição para identificar o depósito
          </p>

          <div className="flex space-x-4">
            <LoadingButton
              type="submit"
              disabled={isLoading || !amount || parseFloat(amount) <= 0}
              isLoading={isLoading}
              loadingText="Processando..."
              className="flex-1"
            >
              Confirmar Depósito
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositForm;

import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { FormInput, LoadingButton, AlertMessage } from '../shared';

const TransferForm = ({ 
  amount, 
  setAmount, 
  targetAccountNumber,
  setTargetAccountNumber,
  targetBranch,
  setTargetBranch,
  description, 
  setDescription, 
  onSubmit, 
  loading, 
  error 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-lg mr-4">
          <FaExchangeAlt className="text-blue-600 text-xl" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Realizar Transferência
        </h2>
      </div>

      {error && <AlertMessage type="error" message={error} />}

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="targetBranch"
            label="Agência de Destino"
            type="text"
            placeholder="0000"
            value={targetBranch}
            onChange={(e) => setTargetBranch(e.target.value)}
            maxLength={4}
            required
          />
          
          <FormInput
            id="targetAccountNumber"
            label="Conta de Destino"
            type="text"
            placeholder="00000-0"
            value={targetAccountNumber}
            onChange={(e) => setTargetAccountNumber(e.target.value)}
            maxLength={10}
            required
          />
        </div>

        <FormInput
          id="amount"
          label="Valor da Transferência"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0,00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <FormInput
          id="description"
          label="Descrição (opcional)"
          type="text"
          placeholder="Descrição da transferência..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
        />

        <LoadingButton
          type="submit"
          loading={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FaExchangeAlt className="mr-2" />
          Realizar Transferência
        </LoadingButton>
      </form>
    </div>
  );
};

export default TransferForm;

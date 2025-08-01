import React from 'react';
import { FaUniversity, FaPlus, FaMinus, FaExchangeAlt, FaFileAlt } from 'react-icons/fa';
import { useDashboard } from "./hooks";

const Dashboard = () => {
  const {
    username,
    accountNumber,
    branch,
    balance,
    handleLogout,
    handleNavigateToDeposit,
    handleNavigateToWithdrawal,
    handleNavigateToTransfer,
    handleNavigateToStatement,
    formatBalance,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <FaUniversity className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">InternetBanking</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Bem-vindo, {username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Resumo da Conta
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Conta: {accountNumber}</p>
                    <p>Agência: {branch}</p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-500">
                      Saldo Atual
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      R$ {formatBalance(balance)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Ações Rápidas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  onClick={handleNavigateToDeposit}
                  className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center transition-colors duration-200"
                >
                  <div className="text-blue-600 mb-2">
                    <FaPlus className="h-8 w-8 mx-auto" />
                  </div>
                  <p className="text-sm font-medium text-blue-900">Depósito</p>
                </button>

                <button 
                  onClick={handleNavigateToWithdrawal}
                  className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center transition-colors duration-200"
                >
                  <div className="text-green-600 mb-2">
                    <FaMinus className="h-8 w-8 mx-auto" />
                  </div>
                  <p className="text-sm font-medium text-green-900">Saque</p>
                </button>

                <button 
                  onClick={handleNavigateToTransfer}
                  className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-center transition-colors duration-200"
                >
                  <div className="text-purple-600 mb-2">
                    <FaExchangeAlt className="h-8 w-8 mx-auto" />
                  </div>
                  <p className="text-sm font-medium text-purple-900">
                    Transferência
                  </p>
                </button>

                <button 
                  onClick={handleNavigateToStatement}
                  className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 text-center transition-colors duration-200"
                >
                  <div className="text-gray-600 mb-2">
                    <FaFileAlt className="h-8 w-8 mx-auto" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Extrato</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

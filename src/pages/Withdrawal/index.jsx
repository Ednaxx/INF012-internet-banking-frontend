import { FaUniversity, FaArrowLeft, FaMinus, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useWithdrawal } from './hooks';

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
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="mr-4 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <FaArrowLeft className="h-5 w-5" />
              </button>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <FaUniversity className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">InternetBanking</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Page Title */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FaMinus className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">Saque</h2>
            </div>
            <p className="text-gray-600">
              Realize um saque de sua conta bancária
            </p>
          </div>

          {/* Current Balance Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Saldo Disponível
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(balance)}
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {success && withdrawalResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <FaCheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">
                    Saque realizado com sucesso!
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    Valor sacado: {formatCurrency(withdrawalResult.transaction.amount)}
                  </p>
                  <p className="text-sm text-green-700">
                    Novo saldo: {formatCurrency(withdrawalResult.newBalance)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Insufficient Funds Warning */}
          {isInsufficientFunds() && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <FaExclamationTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-800">
                  Valor solicitado excede o saldo disponível
                </p>
              </div>
            </div>
          )}

          {/* Withdrawal Form */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Valor do Saque
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
                      className={`block w-full pl-10 pr-12 py-3 border rounded-md shadow-sm focus:outline-none text-lg ${
                        isInsufficientFunds()
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Digite o valor que deseja sacar de sua conta
                  </p>
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Valores Rápidos</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[50, 100, 200].map((quickAmount) => (
                      <button
                        key={quickAmount}
                        type="button"
                        onClick={() => handleAmountChange({ target: { value: quickAmount.toString() } })}
                        disabled={isLoading || quickAmount > balance}
                        className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                      >
                        R$ {quickAmount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição (Opcional)
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Digite uma descrição para o saque"
                    rows="3"
                    className="block w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                    maxLength="500"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Adicione uma descrição para identificar o saque
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-md transition-colors duration-200"
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !amount || parseFloat(amount) <= 0 || isInsufficientFunds()}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processando...
                      </>
                    ) : (
                      'Confirmar Saque'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Withdrawal;

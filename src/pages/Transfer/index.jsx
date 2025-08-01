import { FaUniversity, FaArrowLeft, FaExchangeAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useTransfer } from './hooks';

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
    isValidForm,
  } = useTransfer();

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
              <FaExchangeAlt className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">Transferência</h2>
            </div>
            <p className="text-gray-600">
              Transfira dinheiro para outra conta bancária
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
          {success && transferResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <FaCheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">
                    Transferência realizada com sucesso!
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    Valor transferido: {formatCurrency(transferResult.transaction.amount)}
                  </p>
                  <p className="text-sm text-green-700">
                    Conta destino: {transferResult.transaction.targetAccountNumber}
                  </p>
                  <p className="text-sm text-green-700">
                    Novo saldo: {formatCurrency(transferResult.newBalance)}
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

          {/* Transfer Form */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Target Account Number */}
                <div>
                  <label htmlFor="targetAccountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Conta de Destino
                  </label>
                  <input
                    type="text"
                    id="targetAccountNumber"
                    value={formData.targetAccountNumber}
                    onChange={(e) => handleInputChange("targetAccountNumber", e.target.value)}
                    placeholder="Digite o número da conta"
                    className="block w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
                    disabled={isLoading}
                    required
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Digite apenas números da conta de destino
                  </p>
                </div>

                {/* Target Branch */}
                <div>
                  <label htmlFor="targetBranch" className="block text-sm font-medium text-gray-700 mb-2">
                    Agência de Destino
                  </label>
                  <input
                    type="text"
                    id="targetBranch"
                    value={formData.targetBranch}
                    onChange={(e) => handleInputChange("targetBranch", e.target.value)}
                    placeholder="Digite o número da agência"
                    className="block w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
                    disabled={isLoading}
                    required
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Digite apenas números da agência de destino
                  </p>
                </div>

                {/* Amount */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Valor da Transferência
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">R$</span>
                    </div>
                    <input
                      type="text"
                      id="amount"
                      value={formData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
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
                    Digite o valor que deseja transferir
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição (Opcional)
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Digite uma descrição para a transferência"
                    rows="3"
                    className="block w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Adicione uma descrição para identificar a transferência
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
                    disabled={isLoading || !isValidForm()}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processando...
                      </>
                    ) : (
                      'Confirmar Transferência'
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

export default Transfer;

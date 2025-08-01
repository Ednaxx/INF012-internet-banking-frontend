import { FaUniversity, FaArrowLeft, FaFileAlt, FaDownload } from 'react-icons/fa';
import { useStatement } from './hooks';

const Statement = () => {
  const {
    transactions,
    isLoading,
    error,
    handleBack,
    formatCurrency,
    formatDate,
    getTransactionTypeLabel,
    getTransactionColor,
    getTransactionSign,
  } = useStatement();

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
      <main className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Page Title */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FaFileAlt className="h-6 w-6 text-gray-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">Extrato</h2>
            </div>
            <p className="text-gray-600">
              Consulte o histórico de transações de sua conta
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Transactions List */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Histórico de Transações
                </h3>
                {transactions.length > 0 && (
                  <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center text-sm">
                    <FaDownload className="h-4 w-4 mr-2" />
                    Exportar PDF
                  </button>
                )}
              </div>

              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Carregando transações...</p>
                </div>
              )}

              {transactions.length === 0 && !isLoading && (
                <div className="text-center py-8">
                  <FaFileAlt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Nenhuma transação encontrada</p>
                  <p className="text-gray-400 text-sm">
                    Realize algumas transações para ver o histórico aqui
                  </p>
                </div>
              )}

              {transactions.length > 0 && (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-gray-900">
                              {getTransactionTypeLabel(transaction.type)}
                            </h4>
                            <div className="text-right">
                              <p className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                                {getTransactionSign(transaction.type)}{formatCurrency(transaction.amount)}
                              </p>
                              <p className="text-xs text-gray-500">
                                Saldo: {formatCurrency(transaction.balance)}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {transaction.description}
                          </p>
                          {transaction.recipientAccount && (
                            <p className="text-xs text-gray-500 mb-1">
                              Conta destino: {transaction.recipientAccount}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {transactions.length > 10 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Mostrando {transactions.length} transações
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statement;

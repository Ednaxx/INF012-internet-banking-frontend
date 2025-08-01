import { Navigate, Link } from 'react-router';
import { FaUniversity, FaUser, FaLock, FaExclamationCircle, FaBolt } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useLogin } from './hooks';

const Login = () => {
  const {
    formData,
    isLoading,
    error,
    isAuth,
    handleInputChange,
    handleSubmit,
    handleDemoLogin,
  } = useLogin();

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-white rounded-full flex items-center justify-center mb-4">
            <FaUniversity className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-white">InternetBanking</h2>
          <p className="mt-2 text-blue-200">Faça login na sua conta</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <FaExclamationCircle className="h-5 w-5 text-red-400" />
                  <p className="ml-2 text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Número da Conta
              </label>
              <div className="mt-1 relative">
                <input
                  id="accountNumber"
                  name="accountNumber"
                  type="text"
                  autoComplete="accountNumber"
                  required
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Digite o número da conta"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700"
              >
                Agência
              </label>
              <div className="mt-1 relative">
                <input
                  id="branch"
                  name="branch"
                  type="text"
                  autoComplete="branch"
                  required
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Digite o número da agência"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <FaUniversity className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Digite sua senha"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.accountNumber.trim() ||
                  !formData.branch.trim() ||
                  !formData.password.trim()
                }
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading && (
                  <AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                )}
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Credenciais de Demo:
                </p>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  <FaBolt className="h-4 w-4 mr-1" />
                  Usar Conta Demo
                </button>
                <div className="mt-2 text-xs text-gray-500">
                  Conta: 12345678 | Agência: 001 | Senha: password
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="text-center">
          <p className="text-sm text-blue-200">
            © 2025 SecureBank. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

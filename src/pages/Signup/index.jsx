import React from "react";
import { Navigate, Link } from "react-router";
import {
  FaUniversity,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSignup } from "./hooks";

const Signup = () => {
  const {
    formData,
    isLoading,
    error,
    isAuth,
    signupSuccess,
    successMessage,
    handleInputChange,
    handleSubmit,
  } = useSignup();

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  // Show success screen after successful signup
  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-white rounded-full flex items-center justify-center mb-4">
              <FaUniversity className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-white">InternetBanking</h2>
            <p className="mt-2 text-blue-200">Conta criada com sucesso!</p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <FaCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Conta criada com sucesso!
            </h3>
            <p className="text-gray-600 mb-6">{successMessage}</p>
            <p className="text-sm text-gray-500 mb-6">
              Verifique sua caixa de entrada e spam para encontrar o email com
              as informações da sua conta.
            </p>
            <Link
              to="/"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Voltar para o Login
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-blue-200">
              © 2025 SecureBank. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-white rounded-full flex items-center justify-center mb-4">
            <FaUniversity className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-white">InternetBanking</h2>
          <p className="mt-2 text-blue-200">Crie sua conta</p>
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome Completo *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Digite seu nome completo"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Digite seu email"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="cpf"
                className="block text-sm font-medium text-gray-700"
              >
                CPF *
              </label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                required
                value={formData.cpf}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="000.000.000-00"
                disabled={isLoading}
                maxLength="14"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Digite sua senha (mín. 6 caracteres)"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar Senha *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Confirme sua senha"
                disabled={isLoading}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.name.trim() ||
                  !formData.email.trim() ||
                  !formData.password.trim() ||
                  !formData.confirmPassword.trim() ||
                  !formData.cpf.trim()
                }
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading && (
                  <AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                )}
                {isLoading ? "Criando conta..." : "Criar conta"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Faça login
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

export default Signup;

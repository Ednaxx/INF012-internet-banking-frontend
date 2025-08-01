import React from 'react';
import { Link } from 'react-router';
import { FaBolt } from 'react-icons/fa';

const LoginExtras = ({ handleDemoLogin, isLoading }) => {
  return (
    <>
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
    </>
  );
};

export default LoginExtras;

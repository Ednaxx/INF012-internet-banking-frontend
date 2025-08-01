import React from "react";
import { Navigate } from "react-router";
import { useLogin } from "./hooks";
import { LoginHeader, LoginForm, LoginExtras } from "../../components/Login";

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
        <LoginHeader />

        <div className="bg-white rounded-lg shadow-xl p-8">
          <LoginForm
            formData={formData}
            isLoading={isLoading}
            error={error}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />

          <LoginExtras
            handleDemoLogin={handleDemoLogin}
            isLoading={isLoading}
          />
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

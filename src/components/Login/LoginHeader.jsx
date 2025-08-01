import React from "react";
import { FaUniversity } from "react-icons/fa";

const LoginHeader = () => {
  return (
    <div className="text-center">
      <div className="mx-auto h-12 w-12 bg-white rounded-full flex items-center justify-center mb-4">
        <FaUniversity className="h-8 w-8 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold text-white">InternetBanking</h2>
      <p className="mt-2 text-blue-200">Faça login na sua conta</p>
    </div>
  );
};

export default LoginHeader;

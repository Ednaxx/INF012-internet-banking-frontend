import React from "react";
import { FaUniversity, FaArrowLeft } from "react-icons/fa";

const PageHeader = ({ title, subtitle, showBackButton, onBack, children }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={onBack}
                className="mr-4 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <FaArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <FaUniversity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
            </div>
          </div>
          {children}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;

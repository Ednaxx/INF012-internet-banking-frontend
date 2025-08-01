import { useState } from "react";
import { useUserStore } from "../../store";

export const useLogin = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    branch: "",
    password: "",
  });

  const { authenticate, isLoading, error, isAuth, clearError } = useUserStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.accountNumber.trim() || !formData.branch.trim() || !formData.password.trim()) {
      return;
    }

    const result = await authenticate(formData);

    if (!result.success) {
      console.error("Login failed:", result.error);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      accountNumber: "12345678",
      branch: "001",
      password: "password",
    });
  };

  return {
    formData,
    isLoading,
    error,
    isAuth,
    handleInputChange,
    handleSubmit,
    handleDemoLogin,
  };
};

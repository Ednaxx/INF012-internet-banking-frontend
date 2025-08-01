import { useState } from "react";
import { useUserStore } from "../../store";

export const useSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { signup, isLoading, error, isAuth, clearError } = useUserStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === "cpf") {
      formattedValue = formatCPF(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim() ||
      !formData.cpf.trim()
    ) {
      clearError();
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      // TODO: This would typically set an error in the store, but for simplicity we'll handle it locally
      alert("As senhas não coincidem");
      return;
    }

    const cleanData = {
      ...formData,
      cpf: formData.cpf.replace(/\D/g, ""),
    };

    const result = await signup(cleanData);

    if (result.success) {
      setSignupSuccess(true);
      setSuccessMessage(result.message);
    } else {
      console.error("Signup failed:", result.error);
    }
  };

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  };

  return {
    formData,
    isLoading,
    error,
    isAuth,
    signupSuccess,
    successMessage,
    handleInputChange,
    handleSubmit,
  };
};

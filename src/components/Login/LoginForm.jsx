import React from 'react';
import { FaUser, FaUniversity, FaLock } from 'react-icons/fa';
import FormInput from '../shared/FormInput';
import LoadingButton from '../shared/LoadingButton';
import AlertMessage from '../shared/AlertMessage';

const LoginForm = ({ 
  formData, 
  isLoading, 
  error, 
  handleInputChange, 
  handleSubmit 
}) => {
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && <AlertMessage type="error" message={error} />}

      <FormInput
        label="Número da Conta"
        id="accountNumber"
        name="accountNumber"
        type="text"
        value={formData.accountNumber}
        onChange={handleInputChange}
        placeholder="Digite o número da conta"
        icon={FaUser}
        required
        disabled={isLoading}
        autoComplete="accountNumber"
      />

      <FormInput
        label="Agência"
        id="branch"
        name="branch"
        type="text"
        value={formData.branch}
        onChange={handleInputChange}
        placeholder="Digite o número da agência"
        icon={FaUniversity}
        required
        disabled={isLoading}
        autoComplete="branch"
      />

      <FormInput
        label="Senha"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Digite sua senha"
        icon={FaLock}
        required
        disabled={isLoading}
        autoComplete="current-password"
      />

      <LoadingButton
        type="submit"
        disabled={
          isLoading ||
          !formData.accountNumber.trim() ||
          !formData.branch.trim() ||
          !formData.password.trim()
        }
        isLoading={isLoading}
        loadingText="Entrando..."
        className="w-full"
      >
        Entrar
      </LoadingButton>
    </form>
  );
};

export default LoginForm;

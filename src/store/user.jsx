import axios from "axios";
import { createStore } from "./util";

// Mock data for demo purposes
const MOCK_USER_DATA = {
  name: "João Silva Santos",
  accountNumber: "12345678",
  branch: "001",
};

const MOCK_BALANCE = 15420.5;

const MOCK_TRANSACTIONS = [
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    operationType: "DEPOSIT",
    amount: 500.0,
    description: "Depósito em dinheiro",
    timestamp: "2025-07-30T10:30:00",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174002",
    operationType: "WITHDRAWAL",
    amount: 200.0,
    description: "Saque no caixa eletrônico",
    timestamp: "2025-07-29T14:15:00",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174003",
    operationType: "TRANSFER",
    amount: 1000.0,
    description: "Transferência para João Santos",
    targetAccountNumber: "98765432",
    timestamp: "2025-07-28T09:45:00",
  },
];

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useUserStore = createStore(
  "user",
  (set, get) => {
    return {
      // State
      token: null,
      name: null,
      accountNumber: null,
      branch: null,
      isAuthenticated: false,
      isAuth: false, // For router guard
      isLoading: false,
      error: null,

      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Authentication API
      authenticate: async (credentials) => {
        const { accountNumber, branch, password } = credentials;

        try {
          set({ isLoading: true, error: null });

          // Mock API call delay
          await delay(800);

          // Mock authentication - in real app, this would be a POST to /auth/login
          if (accountNumber && branch && password) {
            // Simulate successful login
            const mockToken = `jwt-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            set({
              token: mockToken,
              name: MOCK_USER_DATA.name,
              accountNumber: MOCK_USER_DATA.accountNumber,
              branch: MOCK_USER_DATA.branch,
              isAuthenticated: true,
              isAuth: true,
              isLoading: false,
              error: null,
            });

            return { success: true, data: MOCK_USER_DATA };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || "Authentication failed",
            isAuthenticated: false,
            isAuth: false,
          });
          return { success: false, error: error.message };
        }
      },

      // Signup API
      signup: async (signupData) => {
        const { name, cpf, email, password } = signupData;

        try {
          set({ isLoading: true, error: null });

          // Mock API call delay
          await delay(1000);

          // Mock validation
          if (!name || !password || !email || !cpf) {
            throw new Error(
              "Todos os campos obrigatórios devem ser preenchidos",
            );
          }

          if (password.length < 6) {
            throw new Error("A senha deve ter pelo menos 6 caracteres");
          }

          // Mock email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            throw new Error("Email inválido");
          }

          // Mock CPF validation (basic)
          if (cpf.replace(/\D/g, "").length !== 11) {
            throw new Error("CPF deve ter 11 dígitos");
          }

          // Simulate successful signup
          const mockAccountNumber =
            Math.floor(Math.random() * 90000000) + 10000000;
          const mockBranch = String(
            Math.floor(Math.random() * 999) + 1,
          ).padStart(3, "0");
          const mockToken = `jwt-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

          const newUserData = {
            name,
            email,
            accountNumber: mockAccountNumber.toString(),
            branch: mockBranch,
            balance: 0.0,
            cpf,
          };

          set({
            token: mockToken,
            name: newUserData.name,
            accountNumber: newUserData.accountNumber,
            branch: newUserData.branch,
            isAuthenticated: true,
            isAuth: true,
            isLoading: false,
            error: null,
          });

          return { success: true, data: newUserData };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || "Falha no cadastro",
            isAuthenticated: false,
            isAuth: false,
          });
          return { success: false, error: error.message };
        }
      },

      // Get balance
      getBalance: async () => {
        try {
          const { token } = get();
          if (!token) {
            throw new Error("No authentication token");
          }

          // Mock API call delay
          await delay(300);

          return {
            success: true,
            balance: MOCK_BALANCE,
          };
        } catch (error) {
          return {
            success: false,
            error: error.message || "Failed to fetch balance",
          };
        }
      },

      // Deposit money
      deposit: async (amount, description = null) => {
        try {
          set({ isLoading: true, error: null });

          const { token } = get();
          if (!token) {
            throw new Error("No authentication token");
          }

          if (!amount || amount <= 0) {
            throw new Error("Invalid deposit amount");
          }

          // Mock API call delay
          await delay(1000);

          const transaction = {
            id: `dep_${Date.now()}`,
            operationType: "DEPOSIT",
            amount: parseFloat(amount),
            description: description || "Depósito em dinheiro",
            timestamp: new Date().toISOString(),
          };

          set({ isLoading: false });

          return {
            success: true,
            transaction,
            newBalance: MOCK_BALANCE + parseFloat(amount),
          };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || "Deposit failed",
          });
          return {
            success: false,
            error: error.message,
          };
        }
      },

      // Withdraw money
      withdraw: async (amount, description = null) => {
        try {
          set({ isLoading: true, error: null });

          const { token } = get();
          if (!token) {
            throw new Error("No authentication token");
          }

          if (!amount || amount <= 0) {
            throw new Error("Invalid withdrawal amount");
          }

          if (parseFloat(amount) > MOCK_BALANCE) {
            throw new Error("Insufficient funds");
          }

          // Mock API call delay
          await delay(1000);

          const transaction = {
            id: `wit_${Date.now()}`,
            operationType: "WITHDRAWAL",
            amount: parseFloat(amount),
            description: description || "Saque em dinheiro",
            timestamp: new Date().toISOString(),
          };

          set({ isLoading: false });

          return {
            success: true,
            transaction,
            newBalance: MOCK_BALANCE - parseFloat(amount),
          };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || "Withdrawal failed",
          });
          return {
            success: false,
            error: error.message,
          };
        }
      },

      // Transfer money (Payment)
      transfer: async (transferData) => {
        const { targetAccountNumber, targetBranch, amount, description } =
          transferData;

        try {
          set({ isLoading: true, error: null });

          const { token } = get();
          if (!token) {
            throw new Error("No authentication token");
          }

          if (!amount || amount <= 0) {
            throw new Error("Invalid transfer amount");
          }

          if (!targetAccountNumber || !targetBranch) {
            throw new Error("Target account number and branch are required");
          }

          if (parseFloat(amount) > MOCK_BALANCE) {
            throw new Error("Insufficient funds");
          }

          // Mock API call delay
          await delay(1200);

          const transaction = {
            id: `tra_${Date.now()}`,
            operationType: "TRANSFER",
            amount: parseFloat(amount),
            description:
              description || `Transferência para conta ${targetAccountNumber}`,
            targetAccountNumber,
            targetBranch,
            timestamp: new Date().toISOString(),
          };

          set({ isLoading: false });

          return {
            success: true,
            transaction,
            newBalance: MOCK_BALANCE - parseFloat(amount),
          };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || "Transfer failed",
          });
          return {
            success: false,
            error: error.message,
          };
        }
      },

      // Get account statement
      getStatement: async () => {
        try {
          set({ isLoading: true, error: null });

          const { token, accountNumber, branch } = get();
          if (!token) {
            throw new Error("No authentication token");
          }

          // Mock API call delay
          await delay(800);

          set({ isLoading: false });

          return {
            success: true,
            accountNumber,
            branch,
            currentBalance: MOCK_BALANCE,
            operations: MOCK_TRANSACTIONS,
          };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch statement",
          });
          return {
            success: false,
            error: error.message,
          };
        }
      },

      // Logout
      logout: () => {
        set({
          token: null,
          name: null,
          accountNumber: null,
          branch: null,
          isAuthenticated: false,
          isAuth: false,
          isLoading: false,
          error: null,
        });
      },

      // Initialize user data (for when token exists in localStorage)
      initializeUser: async () => {
        const { token } = get();
        if (token) {
          try {
            set({ isLoading: true });

            // Mock API call to verify token and get user data
            await delay(500);

            set({
              name: MOCK_USER_DATA.name,
              accountNumber: MOCK_USER_DATA.accountNumber,
              branch: MOCK_USER_DATA.branch,
              isAuthenticated: true,
              isAuth: true,
              isLoading: false,
            });
          } catch (error) {
            // Token might be invalid, logout
            get().logout();
          }
        }
      },
    };
  },
  true, // Enable persistence for the store
);

export { useUserStore };

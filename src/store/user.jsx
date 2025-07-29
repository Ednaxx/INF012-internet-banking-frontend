import axios from "axios";
import { createStore } from "./util";

// Mock data for demo purposes
const MOCK_USER_DATA = {
  username: "john.doe",
  accountNumber: "1234567890",
  branch: "Main Branch - Downtown",
  balance: 15420.5,
};

const MOCK_TRANSACTIONS = [
  {
    id: "1",
    type: "deposit",
    amount: 500.0,
    date: "2025-07-28T10:30:00Z",
    description: "Cash deposit at ATM",
    balance: 15420.5,
  },
  {
    id: "2",
    type: "withdrawal",
    amount: 200.0,
    date: "2025-07-27T14:15:00Z",
    description: "ATM withdrawal",
    balance: 14920.5,
  },
  {
    id: "3",
    type: "transfer",
    amount: 1000.0,
    date: "2025-07-26T09:45:00Z",
    description: "Transfer to John Smith",
    balance: 15120.5,
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
      username: null,
      accountNumber: null,
      branch: null,
      balance: null,
      isAuthenticated: false,
      isAuth: false, // For router guard
      isLoading: false,
      error: null,
      transactions: [],

      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Authentication API
      authenticate: async (credentials) => {
        const { username, password } = credentials;

        try {
          set({ isLoading: true, error: null });

          // Mock API call delay
          await delay(800);

          // Mock authentication - in real app, this would be a POST to /auth/login
          if (username && password) {
            // Simulate successful login
            const mockToken = `jwt-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            set({
              token: mockToken,
              username: MOCK_USER_DATA.username,
              accountNumber: MOCK_USER_DATA.accountNumber,
              branch: MOCK_USER_DATA.branch,
              balance: MOCK_USER_DATA.balance,
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

      // Get balance
      getBalance: async () => {
        try {
          set({ isLoading: true, error: null });

          const { token } = get();
          if (!token) {
            throw new Error("No authentication token");
          }

          // Mock API call delay
          await delay(500);

          // Mock successful balance fetch
          const updatedBalance =
            MOCK_USER_DATA.balance + (Math.random() - 0.5) * 100;

          set({
            balance: updatedBalance,
            isLoading: false,
          });

          return { success: true, balance: updatedBalance };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch balance",
          });
          return { success: false, error: error.message };
        }
      },

      // Deposit money
      deposit: async (amount) => {
        try {
          set({ isLoading: true, error: null });

          const { token, balance } = get();
          if (!token) {
            throw new Error("No authentication token");
          }

          if (!amount || amount <= 0) {
            throw new Error("Invalid deposit amount");
          }

          // Mock API call delay
          await delay(1000);

          const newBalance = balance + parseFloat(amount);
          const transaction = {
            id: Date.now().toString(),
            type: "deposit",
            amount: parseFloat(amount),
            date: new Date().toISOString(),
            description: `Cash deposit`,
            balance: newBalance,
          };

          set((state) => ({
            balance: newBalance,
            transactions: [transaction, ...state.transactions],
            isLoading: false,
          }));

          return { success: true, transaction, newBalance };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || "Deposit failed",
          });
          return { success: false, error: error.message };
        }
      },

      // Withdraw money
      withdraw: async (amount) => {
        try {
          set({ isLoading: true, error: null });

          const { token, balance } = get();
          if (!token) {
            throw new Error("No authentication token");
          }

          if (!amount || amount <= 0) {
            throw new Error("Invalid withdrawal amount");
          }

          if (parseFloat(amount) > balance) {
            throw new Error("Insufficient funds");
          }

          // Mock API call delay
          await delay(1000);

          const newBalance = balance - parseFloat(amount);
          const transaction = {
            id: Date.now().toString(),
            type: "withdrawal",
            amount: parseFloat(amount),
            date: new Date().toISOString(),
            description: `Cash withdrawal`,
            balance: newBalance,
          };

          set((state) => ({
            balance: newBalance,
            transactions: [transaction, ...state.transactions],
            isLoading: false,
          }));

          return { success: true, transaction, newBalance };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || "Withdrawal failed",
          });
          return { success: false, error: error.message };
        }
      },

      // Transfer money
      transfer: async (transferData) => {
        const { recipientAccount, amount, description } = transferData;

        try {
          set({ isLoading: true, error: null });

          const { token, balance } = get();
          if (!token) {
            throw new Error("No authentication token");
          }

          if (!amount || amount <= 0) {
            throw new Error("Invalid transfer amount");
          }

          if (!recipientAccount) {
            throw new Error("Recipient account number is required");
          }

          if (parseFloat(amount) > balance) {
            throw new Error("Insufficient funds");
          }

          // Mock API call delay
          await delay(1200);

          const newBalance = balance - parseFloat(amount);
          const transaction = {
            id: Date.now().toString(),
            type: "transfer",
            amount: parseFloat(amount),
            date: new Date().toISOString(),
            description: description || `Transfer to ${recipientAccount}`,
            recipientAccount,
            balance: newBalance,
          };

          set((state) => ({
            balance: newBalance,
            transactions: [transaction, ...state.transactions],
            isLoading: false,
          }));

          return { success: true, transaction, newBalance };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || "Transfer failed",
          });
          return { success: false, error: error.message };
        }
      },

      // Get account statement
      getStatement: async (dateRange) => {
        try {
          set({ isLoading: true, error: null });

          const { token } = get();
          if (!token) {
            throw new Error("No authentication token");
          }

          // Mock API call delay
          await delay(800);

          // For mock purposes, return stored transactions plus some mock ones
          const { transactions } = get();
          const allTransactions = [...transactions, ...MOCK_TRANSACTIONS];

          // Filter by date range if provided
          let filteredTransactions = allTransactions;
          if (dateRange?.startDate && dateRange?.endDate) {
            const start = new Date(dateRange.startDate);
            const end = new Date(dateRange.endDate);

            filteredTransactions = allTransactions.filter((transaction) => {
              const transactionDate = new Date(transaction.date);
              return transactionDate >= start && transactionDate <= end;
            });
          }

          set({
            transactions: filteredTransactions,
            isLoading: false,
          });

          return { success: true, transactions: filteredTransactions };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch statement",
          });
          return { success: false, error: error.message };
        }
      },

      // Logout
      logout: () => {
        set({
          token: null,
          username: null,
          accountNumber: null,
          branch: null,
          balance: null,
          isAuthenticated: false,
          isAuth: false,
          isLoading: false,
          error: null,
          transactions: [],
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
              username: MOCK_USER_DATA.username,
              accountNumber: MOCK_USER_DATA.accountNumber,
              branch: MOCK_USER_DATA.branch,
              balance: MOCK_USER_DATA.balance,
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

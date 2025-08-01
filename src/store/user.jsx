import { createStore } from "./util";
import useAppStore from "./app";

const api = useAppStore.getState().httpClient;

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("user"))?.state?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useUserStore = createStore(
  "user",
  (set, get) => {
    return {
      token: null,
      name: null,
      accountNumber: null,
      branch: null,
      isAuthenticated: false,
      isAuth: false,
      isLoading: false,
      error: null,

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      authenticate: async (credentials) => {
        const { accountNumber, branch, password } = credentials;

        try {
          set({ isLoading: true, error: null });

          const response = await api.post("/auth", {
            accountNumber,
            branch,
            password,
          });

          const {
            token,
            name,
            accountNumber: accNum,
            branch: branchNum,
          } = response.data;

          set({
            token,
            name,
            accountNumber: accNum,
            branch: branchNum,
            isAuthenticated: true,
            isAuth: true,
            isLoading: false,
            error: null,
          });

          return { success: true, data: response.data };
        } catch (error) {
          const errorMessage =
            error.response?.status == 401
              ? "Credenciais inválidas"
              : "Falha na autenticação";
          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
            isAuth: false,
          });
          return { success: false, error: errorMessage };
        }
      },

      signup: async (signupData) => {
        const { name, cpf, email, password } = signupData;

        try {
          set({ isLoading: true, error: null });

          const response = await api.post("/users", {
            name,
            cpf: cpf.replace(/\D/g, ""),
            email,
            password,
          });

          set({ isLoading: false });

          return {
            success: true,
            data: response.data,
            message:
              "Conta criada com sucesso! Um email com as informações da sua conta foi enviado.",
          };
        } catch (error) {
          let errorMessage;

          if (
            error.response?.data?.message.includes("CPF already registered")
          ) {
            errorMessage = "Usuário já cadastrado";
          } else if (
            error.response?.data?.message.includes("Email already registered")
          ) {
            errorMessage = "Email já cadastrado";
          } else {
            errorMessage = "Falha no cadastro";
          }

          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
            isAuth: false,
          });
          return { success: false, error: errorMessage };
        }
      },

      getBalance: async () => {
        try {
          const { token } = get();
          if (!token) {
            throw new Error("Token de autenticação não encontrado");
          }

          const response = await api.get("/accounts/balance");

          return {
            success: true,
            balance: response.data.balance,
            accountNumber: response.data.accountNumber,
            branch: response.data.branch,
          };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Falha ao obter saldo";
          return {
            success: false,
            error: errorMessage,
          };
        }
      },

      deposit: async (amount, description = null) => {
        try {
          set({ isLoading: true, error: null });

          const { token } = get();
          if (!token) {
            throw new Error("Token de autenticação não encontrado");
          }

          const response = await api.post("/accounts/deposit", {
            amount: parseFloat(amount),
            description: description || "Depósito em dinheiro",
          });

          set({ isLoading: false });

          return {
            success: true,
            transaction: {
              id: response.data.id,
              operationType: response.data.type,
              amount: response.data.amount,
              description: response.data.description,
              timestamp: response.data.createdAt,
            },
            newBalance: response.data.newBalance,
          };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Falha no depósito";
          set({
            isLoading: false,
            error: errorMessage,
          });
          return {
            success: false,
            error: errorMessage,
          };
        }
      },

      withdraw: async (amount, description = null) => {
        try {
          set({ isLoading: true, error: null });

          const { token } = get();
          if (!token) {
            throw new Error("Token de autenticação não encontrado");
          }

          const response = await api.post("/accounts/withdraw", {
            amount: parseFloat(amount),
            description: description || "Saque em dinheiro",
          });

          set({ isLoading: false });

          return {
            success: true,
            transaction: {
              id: response.data.id,
              operationType: response.data.type,
              amount: response.data.amount,
              description: response.data.description,
              timestamp: response.data.createdAt,
            },
            newBalance: response.data.newBalance,
          };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Falha no saque";
          set({
            isLoading: false,
            error: errorMessage,
          });
          return {
            success: false,
            error: errorMessage,
          };
        }
      },

      transfer: async (transferData) => {
        const { targetAccountNumber, targetBranch, amount, description } =
          transferData;

        try {
          set({ isLoading: true, error: null });

          const { token } = get();
          if (!token) {
            throw new Error("Token de autenticação não encontrado");
          }

          const response = await api.post("/accounts/payment", {
            receiverUsername: `${targetBranch}-${targetAccountNumber}`,
            amount: parseFloat(amount),
            description:
              description || `Transferência para conta ${targetAccountNumber}`,
          });

          set({ isLoading: false });

          return {
            success: true,
            transaction: {
              id: response.data.id,
              operationType: response.data.type,
              amount: response.data.amount,
              description: response.data.description,
              targetAccountNumber,
              targetBranch,
              timestamp: response.data.createdAt,
            },
            newBalance: response.data.newBalance,
          };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Falha na transferência";
          set({
            isLoading: false,
            error: errorMessage,
          });
          return {
            success: false,
            error: errorMessage,
          };
        }
      },

      getStatement: async () => {
        try {
          set({ isLoading: true, error: null });

          const { token } = get();
          if (!token) {
            throw new Error("Token de autenticação não encontrado");
          }

          const response = await api.get("/accounts/statement");

          set({ isLoading: false });

          return {
            success: true,
            accountNumber: response.data.accountNumber,
            branch: response.data.branch,
            currentBalance: response.data.currentBalance,
            operations: response.data.operations.map((op) => ({
              id: op.id,
              operationType: op.type,
              amount: op.amount,
              description: op.description,
              timestamp: op.createdAt,
              receiverUsername: op.receiverUsername,
            })),
          };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Falha ao buscar extrato";
          set({
            isLoading: false,
            error: errorMessage,
          });
          return {
            success: false,
            error: errorMessage,
          };
        }
      },

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

      initializeUser: async () => {
        const { token } = get();
        if (token) {
          try {
            set({ isLoading: true });

            await api.get("/accounts/balance");

            set({
              isAuthenticated: true,
              isAuth: true,
              isLoading: false,
            });
          } catch (error) {
            get().logout();
            set({ isLoading: false });
          }
        }
      },
    };
  },
  true,
);

export { useUserStore };

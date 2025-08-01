import axios from "axios";
import { createStore } from "./util";

const useAppStore = createStore("app", (set) => {
  const baseApiUrl =
    import.meta.env.VITE_BASE_API_URL || "http://localhost:3000/api";
  const httpClient = axios.create({
    baseURL: baseApiUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    isLoading: false,
    error: null,
    httpClient,
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),
  };
});

export default useAppStore;

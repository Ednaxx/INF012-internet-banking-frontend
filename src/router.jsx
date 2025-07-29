import { Routes, Route, Navigate } from "react-router";
import { useUserStore } from "./store";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const RouterGuard = ({ children }) => {
  const isAuth = useUserStore((state) => state.isAuth);

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route 
        path="/dashboard" 
        element={
          <RouterGuard>
            <Dashboard />
          </RouterGuard>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export { AppRouter, RouterGuard };

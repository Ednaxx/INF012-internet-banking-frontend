import { Routes, Route, Navigate } from "react-router";
import { useUserStore } from "./store";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdrawal from "./pages/Withdrawal";
import Transfer from "./pages/Transfer";
import Statement from "./pages/Statement";

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
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          <RouterGuard>
            <Dashboard />
          </RouterGuard>
        }
      />
      
      <Route
        path="/deposit"
        element={
          <RouterGuard>
            <Deposit />
          </RouterGuard>
        }
      />
      
      <Route
        path="/withdrawal"
        element={
          <RouterGuard>
            <Withdrawal />
          </RouterGuard>
        }
      />
      
      <Route
        path="/transfer"
        element={
          <RouterGuard>
            <Transfer />
          </RouterGuard>
        }
      />
      
      <Route
        path="/statement"
        element={
          <RouterGuard>
            <Statement />
          </RouterGuard>
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export { AppRouter, RouterGuard };

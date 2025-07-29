import { Routes, Route, Navigate } from "react-router";
import { useUserStore } from "./store";

// RouterGuard component to protect routes
const RouterGuard = ({ children }) => {
  const isAuth = useUserStore((state) => state.isAuth);

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Main router component
const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<div>Landing/Login Page</div>} />

      {/* Protected routes will be added here later */}
      {/* Example of how to use RouterGuard:
      <Route 
        path="/dashboard" 
        element={
          <RouterGuard>
            <DashboardPage />
          </RouterGuard>
        } 
      />
      */}

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export { AppRouter, RouterGuard };

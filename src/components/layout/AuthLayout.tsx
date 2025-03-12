
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AuthLayout = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Special case for verify-email page
  if (location.pathname === "/verify-email") {
    return <Outlet />;
  }

  // For /auth route, redirect to message board if already authenticated
  if (location.pathname === "/auth" && isAuthenticated) {
    return <Navigate to="/message-board" replace />;
  }

  // Special case for email verification - check if email is verified
  if (user && !user.verifiedEmail) {
    // In a real app, you might want to redirect to a "please verify your email" page
    // For this demo, we'll just let them through since we're not actually sending emails
  }

  return <Outlet />;
};

export default AuthLayout;

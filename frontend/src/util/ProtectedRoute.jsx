import { Navigate } from "react-router-dom";
import { getUser } from "./auth";

export const ProtectedRoute = ({ children }) => {
  const user = getUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AdminExcludedRoute = ({ children }) => {
  const user = getUser();

  if (user && user.user_admin) {
    return <Navigate to="/user/user-list" replace />;
  }

  return children;
};

export const AdminProtectedRoute = ({ children }) => {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.user_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AgentProtectedRoute = ({ children }) => {
  const user = getUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.user_agent) {
    return <Navigate to="/" replace />;
  }

  return children;
};

import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const ProtectedRoute = ({ children }) => {
  const [cookie] = useCookies();
  const user_type = cookie.user_type;
  if (!user_type) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AdminExcludedRoute = ({ children }) => {
  const [cookie] = useCookies();
  const user_type = cookie.user_type;
  if (user_type && user_type === "admin") {
    return <Navigate to="/user/user-list" replace />;
  }

  return children;
};

export const AdminProtectedRoute = ({ children }) => {
  const [cookie] = useCookies();
  const user_type = cookie.user_type;
  if (!user_type) {
    return <Navigate to="/login" replace />;
  }

  if (user_type !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AgentProtectedRoute = ({ children }) => {
  const [cookie] = useCookies();
  const user_type = cookie.user_type;
  if (!user_type) {
    return <Navigate to="/login" replace />;
  }

  if (user_type !== "agent") {
    return <Navigate to="/" replace />;
  }

  return children;
};

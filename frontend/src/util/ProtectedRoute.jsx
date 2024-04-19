import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  let user = useSelector((state) => state.auth.user);

  if (!user) {
    user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export const AdminExcludedRoute = ({ children }) => {
  let user = useSelector((state) => state.auth.user);

  if (!user) {
    user = JSON.parse(localStorage.getItem("user"));

    if (user && user.user_admin) {
      return <Navigate to="/user/user-list" replace />;
    }
  }

  return children;
};

export const AdminProtectedRoute = ({ children }) => {
  let user = useSelector((state) => state.auth.user);

  if (!user) {
    user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  }

  if (!user.user_admin) {
    toast.error("You have no access to this page!");
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AgentProtectedRoute = ({ children }) => {
  let user = useSelector((state) => state.auth.user);

  if (!user) {
    user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  }

  if (!user.user_agent) {
    toast.error("You have no access to this page!");
    return <Navigate to="/" replace />;
  }

  return children;
};

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

export const AdminProtectedRoute = ({ children }) => {
  let user = useSelector((state) => state.auth.user);

  if (!user) {
    user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  }

  if (!user.user_sys_admin) {
    toast.error("You have no access to this page!");
    return <Navigate to="/" replace />;
  }

  return children;
};

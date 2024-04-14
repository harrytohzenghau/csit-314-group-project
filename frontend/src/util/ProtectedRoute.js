import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    redirect("/");
    return;
  }

  return children;
};

export default ProtectedRoute;

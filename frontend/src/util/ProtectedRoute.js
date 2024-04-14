import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return;
  }

  return children;
};

export default ProtectedRoute;

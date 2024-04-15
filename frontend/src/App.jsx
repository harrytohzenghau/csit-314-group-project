import { RouterProvider } from "react-router-dom";
import route from "./router/route";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    dispatch(login({ user, token }));
  }, [dispatch]);

  return <RouterProvider router={route} />;
}

export default App;

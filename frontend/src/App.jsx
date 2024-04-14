import { RouterProvider } from "react-router-dom";
import route from "./router/route";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setIsLoggedIn } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    dispatch(setIsLoggedIn({ token }));
  }, []);

  return <RouterProvider router={route} />;
}

export default App;

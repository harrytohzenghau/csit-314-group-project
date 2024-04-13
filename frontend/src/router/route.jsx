import { createBrowserRouter } from "react-router-dom";

import Root from "../components/Layout/Root";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PropertyListingPage from "../pages/PropertyListingPage";
import Mortgages from "../pages/Mortgages";
import SavedListingPage from "../pages/SavedListingPage";
import YourAgentPage from "../pages/YourAgentPage";
import ProfilePage from "../pages/ProfilePage";
import CreateUserPage from "../pages/CreateUserPage";
import ProfileListPage from "../pages/ProfileListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/property-listing", element: <PropertyListingPage /> },
      { path: "/mortgages", element: <Mortgages /> },
      { path: "/saved-listing", element: <SavedListingPage /> },
      { path: "/your-agent", element: <YourAgentPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/create-user", element: <CreateUserPage/>},
      { path: "/profile-list", element: <ProfileListPage/>}
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";

import Root from "../components/Layout/Root";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PropertyListingPage from "../pages/PropertyListingPage";
import MortgagesPage from "../pages/MortgagesPage";
import SavedListingPage from "../pages/SavedListingPage";
import YourAgentPage from "../pages/YourAgentPage";
import ProfilePage from "../pages/ProfilePage";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "../util/ProtectedRoute";
import CreateUserPage from "../pages/CreateUserPage";
import ProfileListPage from "../pages/ProfileListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/login",
        element: <LoginPage />,
      },
      { path: "/register", element: <RegisterPage /> },
      { path: "/property-listing", element: <PropertyListingPage /> },
      { path: "/mortgages", element: <MortgagesPage /> },
      {
        path: "/saved-listing",
        element: (
          <ProtectedRoute>
            <SavedListingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/your-agent",
        element: (
          <ProtectedRoute>
            <YourAgentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-user",
        element: (
          <ProtectedRoute>
            <CreateUserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile-list",
        element: (
          <ProtectedRoute>
            <ProfileListPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;

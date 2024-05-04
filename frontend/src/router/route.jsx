import { createBrowserRouter } from "react-router-dom";

import Root from "../components/Layout/Root";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PropertyListingPage from "../pages/Property/PropertyListingPage";
import MortgagesPage from "../pages/MortgagesPage";
import SavedListingPage from "../pages/SavedListingPage";
import YourAgentPage from "../pages/YourAgentPage";
import ProfilePage from "../pages/ProfilePage";
import ErrorPage from "../pages/ErrorPage";
import CreateUserPage from "../pages/CreateUserPage";
import UserListPage from "../pages/Profile/UserListPage";
import EditProfile from "../components/Profile/EditProfile";
import AdminListPage from "../pages/Profile/AdminListPage";
import AgentListPage from "../pages/Profile/AgentListPage";
import CreatePropertyPage from "../pages/Property/CreatePropertyPage";
import EditPropertyPage from "../pages/Property/EditPropertyPage";
import PropertyPage from "../pages/PropertyPage";
import FindAgentPage from "../pages/FindAgentPage";
import ManageRatingPage from "../pages/ManageRatingPage";

import {
  ProtectedRoute,
  AdminProtectedRoute,
  AdminExcludedRoute,
  AgentProtectedRoute,
} from "../util/ProtectedRoute";
import PropertyDetailPage from "../pages/Property/PropertyDetailPage";
import YourPropertyListingPage from "../pages/Property/YourPropertyListingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <AdminExcludedRoute>
            <HomePage />
          </AdminExcludedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      { path: "register", element: <RegisterPage /> },
      { path: "property", element: <PropertyPage /> },
      { path: "mortgages", element: <MortgagesPage /> },
      { path: "find-agent", element: <FindAgentPage /> },
      {
        path: "saved-listing",
        element: (
          <ProtectedRoute>
            <SavedListingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "your-listing",
        element: (
          <ProtectedRoute>
            <YourPropertyListingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "your-agent",
        element: (
          <ProtectedRoute>
            <YourAgentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        children: [
          {
            path: "create-user",
            element: (
              <AdminProtectedRoute>
                <CreateUserPage />
              </AdminProtectedRoute>
            ),
          },
          {
            path: "user-list",
            element: (
              <AdminProtectedRoute>
                <UserListPage />
              </AdminProtectedRoute>
            ),
          },
          {
            path: "admin-list",
            element: (
              <AdminProtectedRoute>
                <AdminListPage />
              </AdminProtectedRoute>
            ),
          },
          {
            path: "agent-list",
            element: (
              <AdminProtectedRoute>
                <AgentListPage />
              </AdminProtectedRoute>
            ),
          },
          {
            path: "property-list",
            element: (
              <AdminProtectedRoute>
                <PropertyListingPage />
              </AdminProtectedRoute>
            ),
          },
          {
            path: "property",
            children: [
              {
                path: "create",
                element: (
                  <AdminProtectedRoute>
                    <CreatePropertyPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: ":id",
                element: <PropertyDetailPage />,
              },
              {
                path: "edit",
                children: [
                  {
                    path: ":id",
                    element: (
                      <AdminProtectedRoute>
                        <EditPropertyPage />
                      </AdminProtectedRoute>
                    ),
                  },
                ],
              },
            ],
          },
          {
            path: "property-list",
            element: (
              <AdminProtectedRoute>
                <PropertyListingPage />
              </AdminProtectedRoute>
            ),
          },
          {
            path: "edit-user/:id",
            element: <EditProfile />,
          },
        ],
      },
      {
        path: "agent",
        children: [
          {
            path: "property-list",
            element: (
              <AgentProtectedRoute>
                <PropertyListingPage />
              </AgentProtectedRoute>
            ),
          },
          {
            path: "create-property",
            element: (
              <AgentProtectedRoute>
                <CreatePropertyPage />
              </AgentProtectedRoute>
            ),
          },
          {
            path: "edit-property/:id",
            element: (
              <AgentProtectedRoute>
                <EditPropertyPage />
              </AgentProtectedRoute>
            ),
          },
          {
            path: "manage-rating",
            element: (
              <AgentProtectedRoute>
                <ManageRatingPage />
              </AgentProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "property",
        children: [
          {
            path: ":id",
            element: <PropertyDetailPage />,
          },
        ],
      },
    ],
  },
]);

export default router;

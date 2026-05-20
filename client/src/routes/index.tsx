import {
  createBrowserRouter,
} from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";

import LeadDetailsPage from "../pages/dashboard/LeadDetailsPage";

import SettingsPage from "../pages/dashboard/SettingsPage";

import UsersPage from "../pages/dashboard/UsersPage";

import DashboardPage from "../pages/dashboard/DashboardPage";

import DashboardLayout from "../layouts/DashboardLayout";

import KanbanPage from "../pages/dashboard/KanbanPage";

import ProtectedRoute from "./ProtectedRoute";

export const router =
  createBrowserRouter([

    {
      path: "/",

      element: <LoginPage />
    },

    {
      element: <ProtectedRoute />,

      children: [

        {
          path: "/dashboard",

          element:
            <DashboardLayout />,

          children: [

            {
              index: true,

              element:
                <DashboardPage />
            },

            {
              path: "leads/:id",

              element:
                <LeadDetailsPage />
            },
            {
              path: "pipeline",

              element:
                <KanbanPage />
            },
            {
              path: "settings",

              element:
                <SettingsPage />
            },
            {
              path: "users",

              element:
                <UsersPage />
            },

            


          ]
        }

      ]
    }

  ]);
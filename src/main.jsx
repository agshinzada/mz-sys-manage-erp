import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import MainLayout from "./layout/Layout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoute from "./route/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import OrderListPage from "./pages/sys/OrderListPage.jsx";
import PaymentListPage from "./pages/sys/PaymentListPage.jsx";
import PaymentRemainPage from "./pages/sys/PaymentRemainPage.jsx";
import ClientCategoryPage from "./pages/client/ClientCategoryPage.jsx";
import DiscountPage from "./pages/client/DiscountPage.jsx";
import CampaignPage from "./pages/client/CampaignPage.jsx";
import DeliveryPage from "./pages/client/DeliveryPage.jsx";
import VisitDayPage from "./pages/client/VisitDayPage.jsx";
import ClientUsersPage from "./pages/client/ClientUsersPage.jsx";
import SysUsersPage from "./pages/sys/SysUsersPage.jsx";
import LogoOrderPage from "./pages/sys/LogoOrderPage.jsx";
import BulkClientPage from "./pages/client/BulkClientPage.jsx";
import LogPage from "./pages/client/LogPage.jsx";
import ArchiveUsersPage from "./pages/archive/ArchiveUsersPage.jsx";
import MobimDevicePage from "./pages/mobim/MobimDevicePage.jsx";
import MobimConnectionPage from "./pages/mobim/MobimConnectionPage.jsx";
import RetrificationReportPage from "./pages/report/RetrificationReportPage.jsx";
import StatusCodesPage from "./pages/sys/StatusCodesPage.jsx";
import { SiteProvider } from "./context/SiteContext.jsx";
import DashboardPage from "./pages/sys/DashboardPage.jsx";
import SysBrandPage from "./pages/sys/SysBrandPage.jsx";
import SysRegionPage from "./pages/sys/SysRegionPage.jsx";
import ArchiveLogPage from "./pages/archive/ArchiveLogPage.jsx";
import OrderkindCodesPage from "./pages/sys/OrderkindCodesPage.jsx";
import MobimUserPage from "./pages/mobim/MobimUserPage.jsx";
import MobimTaskPage from "./pages/mobim/MobimTaskPage.jsx";
import MobimServicePage from "./pages/mobim/MobimServicePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute allowedRoles={["ADMIN", "MODERATOR"]}>
        <MainLayout>
          <App />
        </MainLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: (
          <PrivateRoute allowedRoles={["ADMIN", "MODERATOR"]}>
            <DashboardPage />
          </PrivateRoute>
        ),
      },
      {
        path: "orders/list",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <OrderListPage />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "payments/list",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <PaymentListPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "payments/remain",
        element: (
          <PrivateRoute allowedRoles={["ADMIN", "MODERATOR"]}>
            <PaymentRemainPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "client/category",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <ClientCategoryPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "client/discounts",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <DiscountPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "client/campaigns",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <CampaignPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "client/delivery",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <DeliveryPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "client/visits",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <VisitDayPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "client/users",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <ClientUsersPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "client/bulk",
        element: (
          <PrivateRoute allowedRoles={["ADMIN", "MODERATOR"]}>
            <BulkClientPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "client/logs",
        element: (
          <PrivateRoute allowedRoles={["ADMIN", "MODERATOR"]}>
            <LogPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "setting/users",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <SysUsersPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "setting/brands",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <SysBrandPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "setting/regions",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <SysRegionPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "setting/status",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <StatusCodesPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "setting/status/orderkind",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <OrderkindCodesPage />,{" "}
          </PrivateRoute>
        ),
      },

      {
        path: "logo/orders",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <LogoOrderPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "archive/users",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <ArchiveUsersPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "archive/logs",
        element: (
          <PrivateRoute allowedRoles={["ADMIN", "MODERATOR"]}>
            <ArchiveLogPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "mobim/devices",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <MobimDevicePage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "mobim/connections",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <MobimConnectionPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "mobim/services",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <MobimServicePage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "mobim/tasks",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <MobimTaskPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "mobim/users",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <MobimUserPage />,{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "report/retrification",
        element: (
          <PrivateRoute allowedRoles={["ADMIN", "MODERATOR"]}>
            <RetrificationReportPage />,{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SiteProvider>
        <RouterProvider router={router} />
      </SiteProvider>
    </AuthProvider>
  </StrictMode>
);

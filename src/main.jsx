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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout>
          <App />
        </MainLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "orders/list",
        element: <OrderListPage />,
      },
      {
        path: "payments/list",
        element: <PaymentListPage />,
      },
      {
        path: "payments/remain",
        element: <PaymentRemainPage />,
      },
      {
        path: "client/category",
        element: <ClientCategoryPage />,
      },
      {
        path: "client/discounts",
        element: <DiscountPage />,
      },
      {
        path: "client/campaigns",
        element: <CampaignPage />,
      },
      {
        path: "client/delivery",
        element: <DeliveryPage />,
      },
      {
        path: "client/visits",
        element: <VisitDayPage />,
      },
      {
        path: "client/users",
        element: <ClientUsersPage />,
      },
      {
        path: "client/bulk",
        element: <BulkClientPage />,
      },
      {
        path: "client/logs",
        element: <LogPage />,
      },
      {
        path: "setting/users",
        element: <SysUsersPage />,
      },
      {
        path: "setting/brands",
        element: <SysBrandPage />,
      },
      {
        path: "setting/regions",
        element: <SysRegionPage />,
      },
      {
        path: "setting/status",
        element: <StatusCodesPage />,
      },
      {
        path: "setting/status/orderkind",
        element: <OrderkindCodesPage />,
      },

      {
        path: "logo/orders",
        element: <LogoOrderPage />,
      },
      {
        path: "archive/users",
        element: <ArchiveUsersPage />,
      },
      {
        path: "archive/logs",
        element: <ArchiveLogPage />,
      },
      {
        path: "mobim/devices",
        element: <MobimDevicePage />,
      },
      {
        path: "mobim/connections",
        element: <MobimConnectionPage />,
      },
      {
        path: "report/retrification",
        element: <RetrificationReportPage />,
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

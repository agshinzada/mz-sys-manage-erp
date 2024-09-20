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
import OrderListPage from "./pages/OrderListPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <PrivateRoute>
      <MainLayout>
        <App />
      </MainLayout>
      // </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "orders/list",
        element: <OrderListPage />,
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
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

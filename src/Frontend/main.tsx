import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./LoginPage/LoginPage.tsx";
import CheckoutPage from "./checkoutPage/checkoutPage.tsx";
import Home from "./Home.tsx";
import RecoverPassword from "./LoginPage/RecoverPassword.tsx";
import { AuthProvider } from "./Context/useAuth.tsx";
import SellerDashBoard from "./SellerDashboard/SellerDashboard.tsx";
import CreateNewGig from "./SellerDashboard/CreateNewGig/CreateNewGig.tsx";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <SellerDashBoard />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <LoginPage registerMode={true} />,
      },
      {
        path: "/forgotPassword",
        element: <RecoverPassword />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/dashboard",
        element: <SellerDashBoard />,
      },
      {
        path: "/dashboard/create",
        element: <CreateNewGig />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);

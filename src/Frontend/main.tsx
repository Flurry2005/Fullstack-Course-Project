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
import ChatPage from "./ChatPage/ChatPage.tsx";
import { OrderProvider } from "./Context/useOrders.tsx";
import { SocketProvider } from "./Context/useSocket.tsx";
import ServiceListings from "./ServiceListings/ServiceListings.tsx";
import ServiceDetail from "./ServiceDetail/Main.tsx";

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
      {
        path: "/messages",
        element: <ChatPage />,
      },
      {
        path: "/services",
        element: <ServiceListings />,
      },
      {
        path: "/services/:gigId",
        element: (
          <ServiceDetail
            mainCategory={null}
            subCategoryOne={null}
            subCategoryTwo={null}
          />
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <OrderProvider>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </OrderProvider>
    </AuthProvider>
  </StrictMode>,
);

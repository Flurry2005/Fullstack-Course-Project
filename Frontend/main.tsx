import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./LoginPage/LoginPage.tsx";
import CheckoutPage from "./checkoutPage/checkoutPage.tsx";
import { Outlet } from "react-router-dom";
import RecoverPassword from "./LoginPage/RecoverPassword.tsx";
import { AuthProvider } from "./Context/useAuth.tsx";
import SellerDashBoard from "./SellerDashboard/SellerDashboard.tsx";
import EditGig from "./SellerDashboard/Components/EditGig/EditGig.tsx";
import CreateNewGig from "./SellerDashboard/Components/CreateNewGig/CreateNewGig.tsx";
import ChatPage from "./ChatPage/ChatPage.tsx";
import { OrderProvider } from "./Context/useOrders.tsx";
import { SocketProvider } from "./Context/useSocket.tsx";
import ServiceListings from "./ServiceListings/ServiceListings.tsx";
import ServiceDetail from "./ServiceDetail/ServiceDetail.tsx";
import ScrollToTop from "./utils/ScrollToTop.tsx";
import ProfilePage from "./ProfilePage/ProfilePage.tsx";
import SuccessPage from "./checkoutPage/sucessPage.tsx";
import AboutPage from "./AboutPage/AboutPage.tsx";
import Home from "./HomePage/Home.tsx";

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <OrderProvider>
          <SocketProvider>
            <ScrollToTop />
            <Outlet />
          </SocketProvider>
        </OrderProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/dashboard/edit/:gigId",
        element: <EditGig />,
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
        path: "/services/:slug/:sub_slug/:gigId",
        element: (
          <ServiceDetail
            mainCategory={null}
            subCategoryOne={null}
            subCategoryTwo={null}
          />
        ),
      },
      {
        path: "/profile/:username",
        element: <ProfilePage />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

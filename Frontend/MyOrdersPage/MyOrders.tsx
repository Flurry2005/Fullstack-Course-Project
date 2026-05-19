import { useEffect, useState } from "react";
import { useAuth } from "../Context/useAuth";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import { ShoppingBag, Store, History } from "lucide-react";
import OrderCard from "./components/OrderCard";
import { useOrders } from "../Context/useOrders";
import type { Order } from "../types/Order";
import { pre } from "framer-motion/client";

export type OrderStatus =
  | "In Progress"
  | "Confirmed By Seller"
  | "Revision"
  | "Completed"
  | "Cancelled";

const apiUrl =
  import.meta.env.VITE_DEV === "true"
    ? "http://localhost:3000"
    : "https://fullstackapi.liamjorgensen.dev";

const HISTORY_STATUSES: OrderStatus[] = ["Completed", "Cancelled"];
const isHistorical = (order: Order) =>
  HISTORY_STATUSES.includes(order.delivered);

function MyOrders() {
  const { user } = useAuth();
  const { orders, setOrders } = useOrders();
  const isLoading = orders === null;
  const [activeTab, setActiveTab] = useState<
    "all" | "buying" | "selling" | "history"
  >("all");

  const roleFilteredOrders = orders?.filter((order) => {
    if (activeTab === "buying") return order.buyerUsername === user?.username;
    if (activeTab === "selling") return order.sellerUsername === user?.username;
    return true;
  });

  // History tab shows Completed/Cancelled, all other tabs show active orders
  const filteredOrders =
    activeTab === "history"
      ? orders?.filter(isHistorical)
      : roleFilteredOrders?.filter((o) => !isHistorical(o));

  const getTabCount = (tab: typeof activeTab) => {
    if (tab === "history") return orders?.filter(isHistorical).length;
    if (tab === "buying")
      return orders?.filter(
        (o) => o.buyerUsername === user?.username && !isHistorical(o),
      ).length;
    if (tab === "selling")
      return orders?.filter(
        (o) => o.sellerUsername === user?.username && !isHistorical(o),
      ).length;
    return orders?.filter((o) => !isHistorical(o)).length;
  };

  const tabs = [
    { key: "all" as const, label: "All", icon: null },
    {
      key: "buying" as const,
      label: "Buying",
      icon: <ShoppingBag size={14} />,
    },
    { key: "selling" as const, label: "Selling", icon: <Store size={14} /> },
    { key: "history" as const, label: "History", icon: <History size={14} /> },
  ];

  return (
    <main className="bg-[#f9f5ff] min-h-screen">
      <NavBar />

      <section className="mx-auto px-6 md:px-10 py-10 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-bold text-[#2c2a51] text-3xl">My Orders</h1>
          <p className="mt-1 text-[#6f6f9a] text-sm">
            Track your purchases and services
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white mb-6 p-1.5 rounded-xl w-fit">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === key
                  ? "bg-[#2d2b7c] text-white shadow-sm"
                  : "text-[#6f6f9a] hover:text-[#2c2a51]"
              }`}
            >
              {icon}
              {label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === key
                    ? "bg-white/20 text-white"
                    : "bg-[#f0eef8] text-[#5b4dc7]"
                }`}
              >
                {getTabCount(key)}
              </span>
            </button>
          ))}
        </div>

        {!orders ? (
          <div className="flex justify-center items-center bg-white p-16 rounded-2xl text-[#6f6f9a]">
            Loading orders...
          </div>
        ) : filteredOrders?.length === 0 ? (
          <div className="flex flex-col justify-center items-center bg-white p-16 rounded-2xl text-center">
            <ShoppingBag className="mb-4 text-[#c4bdf4]" size={48} />
            <h2 className="font-bold text-[#2c2a51] text-xl">No orders yet</h2>
            <p className="mt-2 text-[#6f6f9a]">
              {activeTab === "buying"
                ? "You haven't purchased any services yet."
                : activeTab === "selling"
                  ? "You don't have any active selling orders."
                  : activeTab === "history"
                    ? "You have no completed or cancelled orders."
                    : "You have no orders yet."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredOrders?.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                currentUsername={user?.username ?? ""}
                showCompleteButton={activeTab !== "history"}
                onOrderUpdated={(updatedOrder) =>
                  setOrders((prev) => {
                    if (!prev) return prev;
                    return prev.map((o) =>
                      o._id === updatedOrder._id ? updatedOrder : o,
                    );
                  })
                }
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default MyOrders;

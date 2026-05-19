import { useEffect, useState } from "react";
import { useAuth } from "../Context/useAuth";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import { ShoppingBag, Store, History } from "lucide-react";
import OrderCard from "./components/OrderCard";

export type OrderStatus =
  | "In Progress"
  | "Confirmed By Seller"
  | "Revision"
  | "Completed"
  | "Cancelled";

export type Order = {
  _id: string;
  gigId: string;
  gigname: string;
  gigTier: "basic" | "standard" | "premium";
  buyerUsername: string;
  sellerUsername: string;
  dueDate: string;
  delivered: OrderStatus;
  reviewed: boolean;
  createdAt: string;
};

const apiUrl =
  import.meta.env.VITE_DEV === "true"
    ? "http://localhost:3000"
    : "https://fullstackapi.liamjorgensen.dev";

const HISTORY_STATUSES: OrderStatus[] = ["Completed", "Cancelled"];
const isHistorical = (order: Order) =>
  HISTORY_STATUSES.includes(order.delivered);

function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "buying" | "selling" | "history"
  >("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/orders`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.data);
      } catch (err) {
        setError("Could not load your orders right now.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const roleFilteredOrders = orders.filter((order) => {
    if (activeTab === "buying") return order.buyerUsername === user?.username;
    if (activeTab === "selling") return order.sellerUsername === user?.username;
    return true;
  });

  // History tab shows Completed/Cancelled, all other tabs show active orders
  const filteredOrders =
    activeTab === "history"
      ? orders.filter(isHistorical)
      : roleFilteredOrders.filter((o) => !isHistorical(o));

  const getTabCount = (tab: typeof activeTab) => {
    if (tab === "history") return orders.filter(isHistorical).length;
    if (tab === "buying")
      return orders.filter(
        (o) => o.buyerUsername === user?.username && !isHistorical(o),
      ).length;
    if (tab === "selling")
      return orders.filter(
        (o) => o.sellerUsername === user?.username && !isHistorical(o),
      ).length;
    return orders.filter((o) => !isHistorical(o)).length;
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

        {isLoading ? (
          <div className="flex justify-center items-center bg-white p-16 rounded-2xl text-[#6f6f9a]">
            Loading orders...
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center bg-white p-16 rounded-2xl text-center">
            <h2 className="font-bold text-[#2c2a51] text-xl">
              Could not load orders
            </h2>
            <p className="mt-2 text-[#6f6f9a]">{error}</p>
          </div>
        ) : filteredOrders.length === 0 ? (
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
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                currentUsername={user?.username ?? ""}
                showCompleteButton={activeTab !== "history"}
                onOrderUpdated={(updatedOrder) =>
                  setOrders((prev) =>
                    prev.map((o) =>
                      o._id === updatedOrder._id ? updatedOrder : o,
                    ),
                  )
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

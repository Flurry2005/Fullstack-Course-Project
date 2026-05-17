import { useEffect, useState } from "react";
import { useAuth } from "../Context/useAuth";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import { ShoppingBag, Store } from "lucide-react";
import OrderCard from "./components/OrderCard";

export type Order = {
  _id: string;
  gigId: string;
  gigname: string;
  gigTier: "basic" | "standard" | "premium";
  buyerUsername: string;
  sellerUsername: string;
  dueDate: string;
  delivered: boolean;
  reviewed: boolean;
  createdAt: string;
};

const apiUrl =
  import.meta.env.VITE_DEV === "true"
    ? "http://localhost:3000"
    : "https://fullstackapi.liamjorgensen.dev";

function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "buying" | "selling">(
    "all",
  );

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

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "buying") return order.buyerUsername === user?.username;
    if (activeTab === "selling") return order.sellerUsername === user?.username;
    return true;
  });

  const activeOrders = filteredOrders.filter((o) => !o.delivered);
  const completedOrders = filteredOrders.filter((o) => o.delivered);

  return (
    <main className="bg-[#f9f5ff] min-h-screen">
      <NavBar />

      <section className="mx-auto px-6 md:px-10 py-10 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-[#2c2a51] text-3xl">My Orders</h1>
          <p className="mt-1 text-[#6f6f9a] text-sm">
            Track your purchases and services
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white mb-6 p-1.5 rounded-xl w-fit">
          {(["all", "buying", "selling"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[#2d2b7c] text-white shadow-sm"
                  : "text-[#6f6f9a] hover:text-[#2c2a51]"
              }`}
            >
              {tab === "buying" && <ShoppingBag size={14} />}
              {tab === "selling" && <Store size={14} />}
              {tab}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab
                    ? "bg-white/20 text-white"
                    : "bg-[#f0eef8] text-[#5b4dc7]"
                }`}
              >
                {tab === "all"
                  ? orders.length
                  : tab === "buying"
                    ? orders.filter((o) => o.buyerUsername === user?.username)
                        .length
                    : orders.filter((o) => o.sellerUsername === user?.username)
                        .length}
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
                  : "You have no orders yet."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Active Orders */}
            {activeOrders.length > 0 && (
              <div>
                <h2 className="mb-4 font-semibold text-[#2c2a51] text-lg">
                  Active ({activeOrders.length})
                </h2>
                <div className="flex flex-col gap-4">
                  {activeOrders.map((order) => (
                    <OrderCard
                      key={order._id}
                      order={order}
                      currentUsername={user?.username ?? ""}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed Orders */}
            {completedOrders.length > 0 && (
              <div>
                <h2 className="mb-4 font-semibold text-[#2c2a51] text-lg">
                  Completed ({completedOrders.length})
                </h2>
                <div className="flex flex-col gap-4">
                  {completedOrders.map((order) => (
                    <OrderCard
                      key={order._id}
                      order={order}
                      currentUsername={user?.username ?? ""}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default MyOrders;

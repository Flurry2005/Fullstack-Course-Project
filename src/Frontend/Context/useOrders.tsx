import { createContext, useContext, useEffect, useState } from "react";
import type { OrderContextType, Order } from "../types/Order";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    updateOrders();
  }, []);

  const updateOrders = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api/orders`,
      {
        credentials: "include",
      },
    );

    const res = await response.json();

    if (res.success) {
      setOrders(res.data);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, setOrders, updateOrders }}>
      {children}
    </OrderContext.Provider>
  );
}
export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within orderProvider");
  return context;
}

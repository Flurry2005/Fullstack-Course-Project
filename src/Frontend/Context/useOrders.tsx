import { createContext, useContext, useEffect, useState } from "react";
import type { OrderContextType, Order } from "../types/Order";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    // Fetch orders
    setOrders([
      {
        _id: "Test",
        gigname: "I will build you a website",
        seller: { username: "Johan Kronholm" },
        chathistory: [
          { username: "liam", message: "Jag vill ha hjälp snälla" },
          {
            username: "Johan Kronholm",
            message: "Jag kan inte bygga hemsidor...",
          },
          { username: "liam", message: "Noob for real alltså!" },
        ],
      },
      {
        _id: "Tes2t",
        gigname: "I will help you become best",
        seller: { username: "John Doe" },
        chathistory: [
          { username: "liam", message: "Jag vill ha hjälp snälla" },
          {
            username: "John Doe",
            message: "Jag kan inte bygga hemsidor...",
          },
          { username: "liam", message: "Noob for real alltså!" },
        ],
      },
    ]);
  }, []);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
}
export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useorder must be used within orderProvider");
  return context;
}

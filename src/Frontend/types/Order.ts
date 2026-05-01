import type { Dispatch, SetStateAction } from "react";

export type Order = {
  _id: any;
  gigname: string;
  sellerUsername: string;
  buyerUsername: string;
  chathistory: Message[];
};

export type Message = {
  username: string;
  message: string;
};

export type OrderContextType = {
  orders: Order[] | null;
  setOrders: Dispatch<SetStateAction<Order[] | null>>;
  updateOrders: () => void;
};

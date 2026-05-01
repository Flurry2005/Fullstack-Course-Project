import type { Dispatch, SetStateAction } from "react";

export type Order = {
  _id: any;
  gigname: string;
  seller: Seller;
  chathistory: Message[];
};

type Seller = {
  username: string;
};

export type Message = {
  username: string;
  message: string;
};

export type OrderContextType = {
  orders: Order[] | null;
  setOrders: Dispatch<SetStateAction<Order[] | null>>;
};

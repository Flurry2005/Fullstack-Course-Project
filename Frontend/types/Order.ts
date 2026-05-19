import type { ObjectId } from "mongodb";
import type { Dispatch, SetStateAction } from "react";

export type Order = {
  delivered: any;
  _id: any;
  gigname: string;
  gigId: string;
  gigTier: string;
  dueDate: Date;
  sellerUsername: string;
  buyerUsername: string;
  chathistory: Message[];
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
  username: string;
  message: string;
  time: Date;
  readBy: ObjectId[];
};

export type OrderContextType = {
  orders: Order[] | null;
  setOrders: Dispatch<SetStateAction<Order[] | null>>;
  updateOrders: () => void;
};

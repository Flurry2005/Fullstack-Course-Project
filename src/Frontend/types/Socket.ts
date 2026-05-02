import type { Dispatch, SetStateAction } from "react";
import type { Order } from "./Order";

type OnlineUser = { username: string; status: "Online" | "Offline" };

export type OnlineList = OnlineUser[] | null;

export type SocketContextType = {
  onlineList: OnlineList;
  setOnlineList: Dispatch<SetStateAction<OnlineList | null>>;
  unreadMessages: number;
  setUnreadMessages: Dispatch<SetStateAction<number>>;
  updateUnreadMessagesCount: () => void;
  activeOrder: Order | null;
  setActiveOrder: Dispatch<SetStateAction<Order | null>>;
};

import type { Dispatch, SetStateAction } from "react";

type OnlineUser = { username: string; status: "Online" | "Offline" };

export type OnlineList = OnlineUser[] | null;

export type OnlineListContextType = {
  onlineList: OnlineList;
  setOnlineList: Dispatch<SetStateAction<OnlineList | null>>;
};

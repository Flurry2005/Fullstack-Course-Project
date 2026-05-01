import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io(
      import.meta.env.VITE_DEV === "true"
        ? "http://localhost:3000"
        : "https://fullstackapi.liamjorgensen.dev",
      {
        autoConnect: false,
        withCredentials: true,
      },
    );
  }
  return socket;
}

export function connectSocket() {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
  }
  console.log("Socket connected:", s.connected);
  return s;
}

export function disconnectSocket() {
  const s = getSocket();
  s.disconnect();
}

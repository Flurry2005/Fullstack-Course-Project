import { Server as ServerType } from "http";
import { Server, Socket } from "socket.io";
import JWTModel, { JWTPayload } from "../src/models/JWT.ts";
import {
  getSocketId,
  getUsername,
  registerSocket,
  unregisterSocket,
} from "./registry.ts";

import Users from "../src/models/userModel.ts";
import Orders, { OrderType } from "../src/models/orderModel.ts";
import mongoose from "mongoose";

const allowedOrigins = [
  "https://frontend-w1uy.onrender.com",
  "http://localhost:5173",
  "https://fullstack.liamjorgensen.dev",
];

class SocketHandler {
  #io: Server | null = null;

  constructor(server: ServerType) {
    this.#io = new Server(server, {
      cors: {
        origin: allowedOrigins,
        credentials: true,
      },
    });

    this.initialize();
  }

  initialize() {
    if (!this.#io) throw Error("SocketHandler Failed to initialize");
    this.#io.on("connection", async (socket: Socket) => {
      const cookies = parseCookies(socket.handshake.headers.cookie);
      const token = cookies.token;

      try {
        const userCookie: JWTPayload = JWTModel.verify(token);
        console.log(userCookie.username, socket.id);
        const user = await Users.findOne({ username: userCookie.username });

        if (!user) throw Error("No such user exists!");
        const uid = new mongoose.Types.ObjectId(user._id);
        registerSocket(socket.id, user.username);

        BroadcastOnlineStatus(uid, user.username, this.#io!, "Online");

        socket.on("disconnect", () => {
          console.log(getUsername(socket.id), "disconnected!");
          BroadcastOnlineStatus(uid, user.username, this.#io!, "Offline");
          unregisterSocket(socket.id);
        });

        socket.on("request_online_statuses", async () => {
          const orders = await Orders.find({
            $or: [{ buyerId: uid }, { sellerId: uid }],
          });

          const otherUsers = orders.map((order) =>
            order.buyerId.toString() === uid.toString()
              ? order.sellerUsername
              : order.buyerUsername,
          );

          const usersWithStatus = otherUsers.map((username) => ({
            username,
            status: getSocketId(username) ? "Online" : "Offline",
          }));

          console.log("request_online_statuses received from", socket.id);
          console.log("sending:", usersWithStatus);
          socket.emit("online_status", usersWithStatus);

          socket.emit("online_status", usersWithStatus);
        });

        socket.on("send_message", async (data) => {
          console.log(data);
          try {
            const order: OrderType | null = await Orders.findOneAndUpdate(
              {
                _id: data.orderId,
                $or: [
                  {
                    buyerId: uid,
                  },
                  {
                    sellerId: uid,
                  },
                ],
              },
              {
                $push: {
                  chathistory: {
                    username: user.username,
                    message: data.message,
                  },
                },
              },
              { returnDocument: "after" },
            );

            if (!order) return;

            const receiverId =
              order.buyerId.toString() === uid.toString()
                ? order.sellerUsername
                : order.buyerUsername;
            console.log(receiverId);
            const recipientSocketId = getSocketId(receiverId.toString());

            if (recipientSocketId) {
              const recipientSocket =
                this.#io!.sockets.sockets.get(recipientSocketId);

              recipientSocket!.emit("message_received");
              console.log("emitting to", recipientSocketId);
            }
          } catch (error) {
            console.log("Message wasnt stored in the database");
          }
        });

        socket.emit("server_ready");
      } catch (error) {
        console.log(
          socket.handshake.address,
          "was disconnected due to invalid JWTtoken!",
        );
        socket.disconnect();
      }
    });
  }
}

type OnlineStatus = "Online" | "Offline";

async function BroadcastOnlineStatus(
  uid: mongoose.Types.ObjectId,
  username: string,
  io: Server,
  status: OnlineStatus,
) {
  const orders = await Orders.find({
    $or: [{ buyerId: uid }, { sellerId: uid }],
  });

  const otherSockets: Socket[] = orders
    .map((order) =>
      order.buyerId.toString() === uid.toString()
        ? order.sellerUsername
        : order.buyerUsername,
    )
    .map((userId) => getSocketId(userId))
    .filter((id): id is string => id !== undefined)
    .map((socketId) => io.sockets.sockets.get(socketId))
    .filter((socket): socket is Socket => socket !== undefined);

  otherSockets.forEach((socket: Socket) =>
    socket.emit("online_status", [{ username: username, status: status }]),
  );
}

function parseCookies(cookieString = "") {
  return Object.fromEntries(
    cookieString.split("; ").map((c) => {
      const [key, value] = c.split("=");
      return [key, decodeURIComponent(value)];
    }),
  );
}

export default SocketHandler;

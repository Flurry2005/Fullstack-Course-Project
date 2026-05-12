import { Server as ServerType } from "http";
import { Server, Socket } from "socket.io";
import JWTModel, { JWTPayload } from "../models/JWT.js";
import {
  getSocketId,
  getUsername,
  registerSocket,
  unregisterSocket,
} from "./registry.js";

import Users from "../models/userModel.js";
import Orders, { OrderType } from "../models/orderModel.js";
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

    this.#io.use(async (socket, next) => {
      try {
        const cookies = parseCookies(socket.handshake.headers.cookie);
        const token = cookies.token;

        const payload: JWTPayload = JWTModel.verify(token);

        const user = await Users.findOne({ _id: payload._id });

        if (!user) return new Error("UNAUTHORIZED");
        socket.data.user = {
          _id: user._id,
          username: user.username,
        };
        // attach user to socket
        console.log(
          `\nSOCKET: /${"connection"}`,
          "-",
          socket.data.user.username,
          "\n\tConnection success!",
        );
        next();
      } catch (err) {
        console.log(
          `\nSOCKET: /${"connection"}`,
          "-",
          socket.id,
          "\n\tUNAUTHORIZED DUE TO INVALID JWT TOKEN:",
          socket.handshake.address,
        );
        socket.disconnect();
        next(new Error("UNAUTHORIZED"));
      }
    });

    this.initialize();
  }

  initialize() {
    if (!this.#io) throw Error("SocketHandler Failed to initialize");
    this.#io.on("connection", async (socket: Socket) => {
      socket.use(([event, ...args], next) => {
        console.log(`\nSOCKET: /${event}`, "-", socket.data.user.username);
        try {
          const cookies = parseCookies(socket.handshake.headers.cookie);
          const token = cookies.token;

          const payload: JWTPayload = JWTModel.verify(token);

          next();

          console.log("\tJWT Token verified on request:", event);
        } catch {
          console.log(
            "\tUnauthorized request by",
            socket.data.user.username,
            " on event:",
            event,
          );
          socket.disconnect();
          next(new Error("Unauthorized"));
        }
      });

      const user = socket.data.user;
      registerSocket(socket.id, user.username);

      BroadcastOnlineStatus(user._id, user.username, this.#io!, "Online");

      socket.on("disconnect", () => {
        console.log("SOCKET: /disconnect -", getUsername(socket.id));
        BroadcastOnlineStatus(user._id, user.username, this.#io!, "Offline");
        unregisterSocket(socket.id);
      });

      socket.on("request_online_statuses", async () => {
        const orders = await Orders.find({
          $or: [{ buyerId: user._id }, { sellerId: user._id }],
        });

        const otherUsers = orders.map((order) =>
          order.buyerId.toString() === user._id.toString()
            ? order.sellerUsername
            : order.buyerUsername,
        );

        const usersWithStatus = otherUsers.map((username) => ({
          username,
          status: getSocketId(username) ? "Online" : "Offline",
        }));
        socket.emit("online_status", usersWithStatus);

        socket.emit("online_status", usersWithStatus);
      });

      socket.on("read_chat", async (data, ack) => {
        await Orders.updateOne(
          { _id: data.orderId },
          {
            $addToSet: {
              "chathistory.$[].readBy": user._id,
            },
          },
        );

        if (typeof ack === "function") {
          ack({ success: true });
        }
      });

      socket.on("send_message", async (data) => {
        try {
          const order: OrderType | null = await Orders.findOneAndUpdate(
            {
              _id: data.orderId,
              $or: [
                {
                  buyerId: user._id,
                },
                {
                  sellerId: user._id,
                },
              ],
            },
            {
              $push: {
                chathistory: {
                  username: user.username,
                  message: data.message,
                  readBy: [user._id],
                  time: new Date(),
                },
              },
            },
            { returnDocument: "after" },
          );
          if (!order) return;

          const receiverId =
            order.buyerId.toString() === user._id.toString()
              ? order.sellerUsername
              : order.buyerUsername;
          const recipientSocketId = getSocketId(receiverId.toString());

          if (recipientSocketId) {
            const recipientSocket =
              this.#io!.sockets.sockets.get(recipientSocketId);

            recipientSocket!.emit("message_received", {
              sender: user.username,
              message: data.message,
              orderId: data.orderId,
            });
            console.log("emitting to", recipientSocketId);
          }
        } catch (error) {
          console.log("Message wasnt stored in the database");
        }
      });

      socket.emit("server_ready");
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

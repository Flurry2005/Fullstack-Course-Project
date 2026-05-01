import { Server as ServerType } from "http";
import { Server, Socket } from "socket.io";
import JWTModel, { JWTPayload } from "../src/models/JWT.ts";
import {
  getSocketId,
  getUserId,
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

        registerSocket(socket.id, user.username);

        socket.on("disconnect", () => {
          console.log(getUserId(socket.id), "disconnected!");
          unregisterSocket(socket.id);
        });

        socket.on("send_message", async (data) => {
          console.log(data);
          const uid = new mongoose.Types.ObjectId(user._id);
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
      } catch (error) {
        console.log(
          socket.handshake.address,
          "was disconnected due to invalid token!",
          error,
        );
        socket.disconnect();
      }
    });
  }
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

import Users from "../models/userModel.js";
import { Request, Response, NextFunction } from "express";
import JWTModel from "../models/JWT.js";
import bcrypt from "bcrypt";

class UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ success: false });

    const user = await Users.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "No such user found!" });

    const passHash = user.passwordHash;

    if (await bcrypt.compare(password, passHash)) {
      const userObj = user.toObject();
      //@ts-ignore
      delete userObj.passwordHash;

      const token = JWTModel.createJwtToken(user.username, email, user._id);
      const expiry = new Date(Date.now() + 1000 * 60 * 60);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.VITE_DEV ? false : true,
        sameSite: process.env.VITE_DEV ? "lax" : "none",
        path: "/",
        domain: process.env.VITE_DEV ? undefined : ".liamjorgensen.dev",
        expires: expiry,
      });
      return res.status(200).json({ success: true, data: user });
    } else
      return res
        .status(401)
        .json({ success: false, error: "Incorrect password!" });
  }
  async register(req: Request, res: Response, next: NextFunction) {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !email || !password || !username)
      return res.status(400).json({ success: false });

    if (await Users.findOne({ email }))
      return res
        .status(409)
        .json({ success: false, error: "Email already in use!" });

    const user = await Users.insertOne({
      fullname: fullname,
      username: username,
      email: email,
      passwordHash: await bcrypt.hash(password, 12),
      createdAt: new Date(),
    });

    return res.status(200).json({ success: true, message: "User created!" });
  }

  async getUser(req: Request, res: Response, id: string | any) {
    if (!id)
      return res
        .status(400)
        .json({ response: "Bad request", message: "No user id provided." });

    const result = await Users.findOne({ _id: id });
    if (result) {
      const user = {
        fullname: result.fullname,
        username: result.username,
        email: result.email,
      };
      return res.status(200).json(user);
    } else {
      return res
        .status(404)
        .json({ response: "Not Found", message: "User was not found." });
    }
  }
}

export default new UserController();

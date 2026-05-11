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

      const token = JWTModel.createJwtToken(
        user.username,
        email,
        user._id,
        user.stripe_customer_id ?? null,
      );
      const expiry = new Date(Date.now() + 1000 * 60 * 60);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.VITE_DEV ? false : true,
        sameSite: process.env.VITE_DEV ? "lax" : "none",
        path: "/",
        domain: process.env.VITE_DEV ? undefined : ".liamjorgensen.dev",
        expires: expiry,
      });
      return res.status(200).json({ success: true, data: userObj });
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
      profilePictureUrl:
        "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/default-profilePicture?_a=BAMAPqUs0",
      coverImageUrl: "",
      bio: "",
      location: "",
      languages: [],
      skills: [],
    });

    return res.status(200).json({ success: true, message: "User created!" });
  }

  async getPublicProfile(req: Request, res: Response) {
    const { username } = req.params;

    if (!username) {
      return res
        .status(400)
        .json({ response: "Bad request", message: "No username provided." });
    }

    // Public profile excludes private fields like email and password.
    const result = await Users.findOne({ username })
      .select(
        "fullname username profilePictureUrl coverImageUrl bio location languages skills createdAt -_id",
      )
      .lean();

    if (!result) {
      return res
        .status(404)
        .json({ response: "Not Found", message: "User was not found." });
    }

    return res.status(200).json(result);
  }

  async updateProfile(req: Request, res: Response) {
    const { bio, location, languages, skills, coverImageUrl } = req.body;

    const updates: {
      bio?: string;
      location?: string;
      languages?: { name: string; level: string }[];
      skills?: string[];
      coverImageUrl?: string;
    } = {};

    if (typeof bio === "string") updates.bio = bio.trim().slice(0, 500);
    if (typeof location === "string") {
      updates.location = location.trim().slice(0, 80);
    }
    if (typeof coverImageUrl === "string") {
      updates.coverImageUrl = coverImageUrl.trim();
    }
    if (Array.isArray(languages)) {
      const allowedLevels = ["Basic", "Conversational", "Fluent", "Native"];
      updates.languages = languages
        .map((language) => ({
          name:
            typeof language?.name === "string"
              ? language.name.trim().slice(0, 40)
              : "",
          level: allowedLevels.includes(language?.level)
            ? language.level
            : "Conversational",
        }))
        .filter((language) => language.name.length > 0)
        .slice(0, 8);
    }
    if (Array.isArray(skills)) {
      updates.skills = skills
        .filter((skill): skill is string => typeof skill === "string")
        .map((skill) => skill.trim().slice(0, 40))
        .filter((skill) => skill.length > 0)
        .slice(0, 12);
    }

    // Always update the JWT user, never a username/id sent from the browser.
    const result = await Users.findByIdAndUpdate(
      res.locals.jwt._id,
      { $set: updates },
      {
        new: true,
        select:
          "fullname username email profilePictureUrl coverImageUrl bio location languages skills createdAt",
      },
    ).lean();

    if (!result) {
      return res
        .status(404)
        .json({ response: "Not Found", message: "User was not found." });
    }

    return res.status(200).json(result);
  }

  async getUser(req: Request, res: Response, id: string | any) {
    if (!id)
      return res
        .status(400)
        .json({ response: "Bad request", message: "No user id provided." });

    const result = await Users.findOne({ _id: id }).lean();
    if (result) {
      const user = {
        fullname: result.fullname,
        username: result.username,
        email: result.email,
        profilePictureUrl: result.profilePictureUrl,
        coverImageUrl: result.coverImageUrl,
        bio: result.bio,
        location: result.location,
        languages: result.languages,
        skills: result.skills,
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

import Users from "../models/userModel.js";
import { Request, Response, NextFunction } from "express";
import JWTModel from "../models/JWT.js";
import bcrypt from "bcrypt";
import Token from "../models/emailTokenModel.js"; // replaces recoverPasswordModel
import { randomBytes } from "node:crypto";
import { Resend } from "resend";
import { getSocketId } from "../socket/registry.js";

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
        user.role,
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

    // Check if already a real user
    if (await Users.findOne({ email }))
      return res
        .status(409)
        .json({ success: false, error: "Email already in use!" });

    if (await Users.findOne({ username }))
      return res
        .status(409)
        .json({ success: false, error: "Username already in use!" });

    // Delete any previous pending verification for this email
    await Token.deleteMany({
      "pendingUser.email": email,
      type: "emailVerification",
    });

    const passwordHash = await bcrypt.hash(password, 12);
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await Token.create({
      token,
      type: "emailVerification",
      pendingUser: { fullname, username, email, passwordHash },
      expiresAt,
    });

    const verifyLink = `${process.env.VITE_DEV === "true" ? "http://localhost:5173" : "https://fullstack.liamjorgensen.dev"}/verify-email?token=${token}`;
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "FullstackProject <no-reply@fullstackapi.liamjorgensen.dev>",
      to: [email],
      subject: "Verify your email",
      html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #1a1a2e;">Verify your email</h2>
        <p style="color: #6b6b7b; line-height: 1.6;">
          Thanks for signing up! Click the button below to verify your email address.
          This link expires in 24 hours.
        </p>
        <a href="${verifyLink}"
           style="display: inline-block; background: #2d2b7c; color: white; padding: 12px 32px;
                  border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">
          Verify Email
        </a>
        <p style="color: #8a8a9a; font-size: 13px;">
          If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
    `,
    });

    return res.status(200).json({
      success: true,
      message:
        "Please check your email to verify your account before logging in.",
    });
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.body;

      if (!token)
        return res
          .status(400)
          .json({ success: false, error: "Token is required." });

      const verificationToken = await Token.findOne({
        token,
        type: "emailVerification",
      });

      if (!verificationToken || verificationToken.expiresAt < new Date()) {
        return res.status(400).json({
          success: false,
          error: "Invalid or expired verification link.",
        });
      }

      const { fullname, username, email, passwordHash } =
        verificationToken.pendingUser!;

      // Check again in case someone took the email/username in the meantime
      if (await Users.findOne({ email }))
        return res
          .status(409)
          .json({ success: false, error: "Email already in use." });

      if (await Users.findOne({ username }))
        return res
          .status(409)
          .json({ success: false, error: "Username already taken." });

      await Users.insertOne({
        fullname: fullname as string,
        username: username as string,
        email: email as string,
        passwordHash: passwordHash as string,
        profilePictureUrl:
          "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/default-profilePicture?_a=BAMAPqUs0",
        coverImageUrl: "",
        bio: "",
        location: "",
        languages: [],
        skills: [],
        role: "user",
      });

      await Token.deleteOne({ _id: verificationToken._id });

      return res.status(200).json({
        success: true,
        message: "Email verified! Your account is ready — you can now log in.",
      });
    } catch (error) {
      console.error("Verify email error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Something went wrong." });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, password } = req.body;

      if (!token || !password)
        return res
          .status(400)
          .json({ success: false, error: "Token and password are required." });

      const resetToken = await Token.findOne({ token, type: "passwordReset" });

      if (!resetToken || resetToken.expiresAt < new Date()) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid or expired reset link." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await Users.findByIdAndUpdate(resetToken.userId, {
        $set: { passwordHash: hashedPassword },
      });

      // Deletes the used token
      await Token.deleteOne({ _id: resetToken._id });

      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully." });
    } catch (error) {
      console.error("Reset password error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Something went wrong." });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      const { email } = req.body;
      if (!email)
        return res
          .status(400)
          .json({ success: false, error: "Email is required." });

      // Always return the same response to prevent email enumeration
      const genericResponse = {
        success: true,
        message: "If that email exists, a reset link was sent.",
      };

      const user = await Users.findOne({ email });
      if (!user) return res.status(200).json(genericResponse);

      // Invalidate any existing tokens for this user
      await Token.deleteMany({ userId: user._id, type: "passwordReset" });

      // Generate secure token with 1-hour expiry
      const token = randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      await Token.create({
        token,
        userId: user._id,
        type: "passwordReset",
        expiresAt,
      });

      const resetLink = `${process.env.VITE_DEV === "true" ? "http://localhost:5173" : "https://fullstack.liamjorgensen.dev"}${`/reset-password?token=${token}`}`;

      const response = await resend.emails.send({
        from: "FullstackProject <no-reply@fullstackapi.liamjorgensen.dev>",
        to: [email],
        subject: "Reset your password",
        html: `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
      <h2 style="color: #1a1a2e;">Reset your password</h2>
      <p style="color: #6b6b7b; line-height: 1.6;">
        We received a request to reset your password. Click the button below to choose a new one.
        This link expires in 1 hour.
      </p>
      <a href="${resetLink}"
         style="display: inline-block; background: #2d2b7c; color: white; padding: 12px 32px;
                border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">
        Reset Password
      </a>
      <p style="color: #8a8a9a; font-size: 13px;">
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>
  `,
      });

      console.log(response);

      return res.status(200).json(genericResponse);
    } catch (error) {
      console.error("Forgot password error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Something went wrong." });
    }
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

    const isOnline = getSocketId(result.username) === undefined ? false : true;

    return res.status(200).json({ ...result, online: isOnline });
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

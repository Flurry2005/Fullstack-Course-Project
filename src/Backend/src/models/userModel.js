import bcrypt from "bcrypt";
import DatabaseConnection from "../../services/DatabaseConnection.js";
import JWTModel from "../middleware/JWT.js";

class UserModel {
  async login(email, password, res) {
    const user = await DatabaseConnection.db
      .collection("users")
      .findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "No such user found!" });

    const passHash = user.passwordHash;

    if (await bcrypt.compare(password, passHash)) {
      delete user.passwordHash;
      const token = JWTModel.createJwtToken(user.username, email);
      const expiry = new Date(Date.now() + 1000 * 60 * 60);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        expires: expiry,
      });
      return res.status(200).json({ success: true, data: user });
    } else
      return res
        .status(401)
        .json({ success: false, error: "Incorrect password!" });
  }

  async register(fullname, username, email, password, res) {
    if (await DatabaseConnection.db.collection("users").findOne({ email }))
      return res
        .status(409)
        .json({ success: false, error: "Email already in use!" });

    const user = await DatabaseConnection.db.collection("users").insertOne({
      fullname: fullname,
      username: username,
      email: email,
      passwordHash: await bcrypt.hash(password, 12),
      createdAt: new Date(),
    });

    return res.status(200).json({ success: true, message: "User created!" });
  }
}

export default new UserModel();

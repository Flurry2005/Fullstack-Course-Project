import userModel from "../models/userModel.js";

class UserController {
  async login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ success: false });

    userModel.login(email, password, res);
  }
  async register(req, res, next) {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !email || !password || !username)
      return res.status(400).json({ success: false });

    userModel.register(fullname, username, email, password, res);
  }
}

export default new UserController();

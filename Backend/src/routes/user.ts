import router from "express";
import userController from "../controllers/userController.js";
import { jwtMiddleware } from "../middleware/jwtMiddleware.js";

export const userRouter = router();

userRouter.post("/login", async (req, res, next) => {
  userController.login(req, res, next);
});
userRouter.post("/register", async (req, res, next) => {
  userController.register(req, res, next);
});
userRouter.post("/verify-email", async (req, res) => {
  userController.verifyEmail(req, res);
});

userRouter.post("/forgot-password", async (req, res) => {
  userController.forgotPassword(req, res);
});
userRouter.post("/reset-password", async (req, res) => {
  userController.resetPassword(req, res);
});

userRouter.get("/profile/:username", async (req, res) => {
  userController.getPublicProfile(req, res);
});

userRouter.patch(
  "/profile",
  jwtMiddleware.jwtTokenIsValid,
  async (req, res) => {
    userController.updateProfile(req, res);
  },
);

userRouter.get("/", async (req, res) => {
  const id = req.query.id;
  userController.getUser(req, res, id);
});

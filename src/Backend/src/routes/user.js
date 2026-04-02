import router from "express";
import userController from "../controllers/userController.js";

export const userRouter = router();

userRouter.post("/login", async (req, res, next) => {
  userController.login(req, res, next);
});
userRouter.post("/register", async (req, res, next) => {
  userController.register(req, res, next);
});

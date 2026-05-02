import router from "express";

import { userRouter as userRouter } from "./user.js";
import { orderRouter as orderRouter } from "./order.js";
import { jwtMiddleware } from "../middleware/jwtMiddleware.js";

export const routerr = router();

routerr.use("/api", userRouter);

routerr.use("/api", jwtMiddleware.jwtTokenIsValid, orderRouter);

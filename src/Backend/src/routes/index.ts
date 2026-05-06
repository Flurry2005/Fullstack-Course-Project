import router from "express";

import { userRouter as userRouter } from "./user.js";
import { orderRouter as orderRouter } from "./order.js";
import { gigRouter as gigRouter } from "./gig.ts";
import { jwtMiddleware } from "../middleware/jwtMiddleware.js";

export const routerr = router();

routerr.use("/api", userRouter);

routerr.use("/api/gig", gigRouter);

routerr.use("/api", jwtMiddleware.jwtTokenIsValid, orderRouter);

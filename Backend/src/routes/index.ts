import router from "express";

import { userRouter as userRouter } from "./user.js";
import { orderRouter as orderRouter } from "./order.js";
import { gigRouter as gigRouter } from "./gig.js";
import { uploadRouter } from "./upload.js";
import { jwtMiddleware } from "../middleware/jwtMiddleware.js";
import { checkoutRouter } from "../routes/checkout.js";
import { adminRouter } from "./admin.js";

export const routerr = router();

routerr.use("/api", userRouter);

routerr.use("/api/gig", gigRouter);

routerr.use("/api", jwtMiddleware.jwtTokenIsValid, orderRouter);

routerr.use("/api", jwtMiddleware.jwtTokenIsValid, uploadRouter);

routerr.use("/api", jwtMiddleware.jwtTokenIsValid, checkoutRouter);

routerr.use("/api/admin", jwtMiddleware.jwtTokenIsAdmin, adminRouter);

import router from "express";

import { userRouter as userRouter } from "./user.js";

export const routerr = router();

routerr.use("/api", userRouter);

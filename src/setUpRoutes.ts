import { Express } from "express";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";

export const setupRoutes = (app: Express) => {
  // pre login
  app.use("/api/v1/auth", authRouter);

  //post login
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/admin", adminRouter);

  // 404 handler for undefined routes
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.originalUrl} not found`,
    });
  });
};

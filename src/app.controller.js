import express from "express";
import { databaseConnection, databaseSync } from "./database/connection.js";
import "./database/model/relation.js";
import userRouter from "./modules/user/user.controller.js";
import taskRouter from "./modules/task/task.controller.js";
import logRouter from "./modules/log/log.contoller.js";
import { apiRateLimit } from "./middleware/rateLimit.middleware.js";

export const bootstrap = async () => {
  const app = express();
  await databaseConnection();
  await databaseSync();
  app.use(express.json());
  app.use(apiRateLimit);
  app.use("/user", userRouter);
  app.use("/task", taskRouter);
  app.use("/log", logRouter);

  app.use((error, req, res, next) => {
    res.json({
      message: "server error",
      error: error.message,
      stack: error.stack,
    });
  });
  app.listen(3000, () => {
    console.log("Running on port 3000");
  });
};

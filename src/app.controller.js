import express from "express";
import { databaseConnection, databaseSync } from "./database/connection.js";
export const bootstrap = async () => {
  const app = express();
  await databaseConnection();
  await databaseSync();

  app.use((error, req, res, next) => {
    res.json({
      message: "server error",
      error: error.message,
      stack: error.stack,
    });
  });
  app.use(express.json());
  app.listen(3000, () => {
    console.log("Running on port 3000");
  });
};

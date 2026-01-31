import { Router } from "express";
import { getUserLogs } from "./log.service.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  const logs = await getUserLogs(req.user.id);
  res.status(200).json(logs);
})

export default router;
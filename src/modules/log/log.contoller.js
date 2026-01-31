import { Router } from "express";
import { getUserLogs } from "./log.service.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { emptyQuerySchema } from "../../validation/user.validation.js";
import { validateRequest } from "../../middleware/validate.middleware.js";
const router = Router();

router.get(
  "/",
  validateRequest(emptyQuerySchema, "query"),
  authMiddleware,
  async (req, res) => {
    const logs = await getUserLogs(req.user.id);
    res.status(200).json(logs);
  },
);

export default router;

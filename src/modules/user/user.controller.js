import { Router } from "express";
import { createUser, authenticateUser, getUserById } from "./user.service.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validateRequest } from "../../middleware/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
  emptyQuerySchema,
} from "../../validation/user.validation.js";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema,"body"),
  async (req, res) => {
    const user = await createUser(req.body);
    res.status(201).json({ message: "user created successfully", user });
  },
);

router.post(
  "/login",
  validateRequest(loginSchema, "body"),
  async (req, res) => {
    const { user, token } = await authenticateUser(req.body);
    res.status(200).json({ user, token });
  },
);

router.get("/profile", validateRequest(emptyQuerySchema, "query"),authMiddleware, async (req, res) => {
  const user = await getUserById(req.user.id);
  res.status(200).json(user);
});

export default router;

import { Router } from "express";
import {
  CreateTask,
  GetAllUserTasks,
  GetTaskById,
  updateTask,
  deleteTask,
  searchTasks,
} from "./task.service.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validateRequest } from "../../middleware/validate.middleware.js";
import {
  createTaskSchema,
  searchTaskSchema,
  updateTaskSchema,
  emptyQuerySchema,
  taskIdParamSchema
} from "../../validation/task.validation.js";

const router = Router();

router.post(
  "/create",
  validateRequest(createTaskSchema),
  authMiddleware,
  async (req, res) => {
    const task = await CreateTask(req.body, req.user.id);
    res.status(201).json({ message: "task created successfully", task });
  },
);

router.get(
  "/",
  validateRequest(emptyQuerySchema, "query"),
  authMiddleware,
  async (req, res) => {
    const tasks = await GetAllUserTasks(req.user.id);
    if (tasks.length === 0)
      return res.status(404).json({ message: "No tasks found" });
    res.status(200).json(tasks);
  },
);

router.get(
  "/search",
  validateRequest(searchTaskSchema, "query"),
  authMiddleware,
  async (req, res) => {
    const tasks = await searchTasks(req.user.id, req.query);
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json(tasks);
  },
);

router.get(
  "/:taskId",
  validateRequest(taskIdParamSchema, "params"),
  validateRequest(emptyQuerySchema, "query"),
  authMiddleware,
  async (req, res) => {
    const task = await GetTaskById(req.params.taskId, req.user.id);
    res.status(200).json(task);
  },
);
router.patch(
  "/:taskId",
  validateRequest(taskIdParamSchema, "params"),
  validateRequest(updateTaskSchema),
  validateRequest(emptyQuerySchema, "query"),
  authMiddleware,
  async (req, res) => {
    const task = await updateTask(req.params.taskId, req.body, req.user.id);
    res.status(200).json(task);
  },
);
router.delete(
  "/:taskId",
  validateRequest(taskIdParamSchema, "params"),
  validateRequest(emptyQuerySchema, "query"),
  authMiddleware,
  async (req, res) => {
    const task = await deleteTask(req.params.taskId, req.user.id);
    res.status(200).json(task);
  },
);

export default router;

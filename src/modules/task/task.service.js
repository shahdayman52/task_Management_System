import { taskModel } from "../../database/model/task.model.js";
import { createLog } from "../log/log.service.js";
import { Op } from "sequelize";

export const CreateTask = async (data, userId) => {
  const { title, description } = data;
  const task = await taskModel.create({
    title,
    description,
    userId,
  });

  await createLog({ action: "CREATE_LOG", userId, taskId: task.id });
  return task;
};

export const GetAllUserTasks = async (userId) => {
  const tasks = await taskModel.findAll({ where: { userId } });
  if (!tasks) throw new Error("Task not found");

  return tasks;
};

export const GetTaskById = async (taskId, userId) => {
  const task = await taskModel.findOne({ where: { id: taskId, userId } });
  if (!task) throw new Error("Task not found");

  return task;
};

export const updateTask = async (taskId, data, userId) => {
  const task = await GetTaskById(taskId, userId);
  if (!task) throw new Error("Task not found");
  await task.update(data);
  await createLog({ action: "UPDATE_LOG", userId, taskId });

  return task;
};

export const deleteTask = async (taskId, userId) => {
  const task = await GetTaskById(taskId, userId);
  if (!task) throw new Error("Task not found");
  await createLog({ action: "DELETE_LOG", userId, taskId });

  await task.destroy();

  return true;
};

export const searchTasks = async (userId, data) => {
  const { keyword, status } = data;
  const condition = {
    userId,
  };
  if (status) {
    condition.status = status;
  }
  if (keyword) {
    condition[Op.or] = [
      { title: { [Op.substring]: keyword } },
      { description: { [Op.substring]: keyword } },
    ];
  }
  const tasksFound = await taskModel.findAll({ where: condition });
  return tasksFound;
};

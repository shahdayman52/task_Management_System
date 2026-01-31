import { logModel } from "../../database/model/log.model.js";

export const createLog = async ({ action, userId, taskId = null }) => {
  if (!action || !userId) {
    throw new Error("Missing required log data");
  }
  return await logModel.create({ action, userId, taskId });
};

export const getUserLogs = async (userId) => {
  return await logModel.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};

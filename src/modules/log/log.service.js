import { logModel } from "../../database/model/log.model.js";

export const createLog = async ({ action, userId, taskId }) => {
  return await logModel.create({ action, userId, taskId });
};

export const getUserLogs = async (userId) => {
  return await logModel.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};

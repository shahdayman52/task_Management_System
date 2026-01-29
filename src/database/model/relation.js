import { userModel } from "./user.model.js";
import { taskModel } from "./task.model.js";
import { logModel } from "./log.model.js";

userModel.hasMany(taskModel, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
taskModel.belongsTo(userModel, { foreignKey: "userId" });

userModel.hasMany(logModel, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
logModel.belongsTo(userModel, { foreignKey: "userId" });

taskModel.hasMany(logModel, {
  foreignKey: { name: "taskId", allowNull: true },
  onDelete: "SET NULL",
});
logModel.belongsTo(taskModel, { foreignKey: "taskId" });

export { userModel, taskModel, logModel };

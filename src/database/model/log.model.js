import {sequelize} from "../connection.js ";
import { DataTypes } from "sequelize";

export const logModel = sequelize.define(
  "log",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  },
);

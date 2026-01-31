import { Sequelize } from "sequelize";
// import {
//   databaseName,
//   databaseUser,
//   databasePassword,
//   host,
// } from "../../config/env.service.js";

import dotenv from "dotenv";
dotenv.config();
// const mysql = require("mysql2");


export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    dialect: "mysql",

    logging: false,
  },
);
// export const sequelize = new Sequelize(
//   databaseName,
//   databaseUser,
//   databasePassword,
//   {
//     host: host,
//     dialect: "mysql",

//     logging: false,
//   },
// );

export const databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const databaseSync = async () => {
  try {
    await sequelize.sync();
    console.log("database synced successfully.");
  } catch (error) {
    console.error("Unable to sync  the database:", error);
  }
};

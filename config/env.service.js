import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const databaseName = process.env.DATABASE_NAME;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
export { databaseName, databaseUser, databasePassword };

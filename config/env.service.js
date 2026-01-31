import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const databaseName = process.env.DATABASE_NAME;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.DATABASE_PORT;

const host = process.env.DATABASE_HOST;

export { databaseName, databaseUser, databasePassword, jwtSecret, port, host};

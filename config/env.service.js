import env from "dotenv";
env.config({ path: "./.env" });

const databaseName = process.env.DATABASE_NAME;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
export { databaseName, databaseUser, databasePassword };

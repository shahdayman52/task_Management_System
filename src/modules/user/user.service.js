import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../database/model/user.model.js";
import { jwtSecret } from "../../../config/env.service.js";
import { createLog } from "../log/log.service.js";

export const createUser = async (data) => {
  const { name, email, password } = data;
  const userExist = await userModel.findOne({ where: { email } });
  if (userExist) throw new Error("User already exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });
  const userData = user.toJSON();
  delete userData.password;

  return userData;
};

export const authenticateUser = async (data) => {
  const { email, password } = data;
  const user = await userModel.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: "1h",
  });
  const userData = user.toJSON();
  delete userData.password;
    await createLog({ action: "LOGGED_IN", userId:userData.id });


  return { userData, token };
};

export const getUserById = async (id) => {
  return await userModel.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
};

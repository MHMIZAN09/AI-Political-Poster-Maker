import { User } from "./auth.model";
import brcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../../config/env";
export interface IRegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
}
export interface ILoginPayload {
  email: string;
  password: string;
}

const register = async (payload: IRegisterPayload) => {
  const { name, email, phone, password } = payload;
  const existingUser = await User.findOne({
    email: email,
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await brcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const login = async (payload: ILoginPayload) => {
  const { email, password } = payload;
  const userExisting = await User.findOne({ email: email });
  if (!userExisting) {
    throw new Error("User does not exist");
  }
  const isMatch = await brcrypt.compare(password, userExisting.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const jwtPayload = {
    id: userExisting._id,
    name: userExisting.name,
    email: userExisting.email,
  };

  const accessToken = await jwt.sign(jwtPayload, config.accessTokenSecret, {
    expiresIn: config.accessTokenExpiresIn,
  } as SignOptions);

  const refreshToken = await jwt.sign(jwtPayload, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiresIn,
  } as SignOptions);

  return {
    accessToken,
    refreshToken,
    user: {
      id: userExisting._id,
      name: userExisting.name,
      email: userExisting.email,
      phone: userExisting.phone,
      createdAt: userExisting.createdAt,
      updatedAt: userExisting.updatedAt,
    }
  };
};

export const authService = {
  register,
  login,
};

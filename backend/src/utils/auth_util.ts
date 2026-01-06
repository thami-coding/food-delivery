import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { SERVER_CONST } from "./common";

export const encryptString = async (password: string) => {
  const encryptedString = await bcrypt.hash(password, 8);
  return encryptedString;
};

export const authorize =
  (role: string) => async (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== role) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You are unauthorized to access this route" });
      return;
    }
    next();
  };

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.Authorization;
  if (!token) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "token is required",
      user: null,
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, SERVER_CONST.JWTSECRET);
    req.user = decoded as Object;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Invalid or expired token",
    });
  }
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

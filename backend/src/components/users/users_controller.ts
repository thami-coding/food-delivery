import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { BaseController } from "../../utils/base_controller";
import { comparePasswords, encryptString } from "../../utils/auth_util";
import { UsersService } from "./users_service";
import { SERVER_CONST } from "../../utils/common";
import { Users } from "./users_entity";

import config from "../../../server_config.json";
import { NotificationUtil } from "../../utils/notification_util";
import { CacheUtil } from "../../utils/CacheUtil";
import { type IcacheUser } from "../../utils/config";
import { log } from "console";

export class usersController extends BaseController {
  public async addHandler(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body;
      const isEmailRegistered = await UsersUtil.getUserByEmail(user.email);
      console.log(isEmailRegistered);

      if (isEmailRegistered) {
        res.status(StatusCodes.CONFLICT).json({
          status: "error",
          msg: "This email is already in use. Please try logging in or use a different email address.",
        });
        return;
      }

      user.email = user?.email?.toLowerCase();
      user.username = user.username?.toLowerCase();
      user.password = await encryptString(user.password);

      const service = new UsersService();
      const createdUser = await service.create(user);

      res.status(StatusCodes.CREATED).json(createdUser);
    } catch (error) {
      console.log(`Error while adding User: ${error.message}`);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  }

  public async getAllHandler(req: Request, res: Response): Promise<void> {
    const service = new UsersService();
    const { data } = await service.findAll(req.query);

    if (data.length > 0) {
      data.forEach((user) => delete user.password);
    }
    res.status(StatusCodes.OK).json({ status: "success", users: data });
  }

  public async getOneHandler(req: Request, res: Response): Promise<void> {
    const userId = req.session.userId;
    console.log(userId);

    if (!userId) {
      res.status(200).json({ status: "success", user: null });
      return;
    }

    try {
      const service = new UsersService();
      const user = await service.findOne(userId);

      if (!user) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ status: "error", message: "User Not Found", user: null });
        return;
      }

      const userInfo = {
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      res.status(StatusCodes.OK).json({ status: "success", user: userInfo });
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: "error", message: error.message });
    }
  }

  public updateHandler(req: Request, res: Response): void {
    // TODO: update user info
  }

  public async deleteHandler(req: Request, res: Response): Promise<void> {
    const service = new UsersService();

    const result = await service.delete(req.params.id);
    if (!result) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "errror",
        message: "Something went wrong.Couldn't delete user",
      });
      return;
    }
    CacheUtil.remove("User", req.params.id);
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ status: "success", message: "user successfully deleted" });
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await UsersUtil.getUserByEmail(email);

    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
      return;
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Password is not valid" });
      return;
    }
    const userDetails = {
      email: user.email,
      username: user.username,
      userId: user.userId,
      role: user.role,
    };
    const accessToken: string = Jwt.sign(userDetails, SERVER_CONST.JWTSECRET, {
      expiresIn: SERVER_CONST.ACCESS_TOKEN_EXPIRY_TIME_SECONDS,
    });

    const refreshToken: string = Jwt.sign(userDetails, SERVER_CONST.JWTSECRET, {
      expiresIn: SERVER_CONST.REFRESH_TOKEN_EXPIRY_TIME_SECONDS,
    });

    res.cookie("Authorization", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    req.session.userId = user.userId;
    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "successfully logged in",
      data: userDetails,
    });
  }

  public async getAccessTokenFromRefreshToken(
    req: Request,
    res: Response
  ): Promise<void> {
    const refreshToken = req.cookies.refreshToken;

    Jwt.verify(refreshToken, SERVER_CONST.JWTSECRET, (err, user) => {
      if (err) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ status: "error", message: "Invalid Refesh Token" });
        return;
      }

      const accessToken = Jwt.sign(user, SERVER_CONST.JWTSECRET, {
        expiresIn: SERVER_CONST.ACCESS_TOKEN_EXPIRY_TIME_SECONDS,
      });

      res.cookie("Authorization", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "logged back in from refresh token",
      });
    });
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    const { oldPassword, newPassword } = req.body;

    const service = new UsersService();
    const user = await service.findOne(req.params.id);
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: "error", message: "User Not Found" });
      return;
    }

    try {
      const isMatch = await comparePasswords(oldPassword, user.password);
      if (!isMatch) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: "Incorrect old password. Please try again.",
        });
        return;
      }

      user.password = await encryptString(newPassword);
      await service.update(req.params.id, user);
      res
        .status(StatusCodes.OK)
        .json({ status: "success", message: "Password updated successfully" });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: "error", message: error.message });
    }
  }

  public async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: getReasonPhrase(StatusCodes.BAD_REQUEST),
      });
      return;
    }

    const user: Users = await UsersUtil.getUserByEmail(email);
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: "error", message: "Invalid Email" });
    }

    const resetToken = Jwt.sign({ email: email }, SERVER_CONST.JWTSECRET, {
      expiresIn: "1h",
    });

    const resetLink = `${config.front_app_url}/reset-password?token=${resetToken}`;
    const mailOptions = {
      to: email,
      subject: "Password Reset",
      html: ` Hello ${user.username},<p>We received a request to reset your password. If you didn't initiate this request, please ignore this email.</p>
           <p>To reset your password, please click the link below:</p>
           <p><a href="${resetLink}" style="background-color: #fcc800; color: #030712; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Reset Password</a></p>
           <p>If the link doesn't work, you can copy and paste the following URL into your browser:</p>
           <p>${resetLink}</p>
           <p>This link will expire in 1 hour</p>
           <p>If you didn't request a password reset, you can safely ignore this email.</p>
           <p>Best regards,<br>GRILL 'N GO</p>`,
    };

    const emailStatus = await NotificationUtil.enqueueEmail(
      mailOptions.to,
      mailOptions.subject,
      mailOptions.html
    );

    if (emailStatus) {
      res.status(200).json({
        status: "success",
        message: "Password reset link has been sent to your email",
        resetToken,
      });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "something went wrong try again" });
    }
  }

  public async resetPasword(req: Request, res: Response) {
    const { newPassword, resetToken } = req.body;
    const service = new UsersService();
    let email: string;

    try {
      const decode = Jwt.verify(resetToken, SERVER_CONST.JWTSECRET);
      if (!decode) {
        throw new Error("Invalid Reset Token");
      }
      email = decode["email"];
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: "error",
        message: "Reset Token is invalid or expired",
      });

      return;
    }

    try {
      const user = await UsersUtil.getUserByEmail(email);
      if (!user) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ status: "error", message: "user not found" });
        return;
      }

      user.password = await encryptString(newPassword);
      const updatedUser = await service.update(user.userId, user);

      if (!updatedUser) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ status: "error", message: "Invalid data" });
        return;
      }

      res
        .status(StatusCodes.OK)
        .json({ status: "success", message: "Password updated successfully" });
    } catch (error) {
      console.log(error.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: "error", message: "Internal Server error" });
    }
  }

  public async logout(req: Request, res: Response) {
    res.clearCookie("Authorization");
    res.clearCookie("refreshToken");
    if (req.session.userId) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destruction error:", err);
        } else {
          console.log("Session destroyed successfully");
        }
      });
    }

    res
      .status(StatusCodes.NO_CONTENT)
      .json({ status: "success", message: "logged out" });
  }
}

export class UsersUtil {
  public static async getUserByEmail(email: string) {
    try {
      if (email) {
        const service = new UsersService();
        const users = await service.customQuery(`email = '${email}'`);

        if (users && users.length > 0) {
          return users[0];
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }

  public static async cacheAllUsers() {
    const usersService = new UsersService();
    try {
      const { data } = await usersService.findAll({});
      console.log(data);

      if (data.length > 0) {
        data.forEach((user) => {
          CacheUtil.set("User", user.userId, user);
        });
        console.log(`All users successfully cached`);
      } else {
        console.log(`There are no users in database`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

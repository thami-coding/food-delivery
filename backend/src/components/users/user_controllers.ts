import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import { BaseController } from "../../utils/base_controller";
import { comparePasswords, encryptString } from "../../utils/auth_util";
import { UserServices } from "./user_services";
import { SERVER_CONST } from "../../utils/common";
import { Users } from "./user_entity";

import config from "../../../server_config.json";
import { Resend } from 'resend';

export class UserControllers extends BaseController {
  public async addHandler(req: Request, res: Response): Promise<void> {
    try {
      const newUser = req.body;
      const isEmailRegistered = await UsersUtil.getUserByEmail(newUser.email);

      if (isEmailRegistered) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          msg: "Invalid email or password.",
        });
        return;
      }

      newUser.password = await encryptString(newUser.password);
      const service = new UserServices();
      const user = await service.create(newUser);
      res.status(StatusCodes.CREATED).json({ user });

    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error creating user",
      });
    }
  }

  public async getAllHandler(req: Request, res: Response): Promise<void> {
    const service = new UserServices();
    const { data } = await service.findAll(req.query);

    if (data.length > 0) {
      data.forEach((user) => delete user.password);
    }
    res.status(StatusCodes.OK).json({ status: "success", users: data });
  }

  public async getOneHandler(req: Request, res: Response): Promise<void> {
    const id = req.user.id;
    try {
      const service = new UserServices();
      const user = await service.findOne(id);

      if (!user) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ status: "error", message: "User Not Found" });
        return;
      }

      res.status(StatusCodes.OK).json({ user });
    } catch (error) {
      console.log(error.messsage);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: "error", message: error.message });
    }
  }

  public async updateHandler(req: Request, res: Response): Promise<void> {
    const id = req.user.id;
    const service = new UserServices();
    const body = req.body
    console.log(body);
    console.log(id);

    try {
      await service.update(id, { ...body })
      res.status(StatusCodes.OK).json({ message: "profile updated" })
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" })
    }
  }

  public async deleteHandler(req: Request, res: Response): Promise<void> {
    const service = new UserServices();

    try {

      await service.delete(req.params.id);
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ status: "success", message: "user successfully deleted" });
    } catch (error) {
      console.log(error);

    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await UsersUtil.getUserByEmail(email);
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Password is not valid" });
      return;
    }
    const userDetails = {
      email: user.email,
      id: user.id,
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


    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.OK).json({ ...userDetails });
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

    const service = new UserServices();
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
        message: "Invalid email address",
      });
      return;
    }

    const user: Users = await UsersUtil.getUserByEmail(email);

    if (!user) {
      res
        .status(StatusCodes.OK)
        .json({ message: "If that email is registered, a reset link has been sent to it" });
      return;
    }

    const resetToken = Jwt.sign({ email: email }, SERVER_CONST.JWTSECRET, {
      expiresIn: "1h",
    });

    const resetLink = `${config.front_app_url}/reset-password?token=${resetToken}`;
    const resend = new Resend(process.env.RESEND_API_KEY);

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sainttsquared@gmail.com',
      subject: 'Reset Password',
      html: ` Hello ${user.fullName},<p>We received a request to reset your password. If you didn't initiate this request, please ignore this email.</p>
             <p>To reset your password, please click the link below:</p>
             <p><a href="${resetLink}" style="background-color: #fcc800; color: #030712; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Reset Password</a></p>
             <p>If the link doesn't work, you can copy and paste the following URL into your browser:</p>
             <p>${resetLink}</p>
             <p>This link will expire in 1 hour</p>
             <p>If you didn't request a password reset, you can safely ignore this email.</p>
             <p>Best regards,<br>GRILL 'N GO</p>`
    });
    res.status(StatusCodes.OK).json({
      message: "If that email is registered, a reset link has been sent.",
      resetToken,
    });
    // 
    // const mailOptions = {
    //   to: email,
    //   subject: "Password Reset",
    //   html: ` Hello ${user.username},<p>We received a request to reset your password. If you didn't initiate this request, please ignore this email.</p>
    //        <p>To reset your password, please click the link below:</p>
    //        <p><a href="${resetLink}" style="background-color: #fcc800; color: #030712; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Reset Password</a></p>
    //        <p>If the link doesn't work, you can copy and paste the following URL into your browser:</p>
    //        <p>${resetLink}</p>
    //        <p>This link will expire in 1 hour</p>
    //        <p>If you didn't request a password reset, you can safely ignore this email.</p>
    //        <p>Best regards,<br>GRILL 'N GO</p>`,
    // };

    // const emailStatus = await NotificationUtil.enqueueEmail(
    //   mailOptions.to,
    //   mailOptions.subject,
    //   mailOptions.html
    // );

    // if (emailStatus) {
    //   res.status(200).json({
    //     status: "success",
    //     message: "Password reset link has been sent to your email",
    //     resetToken,
    //   });
    // } else {
    //   res
    //     .status(400)
    //     .json({ status: "error", message: "something went wrong try again" });
    // }
  }

  public async resetPasword(req: Request, res: Response) {
    const { newPassword, token } = req.body;
    const service = new UserServices();
    let email = "";


    try {
      const decode = Jwt.verify(token, SERVER_CONST.JWTSECRET);
      if (!decode) {
        throw new Error("Invalid Reset Token");
      }
      email = decode["email"];
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Reset Token is invalid or has expired",
      });
      return;
    }

    try {
      const user = await UsersUtil.getUserByEmail(email);
      if (!user) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "user not found" });
        return;
      }

      user.password = await encryptString(newPassword);
      await service.update(user.id, user);

      res
        .status(StatusCodes.OK)
        .json({ message: "Password updated successfully" });
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong. Please try again later." });
    }
  }

  public async logout(req: Request, res: Response) {
    res.clearCookie("Authorization");
    res.clearCookie("refreshToken");
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ status: "success", message: "logged out" });
  }
}

export class UsersUtil {
  public static async getUserByEmail(email: string) {
    try {
      if (email) {
        const service = new UserServices();
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
}

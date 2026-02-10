// import { Request, Response } from "express"
// import jwt from "jsonwebtoken"
// import { StatusCodes } from "http-status-codes"
// import { Resend } from "resend"

// import { BaseController } from "../../utils/base_controller"
// import { comparePasswords, hashPassword } from "../../utils/auth_util"
// import { UserServices } from "./user_services"
// import { Users } from "./user_entity"
// import { logger } from "../../utils/logger"
// import { users } from "../../dummy-data"
// import {
//   BadRequestError,
//   ConflictError,
//   UnauthorizedError,
// } from "../../errors/AppError"
// import { DatabaseUtil } from "../../config/database"
// import { ExpiresIn } from "../../types/jwt"


// export class UserControllers extends BaseController {
//   public async seedHandler(req: Request, res: Response): Promise<void> {
//     const userRepository = new DatabaseUtil().getRepository(Users)
//     const seededUsers = await userRepository.insert(users)

//     res.status(StatusCodes.OK).json({ status: "success", user: seededUsers })
//   }

//   public async addHandler(req: Request, res: Response): Promise<void> {
//     const userRepository = new DatabaseUtil().getRepository(Users)
//     const newUser = req.body
//     const user = await userRepository.findOne({
//       where: { email: newUser.email },
//     })

//     if (user) {
//       throw new ConflictError({ email: "Email is already registered" })
//     }

//     newUser.password = await hashPassword(newUser.password)
//     const service = new UserServices()
//     const { email, id, role } = await service.create(newUser)
//     const userData = { email, id, role }
//     res.status(StatusCodes.CREATED).json({ status: "success", user: userData })
//   }

//   public async getAllHandler(req: Request, res: Response): Promise<void> {
//     const userRepository = new DatabaseUtil().getRepository(Users)
//     const users = await userRepository.find()
//     res.status(StatusCodes.OK).json({ status: "success", users })
//   }

//   public async getOneHandler(req: Request, res: Response): Promise<void> {
//     const userRepository = new DatabaseUtil().getRepository(Users)
//     const id = req.user.id
//     const user = await userRepository.findOne({
//       where: { id },
//       select: [
//         "id",
//         "email",
//         "role",
//         "fullName",
//         "phoneNumber",
//         "streetAddress",
//         "city",
//         "suburb",
//         "city",
//         "postalCode",
//       ],
//     })

//     res.status(StatusCodes.OK).json({ status: "success", user })
//   }

//   public async updateHandler(req: Request, res: Response): Promise<void> {
//     const userRepository = new DatabaseUtil().getRepository(Users)
//     const body = req.body
//     const id = req.user.id

//     await userRepository.update(id, { ...body })
//     const user = await userRepository.findOne({
//       where: { id },
//     })

//     res.status(StatusCodes.OK).json({ status: "success", user })
//   }

//   public async deleteHandler(req: Request, res: Response): Promise<void> {
//     const userRepository = new DatabaseUtil().getRepository(Users)

//     await userRepository.delete(req.params.id as string)
//     res.status(StatusCodes.NO_CONTENT).json()
//   }

//   public async login(req: Request, res: Response): Promise<void> {
//     const userRepository = new DatabaseUtil().getRepository(Users)
//     const { email, password } = req.body
//     const user = await userRepository.findOne({
//       where: { email },
//       select: ["id", "email", "password", "role"],
//     })

//     if (!user) {
//       throw new UnauthorizedError({
//         password: "The email or password you entered is incorrect",
//       })
//     }

//     const isMatch = await comparePasswords(password, user.password)
//     if (!isMatch) {
//       throw new UnauthorizedError({
//         password: "The email or password you entered is incorrect",
//       })
//     }

//     const userDetails = {
//       email: user.email,
//       id: user.id,
//       role: user.role,
//     }

//     const accessToken = jwt.sign(userDetails, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_IN as ExpiresIn,
//     })

//     // const refreshToken = jwt.sign(userDetails, process.env.JWT_SECRET, {
//     //   expiresIn: process.env.JWT_EXPIRES_IN as ExpiresIn,
//     // })

//     res.cookie("Authorization", accessToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     })

//     // res.cookie("refresh", refreshToken, {
//     //   httpOnly: true,
//     //   secure: false,
//     //   sameSite: "strict",
//     //   maxAge: 24 * 60 * 60 * 1000,
//     // })

//     res.status(StatusCodes.OK).json({ status: "success", user: userDetails })
//   }

//   public async getAccessTokenFromRefreshToken(
//     req: Request,
//     res: Response,
//   ): Promise<void> {
//     const refreshToken = req.cookies.refreshToken

//     jwt.verify(refreshToken, process.env.jwt_SECRET, (err, user) => {
//       if (err) {
//         res
//           .status(StatusCodes.UNAUTHORIZED)
//           .json({ status: "error", message: "Invalid Refesh Token" })
//         return
//       }

//       const accessToken = jwt.sign(user, process.env.jwt_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN as ExpiresIn,
//       })

//       res.cookie("Authorization", accessToken, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "strict",
//         maxAge: 24 * 60 * 60 * 1000,
//       })

//       res.status(StatusCodes.OK).json({
//         status: "success",
//         message: "logged back in from refresh token",
//       })
//     })
//   }

//   public async changePassword(req: Request, res: Response): Promise<void> {
//     const { oldPassword, newPassword } = req.body
//     const userRepository = new DatabaseUtil().getRepository(Users)
//     const id = req.user.id
//     const user = await userRepository.findOne({
//       where: { id },
//     })

//     const isMatch = await comparePasswords(oldPassword, user.password)
//     if (!isMatch) {
//       throw new BadRequestError({ password: "Passwords don't match" })
//     }

//     user.password = await hashPassword(newPassword)
//     const updatedUser = await userRepository.update(
//       req.params.id as string,
//       user,
//     )
//     res.status(StatusCodes.OK).json({ status: "success", user: updatedUser })
//   }

//   public async forgotPassword(req: Request, res: Response) {
//     const { email } = req.body
//     const user: Users = await UsersUtil.getUserByEmail(email)

//     if (!user) {
//       logger.error({
//         message: `No user with email ${email} exists!`,
//         path: req.path,
//         method: req.method,
//       })
//       return
//     }

//     const resetToken = jwt.sign({ email: email }, process.env.jwt_SECRET, {
//       expiresIn: "1h",
//     })

//     const resetLink = `${process.env.FRONT_END_URL}/reset-password?token=${resetToken}`
//     const resend = new Resend(process.env.RESEND_API_KEY)

//     resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: "sainttsquared@gmail.com",
//       subject: "Reset Password",
//       html: ` Hello ${user.fullName},<p>We received a request to reset your password. If you didn't initiate this request, please ignore this email.</p>
//              <p>To reset your password, please click the link below:</p>
//              <p><a href="${resetLink}" style="background-color: #fcc800; color: #030712; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Reset Password</a></p>
//              <p>If the link doesn't work, you can copy and paste the following URL into your browser:</p>
//              <p>${resetLink}</p>
//              <p>This link will expire in 1 hour</p>
//              <p>If you didn't request a password reset, you can safely ignore this email.</p>
//              <p>Best regards,<br>GRILL 'N GO</p>`,
//     })
//     res.status(StatusCodes.NO_CONTENT).json()
//   }

//   public async resetPasword(req: Request, res: Response) {
//     const { newPassword, token } = req.body
//     const service = new UserServices()
//     const decode = jwt.verify(token, process.env.jwt_SECRET)

//     if (!decode) {
//       throw new UnauthorizedError({ error: "token is invalid or has expired" })
//     }

//     const email = decode["email"]
//     const user = await UsersUtil.getUserByEmail(email)
//     user.password = await hashPassword(newPassword)
//     await service.update(user.id, user)

//     res.status(StatusCodes.OK).json()
//   }

//   public async logout(req: Request, res: Response) {
//     res.clearCookie("Authorization")
//     // res.clearCookie("refreshToken")
//     res.status(StatusCodes.NO_CONTENT).json()
//   }
// }

// export class UsersUtil {
//   public static async getUserByEmail(email: string) {
//     const userRepository = new DatabaseUtil().getRepository(Users)
//     if (email) {
//       const user = await userRepository.findOne({
//         where: { email },
//         select: ["id", "email", "password", "role"],
//       })
//       return user
//     }
//     return null
//   }
// }

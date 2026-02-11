import jwt from "jsonwebtoken"
import { RegisterBody } from "../../../schemas/validation/auth.validation.schema"
import { randomUUID } from "crypto"
import bcrypt from "bcryptjs"
import { Resend } from "resend"

import { AuthPayload, ExpiresIn, UserRole } from "../../../types/common.types"
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from "../../../errors/AppError"
import {
  refreshTokenRepository,
  userRepository,
} from "../../../repositories/repos"
import {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "../../../utils/auth.utils"
export const login = async ({ password, email }) => {
  const userRepo = userRepository()
  const refreshTokenRepo = refreshTokenRepository()
  const tokenId = randomUUID()

  const user = await userRepo.findOne({
    where: { email },
    select: ["password", "email", "id", "role"],
  })

  if (!user) {
    throw new UnauthorizedError({
      password: "The email or password you entered is incorrect",
    })
  }

  const isMatch = await comparePasswords(password, user.password)
  if (!isMatch) {
    throw new UnauthorizedError({
      password: "The email or password you entered is incorrect",
    })
  }

  const userDetails: AuthPayload = {
    userId: user.id,
    role: user.role as UserRole,
    tokenId,
  }

  const accessToken = generateAccessToken(userDetails)
  const refreshToken = generateRefreshToken(userDetails)

  await refreshTokenRepo.save({
    id: tokenId,
    userId: user.id,
    hashedToken: bcrypt.hashSync(refreshToken, 10),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, role: user.role, email: user.email },
  }
}

export const signup = async (data: RegisterBody) => {
  const userRepo = userRepository()
  const exists = await userRepo.findOneBy({ email: data.email })

  if (exists) {
    throw new ConflictError({ email: "Email is already registered" })
  }

  const isMatch = data.password === data.confirmPassword

  if (!isMatch) {
    throw new BadRequestError({
      password: "Passwords don't match",
    })
  }

  data.password = await hashPassword(data.password)
  const newUser = userRepo.create(data)
  const { email, role, id } = await userRepo.save(newUser)

  return { id, email, role }
}

export const forgotPassword = async (email: string) => {
  const userRepo = userRepository()
  const user = await userRepo.findOne({ where: { email } })
console.log(user);

  if (!user) {
    return
  }
  const resetToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  })

  const resetLink = `${process.env.FRONT_END_URL}/reset-password?token=${resetToken}`
  const resend = new Resend(process.env.RESEND_API_KEY)
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "sainttsquared@gmail.com",
    subject: "Reset Password",
    html: ` Hello ${user?.fullName ?? "Hello"},<p>We received a request to reset your password. If you didn't initiate this request, please ignore this email.</p>
             <p>To reset your password, please click the link below:</p>
             <p><a href="${resetLink}" style="background-color: #fcc800; color: #030712; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Reset Password</a></p>
             <p>If the link doesn't work, you can copy and paste the following URL into your browser:</p>
             <p>${resetLink}</p>
             <p>This link will expire in 1 hour</p>
             <p>If you didn't request a password reset, you can safely ignore this email.</p>
             <p>Best regards,<br>GRILL 'N GO</p>`,
  })
}

export const resetPasword = async (data) => {
  const userRepo = userRepository()
  const { resetToken, password, confirmPassword } = data
  try {
    const decode = jwt.verify(resetToken, process.env.JWT_SECRET)
    const email = decode["email"]
    const user = await userRepo.findOne({ where: { email } })
    const isMatch = password === confirmPassword

    if (!isMatch) {
      throw new BadRequestError({
        password: "Passwords don't match",
      })
    }

    user.password = await hashPassword(password)

    return await userRepo.update(user.id, user)
  } catch (error) {
    throw new UnauthorizedError({ error: "token is invalid or has expired" })
  }
}

import rateLimit from "express-rate-limit"

export const loginRateLimiter = rateLimit({
  windowMs: Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MS),
  max: Number(process.env.LOGIN_RATE_LIMIT_MAX),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    fields: { password: "Too many login attempts. Please try again later." },
  },
})

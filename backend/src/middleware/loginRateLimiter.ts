import rateLimit from "express-rate-limit"

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    fields: { password: "Too many login attempts. Please try again later." },
  },
})

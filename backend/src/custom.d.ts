import { userRole } from "./components/users/users_entity";
import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        username?: string;
        email?: string;
        role?: userRole;
        userId?: string;
      };
    }
  }
}

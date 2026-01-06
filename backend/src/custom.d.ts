import { userRole } from "./components/users/user_entity";
import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        email?: string;
        role?: userRole;
        id?: string;
      };
    }
  }
}

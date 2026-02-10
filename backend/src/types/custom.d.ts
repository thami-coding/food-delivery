import "express"
import { UserRoles } from "./common.types"

declare global {
  namespace Express {
    interface Request {
      user?: {
        role?: UserRoles
        id?: string
        tokenId?: string
      }
    }
  }
}

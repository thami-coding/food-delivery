import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    cart?: { productId: string; quantity: number }[];
  }
}

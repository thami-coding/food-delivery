import express from "express"
import authRoutes from "./auth.routes"
import userRoutes from "./user.routes"
import productRoutes from "./proudct.routes"
import cartRoutes from "./cart.routes"
import orderRoutes from "./order.routes"
import docsRouter from "./docs.routes"
import paymentRouter from "./payment.routes"


const router = express.Router()

router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/products", productRoutes)
router.use("/cart", cartRoutes)
router.use("/orders", orderRoutes)
router.use("/payment", paymentRouter)
router.use("/", docsRouter)

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the V1 API" })
})

export default router

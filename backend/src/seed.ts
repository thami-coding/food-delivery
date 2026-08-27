import { products } from "./dummy-data"
import {
  cartRepository,
  productRepository,
  userRepository,
} from "./repositories/repos"

export async function seedDatabase() {
  try {
    const productRepo = productRepository()
    const cartRepo = cartRepository()
    const userRepo = userRepository()

    console.log("Clearing existing data...")

    console.log("Seeding users...")
    const adminUser = userRepo.create({
      email: "admin@admin.com",
      password: "test@test",
      role: "admin",
      fullName: "Admin",
    })
    await userRepo.save(adminUser)

    console.log("Seeding products...")
    const createdProducts = productRepo.create(products)
    await productRepo.save(createdProducts)
    console.log("✅ Seeding completed successfully!")
  } catch (error) {
    console.error("❌ Error during database seeding:", error)
    process.exit(1)
  }
}

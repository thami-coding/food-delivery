import fs from "fs"
import { DataSource, ObjectType } from "typeorm"
import { User } from "../entities/user.entity"
import { Product } from "../entities/product.entity"
import { Cart } from "../entities/cart.entity"
import { OrderItem } from "../entities/order_item.entity"
import { Order } from "../entities/order.entity"
import { RefreshToken } from "../entities/refresh-token.entity"

export class Database {
  private static dataSource: DataSource

  public static async initialize(): Promise<void> {
    const isProduction = process.env.NODE_ENV === "production"
    let dbPassword = ""

    if (!isProduction) {
      const passwordFilePath = process.env.POSTGRES_PASSWORD_FILE
      if (passwordFilePath && fs.existsSync(passwordFilePath)) {
        dbPassword = fs.readFileSync(passwordFilePath, "utf8").trim()
      } else {
        console.warn("Local dev: Could not find Docker secret file.")
      }
    }
    if (this.dataSource && this.dataSource.isInitialized) return

    this.dataSource = new DataSource({
      type: "postgres",
      ...(isProduction
        ? {
            url: process.env.SUPABASE_DB_URL,
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {
            host: process.env.POSTGRES_SERVER || "db",
            port: 5432,
            username: process.env.POSTGRES_USER || "postgres",
            password: dbPassword,
            database: process.env.POSTGRES_DB || "food_app",
          }),
      synchronize: !isProduction,
      logging: false,
      entities: [User, Product, Cart, OrderItem, Order, RefreshToken],
    })

    await this.dataSource.initialize()
  }

  public static setDataSource(testDataSource: DataSource): void {
    if (this.dataSource && this.dataSource.isInitialized) {
      this.dataSource.destroy()
    }
    this.dataSource = testDataSource
  }

  public static getRepository<T>(entity: ObjectType<T>) {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      throw new Error(
        "Database is not initialized! Call Database.initialize() first.",
      )
    }
    return this.dataSource.getRepository(entity)
  }

  public static getDataSource(): DataSource {
    return this.dataSource
  }
}

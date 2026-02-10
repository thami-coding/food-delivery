import { DataSource, ObjectType, Repository } from "typeorm"

import { User } from "../entities/user.entity"
import { Product } from "../entities/product.entity"
import { Cart } from "../entities/cart.entity"
import { OrderItem } from "../entities/order_item.entity"
import { Order } from "../entities/order.entity"
import { RefreshToken } from "../entities/refresh-token.entity"

export class Database {
  private static dataSource: DataSource

  public static async initialize(): Promise<void> {
    if (this.dataSource && this.dataSource.isInitialized) {
      return
    }

    this.dataSource = new DataSource({
      type: "postgres",
      url: process.env.SUPABASE_DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
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

  public static getRepository<T>(entity: ObjectType<T>): Repository<T> {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      throw new Error(
        "Database is not initialized! Call Database.initialize() first.",
      )
    }
    return this.dataSource.getRepository(entity)
  }
}

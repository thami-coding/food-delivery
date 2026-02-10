import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { OrderItem } from "./order_item.entity"
import { Cart } from "./cart.entity"

export enum Categories {
  BURGERS = "burgers",
  PIZZAS = "pizzas",
  DESSERTS = "desserts",
  WINGS = "wings",
  COMBOS = "combos",
  RIBS = "ribs",
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({ type: "text", nullable: true})
  ingredients: string

  @Column({ type: "simple-enum", enum: Categories })
  category: Categories

  @Column()
  description: string

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number

  @Column()
  imageUrl: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => OrderItem, item => item.product)
  orderItems: OrderItem[]

  @OneToMany(() => Cart, (cart) => cart.product)
  cart: Cart[]
}

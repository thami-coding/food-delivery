import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { Order } from "./order.entity"
import { Product } from "./product.entity"

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "uuid", nullable: false, select: false })
  orderId: string

  @Column({ type: "uuid", nullable: false })
  productId: string

  @Column({ type: "int" })
  quantity: number

  @ManyToOne(() => Order, (order: Order) => order.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "orderId" })
  order: Order

  @ManyToOne(() => Product, (product) => product.orderItems, { eager: true })
  @JoinColumn({ name: "productId" })
  product: Product

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

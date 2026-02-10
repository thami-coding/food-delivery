import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { User } from "./user.entity"
import { OrderItem } from "./order_item.entity"

export enum OrderStatus {
  PREPARING = "preparing",
  DONE = "done",
  DELIVERY = "delivery",
  CANCELLED = "cancelled",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "uuid", nullable: true, select: false })
  userId: string

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items: OrderItem[]

  @Column({ type: "decimal", precision: 10 })
  totalAmount: number

  @Column({
    type: "simple-enum",
    enum: OrderStatus,
    default: OrderStatus.PREPARING,
  })
  status: OrderStatus

  @Column({ default: "online" })
  paymentMethod: string

  @Column({ default: "pending" })
  paymentStatus: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

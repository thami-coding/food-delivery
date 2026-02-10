// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from "typeorm"
// import { Users } from "../users/user_entity"
// import { OrderItem } from "./order_item_entity"
// import { OrderStatus } from "./order_status.enum"

// @Entity()
// export class Orders {
//   @PrimaryGeneratedColumn("uuid")
//   id: string

//   @Column({ type: "uuid", nullable: true })
//   userId: string

//   @ManyToOne(() => Users, (user) => user.orders, { eager: true })
//   user: Users

//   @OneToMany(() => OrderItem, (item) => item.order, {
//     cascade: true,
//     eager: true,
//   })
//   items: OrderItem[]

//   @Column({ type: "decimal", precision: 10 })
//   totalAmount: number

//   @Column({
//     type: "simple-enum",
//     enum: OrderStatus,
//     default: OrderStatus.PREPARING,
//   })
//   status: OrderStatus

//   @Column({ default: "online" })
//   paymentMethod: string

//   @Column({ default: "pending" })
//   paymentStatus: string

//   @CreateDateColumn()
//   createdAt: Date

//   @UpdateDateColumn()
//   updatedAt: Date
// }

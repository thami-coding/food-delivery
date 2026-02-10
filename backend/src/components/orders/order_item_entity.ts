// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from "typeorm"
// import { Orders } from "./order_entity"
// import { Products } from "../products/product_entity"

// @Entity()
// export class OrderItem {
//   @PrimaryGeneratedColumn("uuid")
//   id: string

//   @Column({ type: "uuid", nullable: false, select: false })
//   orderId: string

//   @Column({ type: "uuid", nullable: false })
//   productId: string

//   @Column({ type: "int" })
//   quantity: number

//   @ManyToOne(() => Orders, (order: Orders) => order.items, {
//     onDelete: "CASCADE",
//   })
//   @JoinColumn({ name: "orderId" })
//   order: Orders

//   @ManyToOne(() => Products, (product) => product.orderItems, { eager: true })
//   @JoinColumn({ name: "productId" })
//   product: Products

//   @CreateDateColumn()
//   createdAt: Date

//   @UpdateDateColumn()
//   updatedAt: Date
// }

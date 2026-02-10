// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { Products } from "../products/product_entity";

// @Entity()
// export class CartItem {
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @Column({ type: "uuid", nullable: false })
//   userId: string;

//   @Column({ type: "uuid", nullable: true })
//   productId: string;

//   @Column()
//   quantity: number;

//   @ManyToOne(() => Products, (product) => product.cartItems, { eager: false })
//   @JoinColumn({ name: "productId" })
//   product: Products;
// }

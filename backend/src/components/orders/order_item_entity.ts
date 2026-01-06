import {
 Column,
 CreateDateColumn,
 Entity,
 ManyToOne,
 PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./order_entity";
import { Products } from "../products/product_entity";

@Entity()
export class OrderItem {
 @PrimaryGeneratedColumn("uuid")
 id: string;

 @ManyToOne(() => Orders, order => order.items, { onDelete: "CASCADE" })
 order: Orders;

 @ManyToOne(() => Products, { eager: true })
 product: Products;

 @Column({ type: "int", default: 1 })
 quantity: number;

 @CreateDateColumn()
 createdAt: Date;

}
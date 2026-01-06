import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderItem } from "../orders/order_item_entity";
import { CartItem } from "../cart/cart_item_entity";

export enum Categories {
  BURGERS = "burgers",
  PIZZAS = "pizzas",
  DESSERTS = "desserts",
  WINGS = "wings",
  COMBOS = "combos",
  RIBS = "ribs",
}

@Entity()
export class Products {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true})
  ingredients: string;

  @Column({ type: "enum", enum: Categories })
  category: Categories;

  @Column()
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, item => item.product)
  orderItems: OrderItem[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];
}

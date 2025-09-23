import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Products } from "../products/products_entity";

@Entity()
@Unique(["userId", "productId"])
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", nullable: true })
  userId: string;

  @Column({ type: "uuid" })
  productId: string;

  @Column()
  quantity: number;

}

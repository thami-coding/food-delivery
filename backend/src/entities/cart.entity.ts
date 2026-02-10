import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Product } from "./product.entity"

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "uuid", nullable: false })
  userId: string

  @Column({ type: "uuid", nullable: true })
  productId: string

  @Column()
  quantity: number

  @ManyToOne(() => Product, (product) => product.cart, { eager: false })
  @JoinColumn({ name: "productId" })
  product: Product
}

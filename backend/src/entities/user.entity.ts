import { Order } from "./order.entity"
import { RefreshToken } from "./refresh-token.entity"
import { UserRole } from "../types/common.types"
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ length: 50, nullable: true })
  fullName: string

  @Column({ length: 60, nullable: false, unique: true })
  email: string

  @Column({ nullable: false, select: false })
  password: string

  @Column({ length: 10, nullable: true })
  phoneNumber: string

  @Column({
    default: "user",
    select: false,
  })
  role: UserRole

  @Column({ nullable: true, length: 60 })
  streetAddress: string

  @Column({ nullable: true, length: 30 })
  city: string

  @Column({ nullable: true, length: 60 })
  suburb: string

  @Column({ nullable: true, length: 4 })
  postalCode: string

  @CreateDateColumn({ select: false })
  created_at: Date

  @UpdateDateColumn({ select: false })
  updated_at: Date

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[]
}
